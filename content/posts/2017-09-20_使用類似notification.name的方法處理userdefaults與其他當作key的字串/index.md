---
title: "使用類似Notification.Name的方法處理UserDefaults與其他當作Key的字串"
author: "兔子"
date: 2017-09-20T10:08:55.240Z
lastmod: 2025-03-21T21:19:51+08:00

description: ""

subtitle: "在Swift 3之前，我們需要使用字串去作為發送或監聽NotificationCenter的事件名稱，而從Swift 3之後，我們可以使用Notification.Name來作為NotificationCenter的名稱。"




aliases:
    - "/%E4%BD%BF%E7%94%A8%E9%A1%9E%E4%BC%BCnotification-name%E7%9A%84%E6%96%B9%E6%B3%95%E8%99%95%E7%90%86userdefaults%E8%88%87%E5%85%B6%E4%BB%96%E7%95%B6%E4%BD%9Ckey%E7%9A%84%E5%AD%97%E4%B8%B2-87bccfb8c95e"

---

在Swift 3之前，我們需要使用字串去作為發送或監聽NotificationCenter的事件名稱，而從Swift 3之後，我們可以使用Notification.Name來作為NotificationCenter的名稱。

使用這方法我們就可以事先定義好，不用擔心在不同的地方打錯字串而造成事件無法收到的問題，只需要先像這樣宣告好Name：
`extension NSNotification.Name {  
  static var userLogin = NSNotification.Name(rawValue: &#34;UserLogin&#34;)  
}`

之後就可以用這個Name去處理NotificationCenter的事件
`// 發送  
NotificationCenter.default.post(name: .userLogin, object: user)``// 監聽  
NotificationCenter.default.addObserver(forName: .userLogin, object: nil, queue: nil) {(notification) in  
  // Handle  
}`

這方法的好處是，在name的位置我們只需要打 `.` Xcode就會跳出所有定義好的Name，從而避免字串打錯字而發生行為錯誤的問題。

那這引起我的另一個想法，我們是否可以用類似的方法去處理UserDefaults或Keychain等等的Keys呢？

嘗試之後，發現可以用一個extension就做到類似的行為，以下以UserDefaults為例

首先貼上以下這段
`extension UserDefaults {  
    enum Key {  
        case `default`(key: String)  
        init(key: String) {  
            self = .default(key: key)  
        }  
    }  
}`

這裡我們使用extension去建立一個enum在UserDefaults下面，並放一個default的case去儲存字串

然後用extension給UserDefaults新增一些使用UserDefaults.Key而非String的方法：
`extension UserDefaults {  
    func set(_ value: Any?, forKey key: UserDefaults.Key) {  
        if case UserDefaults.Key.default(let k) = key {  
            self.set(value, forKey: k)  
        }  
    }  

    func removeObject(forKey key: UserDefaults.Key) {  
        if case UserDefaults.Key.default(let k) = key {  
            self.removeObject(forKey: k)  
        }  
    }  

    func value(forKey key: UserDefaults.Key) -&gt; Any? {  
        if case UserDefaults.Key.default(let k) = key {  
            return self.value(forKey: k)  
        }  
        return nil  
    }  

    func string(forKey key: UserDefaults.Key) -&gt; String? {  
        if case UserDefaults.Key.default(let k) = key {  
            return self.string(forKey: k)  
        }  
        return nil  
    }  

    func dictionary(forKey key: UserDefaults.Key) -&gt; Dictionary&lt;String, Any&gt;? {  
        if case UserDefaults.Key.default(let k) = key {  
            return self.dictionary(forKey: k)  
        }  
        return nil  
    }  

    func integer(forKey key: UserDefaults.Key) -&gt; Int {  
        if case UserDefaults.Key.default(let k) = key {  
            return self.integer(forKey: k)  
        }  
        return 0  
    }  

    func float(forKey key: UserDefaults.Key) -&gt; Float {  
        if case UserDefaults.Key.default(let k) = key {  
            return self.float(forKey: k)  
        }  
        return 0.0  
    }  

    func double(forKey key: UserDefaults.Key) -&gt; Double {  
        if case UserDefaults.Key.default(let k) = key {  
            return self.double(forKey: k)  
        }  
        return 0.0  
    }  

    func bool(forKey key: UserDefaults.Key) -&gt; Bool {  
        if case UserDefaults.Key.default(let k) = key {  
            return self.bool(forKey: k)  
        }  
        return false  
    }  
}`

最後再如同Notification.Name那般，建立UserDefaults.Key
`extension UserDefaults.Key {  
    static var user = UserDefaults.Key(key: &#34;User&#34;)  
    static var token = UserDefaults.Key(key: &#34;Token&#34;)  
}`

這樣之後我們就可以用下面這種方法去設定、刪除或取得UserDefaults中的值了
`UserDefaults.standard.set(userData, forKey: .user)``UserDefaults.standard.removeObject(forKey: .user)``let userData = userDefaults.dictionary(forKey: .user)`

相同的方法也可以用在其他需要輸入字串當Key的方法上，這樣將可以避免打錯字的問題，也可以直接看到所有目前存在著的Key，並使用Auto Completion
