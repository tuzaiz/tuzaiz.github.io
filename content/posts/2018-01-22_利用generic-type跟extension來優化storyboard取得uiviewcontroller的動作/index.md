---
title: "利用Generic Type跟Extension來優化Storyboard取得UIViewController的動作"
author: "兔子"
date: 2018-01-22T16:00:31.966Z
lastmod: 2025-03-21T21:19:51+08:00

description: ""

subtitle: "每次在處理從Storyboard中取出ViewController的動作時，大多都會用到類似下面這樣的程式碼："




aliases:
    - "/%E5%88%A9%E7%94%A8generic-type%E8%B7%9Fextension%E4%BE%86%E5%84%AA%E5%8C%96storyboard%E5%8F%96%E5%BE%97uiviewcontroller%E7%9A%84%E5%8B%95%E4%BD%9C-581d503a0314"

---

每次在處理從Storyboard中取出ViewController的動作時，大多都會用到類似下面這樣的程式碼：
`let viewController = storyboard.instantiateViewController(withIdentifier: &#34;SomeViewController&#34;) as! SomeViewController`

而今天我在做第N次這樣的動作時心想，不知道有沒有辦法讓這一段變得更加的直覺。

簡單地分析了一下，主要我想解決的問題是：

1.  使用字串作爲Identifier容易因爲錯字而導致錯誤
2.  必須要強制轉型成正確的Type

在確定了想改善的方向之後我就開始規劃。首先我先建立一個Struct去存放原本需要的Identifier字串，然後利用Generic Type來將我們想要轉換的Type給存放起來，所以就產生像下面這樣的Struct：
`struct StoryboardIdentifier&lt;T: UIViewController&gt; {  
    var identifier: String  
    var type: T.Type  

    init(identifier: String, type: T.Type) {  
        self.identifier = identifier  
        self.type = type  
    }  
}`

建立好架構後，就用Extension將前面舉例的SomeViewController的Type跟Identifier定義爲一個static variable：
`extension StoryboardIdentifier {  
    static var some: StoryboardIdentifier&lt;SomeViewController&gt; {  
        return StoryboardIdentifier&lt;SomeViewController&gt;(identifier: &#34;SomeViewController&#34;, type: SomeViewController.self)  
    }  
}`

這樣，就可以直接用 StorybosardIdentifier.some 這樣的方式去取得那個我們定義好的Identifier。

但因爲原本的UIStoryboard並不認識StoryboardIdentifier這個Struct，所以我利用Extension去給它增加一個Method，將帶入的StoryboardIdentifier給轉換成對應的UIViewController：
`extension UIStoryboard {  
    func instantiateViewController&lt;T&gt;(withIdentifier identifier: StoryboardIdentifier&lt;T&gt;) -&gt; T {  
        return self.instantiateViewController(withIdentifier: identifier.identifier) as! T  
    }  
}`

到此剩下的我們就可以利用下面這樣的寫法從Storyboard中取得ViewController。
`let vc = storyboard.instantiateViewController(withIdentifier: .some) // Type就會是SomeViewController`

這是今天的一個小嘗試，往後就只需要用Extension給StoryboardIdentifier增加定義其他的ViewController就可以用相同的方法，既避免了打錯字造成的錯誤，又減少需要轉型的動作。
