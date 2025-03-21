---
title: "用Alamofire做HTTP Basic Authentication"
author: "兔子"
date: 2015-03-08T09:31:10.071Z
lastmod: 2025-03-21T21:19:50+08:00

description: ""

subtitle: "介紹如何用Alamofire去做HTTP Basic Authentication"




aliases:
    - "/%E7%94%A8alamofire%E5%81%9Ahttp-basic-authentication-1fa6e21531be"

---

這週末有個機會要做個小Sample給別人，這個Sample Project需要用到HTTP API Request且這個Request需要做HTTP Basic Authentication。

想說有這個機會，也不是正式產品，因此就試著完全用Swift來寫，那HTTP Request當然就交給**AFNetworking**的作者 **Mattt Thompson** 所製作的另一個套件 [**Alamofire**](https://github.com/Alamofire/Alamofire)

Alamofire是完全基於Swift所撰寫的HTTP Request套件，整個語法都有著濃濃的Functional Programming特性在其中。

以下範例是直接將Alamofire.swift Copy到Bundle中的作法，如果是用CocoaPods或其他方法安裝的話，請先 _import Alamofire_ ，然後在每個Method call前加上 _Alamofire_。如 _request() 要改成 Alamofire.request()_

要發送一個GET方法的要求出去只要這樣：
`request(.GET, “http://this.is.url/path”)`

而要處理回傳的內容則只要接著：
`request(.GET, “http://this.is.url/path”).response {(req, res, data, error) in  
  // Handle in here``}`

相當簡單易懂，但對寫Objective-C久了的人來說一定很不習慣。

不過這次的要求不單只是要送一個Request出去而已，還需要做HTTP Basic Authentication，查了一下官方Repo上的說明，要做Authentication只需要：
`request(.GET, “http://this.is.url/path”).authenticate(user: &#34;username&#34;, password: &#34;password&#34;).response {(req, res, data, error) in  
  // Handle in here``}`

即可，我很興奮地照著實作，然後就一直接到**401 Unauthorized**的錯誤…

把發送出去的Request攔下來看，結果發現雖然有帶Authentication，但是Header中卻沒有Authentication的欄位。HTTP Basic Authentication除了要求User跟Password之外，還要求要帶一個值
> _“Authorization” = “Basic MTIzNDo1Njc4&#34;_

後面那串亂碼是由字串 “Username:Password” 經由Base64轉換出來的字串，但是Alamofire並沒有實作這個，因此要正常運作，我們必須自行給它加上這個Header。

首先我們要產生這個Hash字串：
`let originString = “username:password”``let originStringData = originString.dataUsingEncoding(NSUTF8StringEncoding) // String -&gt; NSData?``let hashString = originStringData!.base64EncodedStringWithOptions(NSDataBase64EncodingOptions(0)) // NSData! -&gt; String`

然後把產生出來的Hash加到HTTP Request Header中：
`Manager.sharedInstance.session.configuration.HTTPAdditionalHeaders = [&#34;Authorization&#34;: &#34;Basic \(hashString)&#34;]`

這樣就可以通過HTTP Basic Authentication的認證了。
