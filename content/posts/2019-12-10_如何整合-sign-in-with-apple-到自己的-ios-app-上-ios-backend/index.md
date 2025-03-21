---
title: "如何整合 Sign in with Apple 到自己的 iOS App 上 (iOS & Backend)"
author: "兔子"
date: 2019-12-10T12:42:22.680Z
lastmod: 2025-03-21T21:19:55+08:00

description: ""

subtitle: "整理告訴你如何在 iOS App 和 Server 上整合 Sign in with Apple，以趕上 2020 年四月的期限"

image: "/posts/2019-12-10_如何整合-sign-in-with-apple-到自己的-ios-app-上-ios-backend/images/1.png" 
images:
 - "/posts/2019-12-10_如何整合-sign-in-with-apple-到自己的-ios-app-上-ios-backend/images/1.png"
 - "/posts/2019-12-10_如何整合-sign-in-with-apple-到自己的-ios-app-上-ios-backend/images/2.png"
 - "/posts/2019-12-10_如何整合-sign-in-with-apple-到自己的-ios-app-上-ios-backend/images/3.png"
 - "/posts/2019-12-10_如何整合-sign-in-with-apple-到自己的-ios-app-上-ios-backend/images/4.jpeg"
 - "/posts/2019-12-10_如何整合-sign-in-with-apple-到自己的-ios-app-上-ios-backend/images/5.png"


aliases:
    - "/%E5%A6%82%E4%BD%95%E6%95%B4%E5%90%88-sign-in-with-apple-%E5%88%B0%E8%87%AA%E5%B7%B1%E7%9A%84-ios-app-%E4%B8%8A-ios-backend-e64d9de15410"

---

![image](/posts/2019-12-10_如何整合-sign-in-with-apple-到自己的-ios-app-上-ios-backend/images/1.png#layoutTextWidth)
根據[蘋果的規定](https://developer.apple.com/app-store/review/guidelines/#sign-in-with-apple)，明年四月之後只要你的 App 中有包含**任一第三方登入**就必須支援 Sign in with Apple，要不然就無法通過審核上架。

因此稍微花了點時間去研究該如何整合 Sign in with Apple 到 iOS App 裡面，同時為了跟 Backend 說明這個流程也就一併理解 Backend 這邊該怎麼處理，在這邊就分成 App 端與 Server 端來分別說明。
> 這邊講到的只有要讓 iOS App 支援 Sign in with Apple 部分，如果你的服務是跨平臺，希望讓 Web、Android 也能支援的話，需要在 Apple Developer 上再新建一個 Services ID，然後利用官方提供的 JS Library 或自己串接官方的 API Endpoints

### iOS App 端

App 端串接 Sign in with Apple 相當簡單，大致分成五個步驟

#### Apple Developer 後臺啓用 Sign in with Apple

請先前往 [https://developer.apple.com/account/resources/identifiers/list](https://developer.apple.com/account/resources/identifiers/list)

然後點開自己的 App ID 找到 Sign in with Apple 並啓用它

![image](/posts/2019-12-10_如何整合-sign-in-with-apple-到自己的-ios-app-上-ios-backend/images/2.png#layoutTextWidth)
> 咳… App ID 有更新所以記得 Provision profiles 也要更新一下

#### 新增 Entitlement

打開 Xcode 11，點開 Project 切換到 App 的 Target，選擇上排的 Signing &amp; Capabilities

點下左上角 **+ Capability** 按鈕，新增 Sign in with Apple

![image](/posts/2019-12-10_如何整合-sign-in-with-apple-到自己的-ios-app-上-ios-backend/images/3.png#layoutTextWidth)


#### 加入 Sign in with Apple Button

Apple 在 iOS 13 上有提供預設的按鈕，可以經由實作 **ASAuthorizationAppleIDButton** 來加到自己的 UI 上，不過沒有規定一定要使用這個按鈕，如果要符合自己 App 的設計風格可以自己實作一個 UIButton

ASAuthorizationAppleIDButton 主要有三個參數可以選擇外觀

*   ASAuthorizationAppleIDButton.ButtonType
決定按鈕的內容文字，有四種值可以使用： signIn, signUp (iOS 13.2 以上支援), continue, default
*   ASAuthorizationAppleIDButton.Style
決定按鈕的風格，有三種值可以設定： white, whiteOutline, black
*   cornerRadius
圓角> 樣式可以參考 [Design Guidelines](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple/overview/)`let button = ASAuthorizationAppleIDButton(authorizationButtonType: .default, authorizationButtonStyle: .black)  
button.cornerRadius = 8.0  
button.addTarget(self, action: #selector(appleLoginButtonTapped), for: .touchUpInside)`

#### 請求登入動作

在處理點擊按鈕的 Method 中加上下面的 Code，**requestedScopes** 可以根據需求選擇要使用者提供的個人資料
> 注意： 使用者是可以建立一個假的 email，寄到這的信件會轉發到原本的 email address，因此請不要把這裡的 email 拿來當做使用者的 ID，請使用它提供的 UID`let provider = ASAuthorizationAppleIDProvider()  
let request = provider.createRequest()  
request.requestedScopes = [.email, .fullName]  
let controller = ASAuthorizationController(authorizationRequests: [request])  
controller.delegate = self  
controller.presentationContextProvider = self  
controller.performRequests()`

#### 取得 Credential 後上傳到伺服器

加入 **ASAuthorizationControllerDelegate** 和 **ASAuthorizationControllerPresentationContextProviding** 的實作，當登入成功後就會經由 Delegate 取得登入的 Credential

Credential 裡面會包含以下的資料：

*   Authorization Code
*   Identity Token
*   Email (Optional)
*   User Identifier
*   Name (Family Name / Given Name…) (Optional)`extension LoginViewController: ASAuthorizationControllerDelegate {  
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {  
        guard let credential = authorization.credential as? ASAuthorizationAppleIDCredential else {  
            return  
        }  
        // upload credential to api  
    }``    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {  
        // Show error  
    }  
}``extension LoginViewController: ASAuthorizationControllerPresentationContextProviding {  
    func presentationAnchor(for controller: ASAuthorizationController) -&gt; ASPresentationAnchor {  
        return self.view.window!  
    }  
}`

收到 Credential 後就可以把裡面的 Authorization Code、Identity Token、UID 跟其他資料上傳到 API 做驗證，如果你的 App 不需要伺服器驗證的話那你已經成功支援 Sign in with Apple 了。

接下來就可以測試了，點下按鈕後如果 iCloud 有登入且有開啓二階段認證的話，就會跳出以下的畫面：

![image](/posts/2019-12-10_如何整合-sign-in-with-apple-到自己的-ios-app-上-ios-backend/images/4.jpeg#layoutTextWidth)


到此，App 端就準備好了，接著換 Server 端的實作

### Server 端

Apple 的登入是採用 JWT 的認證方式，在 Client 端登入成功後會取得一組 Identity Code 與 Authorization Token，當 App 成功後就把 Identity Code 與 Authorization Token 與註冊資料一併上傳到 Server api
> 以下的範例使用的是 **Node.js + Express，並使用** [request](https://github.com/request/request)、[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) 與 [jose](https://github.com/panva/jose)

#### 事前準備

**Auth Key &amp; Key ID**

請先到 [https://developer.apple.com/account/resources/authkeys/list](https://developer.apple.com/account/resources/authkeys/list) 建立一組支援 Sign in with Apple 的 Key

![image](/posts/2019-12-10_如何整合-sign-in-with-apple-到自己的-ios-app-上-ios-backend/images/5.png#layoutTextWidth)


建立完成並下載，這組 Key 會是 p8 格式，同時請記住網頁上顯示的 Key ID
> 這組 Key 只能下載一次，請保存在安全的地方

**Team ID**

App 所在 Team 的 ID，可由 Apple Developer 後臺的 Membership 取得

#### 下載 Apple Public Key

Apple 有提供一組 API 以下載 JWKS 格式的 Public Key，在 API 一開始先到它提供的 URL 去下載這組 Public Key

URL: [https://appleid.apple.com/auth/keys](https://appleid.apple.com/auth/keys)

[API 文件連結](https://developer.apple.com/documentation/signinwithapplerestapi/fetch_apple_s_public_key_for_verifying_token_signature)
`// Fetch public key from Apple``request(&#34;https://appleid.apple.com/auth/keys&#34;, function(error, response, body) {  
    // verify identity token``}`

#### 檢查 Identity Token

Identity Token 是由 Apple 建立的 JWS 簽名，利用剛剛下載的 Public Key (JWKS 格式) 去做 JWS 驗證，確認這是由 Apple 所簽發的
`let jwks = jose.JWKS.asKeyStore(JSON.parse(body))``// JWS Verify``if (jose.JWS.verify(token, jwks)) {``    // Verified  
}`

同時最好檢查這個 JWS 的 Payload 中包括

*   iss 是不是來自 [https://appleid.apple.com](https://appleid.apple.com)
*   aud 跟自己的 client_id 有沒有相同
*   確認時間是否沒有超過 exp 的時間

#### 用 Authorization Code 跟 Apple 交換 Access Token

將取得的 Authorization Token 送到 Apple 的 Verify API，如果 token 是合法的就會收到一組 Access Token 與 Refresh Token

**首先要建立 client_secret**

先拿出剛剛下載的 Auth Key，可以放到伺服器上或是把裡面的內容利用字串的方式放到 Environment 裡面

然後跟 Team ID, Key ID 和 App Bundle ID 一起建立一個 JWT 當做 Client Secret
`let private_key = &#34;-----BEGIN PRIVATE KEY-----\n......\n-----END PRIVATE KEY-----&#34; // Should store in a safe place on server side``// Generate client secret``let client_secret = jwt.sign({``    iss: &#34;YourTeamID&#34;, // Team ID, should store in server side``    sub: &#34;AppBundleID&#34;, // Bundle ID, should store in server side``    aud: &#34;https://appleid.apple.com&#34;, // Fix value``    iat: Math.floor(Date.now() / 1000),``    exp: Math.floor(Date.now() / 1000) + (60 * 60)``}, private_key, {``    algorithm: &#39;ES256&#39;,``header: {``    alg: &#39;ES256&#39;,``    kid: &#34;KeyID&#34; // Key ID, should store in a safe place on server side``}  
})`

**API 驗證**

利用上面建立的 client_secret 、 client_id（App Bundle ID）與 Authorization Code 去跟 Apple 交換 Access Token 與 Refresh Token

API 文件： [https://developer.apple.com/documentation/signinwithapplerestapi/generate_and_validate_tokens](https://developer.apple.com/documentation/signinwithapplerestapi/generate_and_validate_tokens)
`// Request verification for apple api``request.post({url: &#34;https://appleid.apple.com/auth/token&#34;, form: {``    client_id: client_id,``    client_secret: client_secret,``    code: code,``    grant_type: &#34;authorization_code&#34;``}}, function(err, response, body) {``    // Handle response``})`

#### 建立使用者帳號並回傳成功

確認這個帳號是正確的之後就可以把 UID, Refresh Token 寫入資料庫並完成回傳，這樣就完成了註冊/登入的動作

#### 確認登入狀態

如果某些時候需要知道使用者是否依然有授權給 App 登入的話，可以拿之前儲存的 Refresh Token 再去跟 Apple Server 確認一次，如果正常回傳就是使用者仍然有授權，如果已經取消授權的話會回覆錯誤
`request.post({``    url: &#34;https://appleid.apple.com/auth/token&#34;, form: {``        client_id: client_id,``        client_secret: client_secret,``        grant_type: &#34;refresh_token&#34;,``        refresh_token: refreshToken``    }``}, function(err, response, body) {``    // Handle response``})`

以上的範例可以在此 [參考完整版本](https://gist.github.com/tuzaiz/76794a0db9e8b2b9e08fe2375d8d3ddd)

### 參考文件

1.  [https://developer.apple.com/documentation/signinwithapplerestapi/authenticating_users_with_sign_in_with_apple](https://developer.apple.com/documentation/signinwithapplerestapi/authenticating_users_with_sign_in_with_apple)
2.  [https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user](https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user)
