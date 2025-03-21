---
title: "利用 Swift Playground 撰寫精美又可互動的技術文件"
author: "兔子"
date: 2018-10-19T15:35:55.364Z
lastmod: 2025-03-21T21:19:54+08:00

description: ""

subtitle: "今天利用時間把一直沒時間只好放在待學期清單裡的 Playground 好好的摸了一遍，剛好可以致敬明天要舉辦的 iPlayground （硬要扯）"

image: "/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/7.png" 
images:
 - "/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/1.png"
 - "/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/2.png"
 - "/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/3.png"
 - "/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/4.png"
 - "/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/5.png"
 - "/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/6.png"
 - "/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/7.png"


aliases:
    - "/%E5%88%A9%E7%94%A8-swift-playground-%E6%92%B0%E5%AF%AB%E7%B2%BE%E7%BE%8E%E5%8F%88%E5%8F%AF%E4%BA%92%E5%8B%95%E7%9A%84%E6%8A%80%E8%A1%93%E6%96%87%E4%BB%B6-9e3253a4d90f"

---

今天利用時間把一直沒時間只好放在待學期清單裡的 Playground 好好的摸了一遍，剛好可以致敬明天要舉辦的 [iPlayground](http://iplayground.io/) （硬要扯）

當 Swift 公開時，同時也開放了一個很強大的工具，那就是 Swift Playground 。利用 Playground 可以即時的看到自己寫的一些程式執行的結果是否正確，而不用不斷的重新 Build &amp; Run 。而隨著 Swift 版本已經來到了 4.2 的今日，Playground 的功能也越來越強大，不但可以即時顯示結果，甚至可以直接在上面做 UI 、寫文件。

### 主要目標

今天一開始先設定好我想要理解的幾個目標：

*   建立 Playground
*   在 Playground 中設計 UI
*   整合第三方 Framework
*   在實際維護的專案中加入 Playground
*   利用 Playground 撰寫文件

### 建立 Playground

首先是建立 Playground ，跟一般的檔案一樣，從 Xcode 裡面選擇 File -&gt; New -&gt; Playground 就可以建立一個基本的 Playground

![image](/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/1.png#layoutTextWidth)


此時可以選擇樣板，基本上就是看你要拿來試做什麼，預先幫你準備好基本需要用到的原始碼。

選擇了 `Blank` 就會建立一個最基本的 Playground

![image](/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/2.png#layoutTextWidth)


此時按左邊行數列上面的執行按鈕就可以讓 Playground 執行到那一行，也可以選擇 `Editor -&gt; Run Playground` 或按 ⌘⇧↩︎ 執行全部，運算出的值會顯示在右邊側邊列。

### 在 Playground 中設計 UI

在建立 Playground 選擇樣板時選擇 View 的話就會建立一個有個基本 UIView 的 Playground ，也可以在既有的 Playground 中先
``import PlaygroundSupport  
import UIKit``

然後在 Playground 中把自己設計的 UIViewController 或 UIView 指定到

`PlaygroundPage.current.liveView`

然後切換 Xcode 到 `Assistant Editor` 模式，再 Run 就可以看到右邊出現剛剛設計好的 UI （要做互動、動畫都可以）

![image](/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/3.png#layoutTextWidth)
Assistant Editor 在 Xcode 右上角可以切換 （快捷鍵： ⌥⌘, ）


![image](/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/4.png#layoutTextWidth)


### 整合第三方 Framework 到 Playground

現在大家都習慣使用 `CocoaPods` 或 `Carthage` 之類的工具去管理 Framework 的版本，不過不管是用套件管理工具還是自己建立好的 Framework 都沒辦法直接拖進 Playground 中使用，為了要在 Playground 裡面使用這些 Framework 的功能，首先我們要建立一個 Project

然後利用一般習慣的方法給這個 Project 裡面的 Target 新增 Framework

最後再把 Playground 加入這個 Project 裡面，在測試 Playground 之前記得先 Build 一次這個 Target ，然後在 Playground 中就可以使用這個 Framework 中的功能了。

![image](/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/5.png#layoutTextWidth)
連 HTTP Request 也可以取得結果



### 在實際維護的專案中加入 Playground

會想要使用 Playground 的情境中，其中一種就是想在 Playground 中先驗證自己所寫的函式或是演算法是否正確，但如果架構稍大要移入 Playground 中就有點麻煩，如果可以直接在 Playground 中存取到自己寫好的 Class 的話就會方便很多。

為了要將自己寫好的 Source code 引入 Playground 中，首先要先在既有的專案中新增 一個 Target （ New -&gt; Target ），然後 Target 的類型要選擇 `Cocoa Touch Framework`

![image](/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/6.png#layoutTextWidth)


然後將自己要使用到的 Class 其相關的所有檔案加入到這個 Target 之中，然後 Build 一次後再到 Playground 中 import 這個 Framework
> 請記住，這樣實際上是 Playground 利用 Framework 來引用你寫好的程式，因為是外部的 Module 所以記得要在用到的 Class 前方加上 `_open_` 還有函式跟變數的前面加上 `_public_`

這樣就可以在 Playground 中使用自己寫好的那些 Class。

### 利用 Playground 來撰寫文件

這件事其實是我今天最大的目的，因為我想利用 Playground 來撰寫一個可直接在裡面看到執行結果與用法的技術文件，而 Playground 支援使用 `Markup` 語法來撰寫 Rich Text 的文件。

Playground 有兩種顯示模式 `Raw Markup` 跟 `Rendered Markup` ，可以在 `Editor -&gt; Show xxx Markup` 切換，先讓我們切換到 Raw Markup 模式

在要寫說明文字的地方加上

單行： `//:`   
多行： `/*:` 與 `*/`

對，就是註解的後面加上一個 `:`

然後在裡面就可以利用 Markup 語法去對文字設定格式，以下列出一些基本的語法：

*   第一階標題： `#`
*   第二階標題： `##`
*   斜體： 用 `*` 或 `_` 包住文字
*   粗體： 用 `**` 或 `__` 包住文字
*   分隔線： `----`
*   連結： `[文字](URL)`

其他還有許多的 Markup 用法可以參考 [Apple 官網的文件](https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_markup_formatting_ref/index.html#//apple_ref/doc/uid/TP40016497-CH2-SW1)

結合以上的用法，就可以在自己的專案中寫出精美且可以直接修改看結果的技術文件出來，我簡單地試寫了一個使用 RxSwift 去開發 MVVM 的簡單說明，效果如下：

![image](/posts/2018-10-19_利用-swift-playground-撰寫精美又可互動的技術文件/images/7.png#layoutTextWidth)


看上去是不是很不錯，而且這個文件可以即時的執行，並且將結果顯示在右方，如果看到文件的人想要試試看修改裡面的原始碼會產生什麼效果只要直接修改並執行就可以，可以讓看的人更加了解實際的效果。

這樣的技術文件相信會讓第一次看到的人能更加快速的掌握到文件想要描述的內容，而且可以把程式碼架構跟流程更加清晰的描述出來，對團隊內的技術同步溝通也會更加順暢。

如果最近剛好有要寫文件的人如果看到這篇可以試著自己也寫一個這樣的文件試試，也歡迎將自己撰寫的文件或是心得留言跟我分享一下。
