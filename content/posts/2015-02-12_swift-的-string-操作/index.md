---
title: "Swift 的 String 操作"
author: "兔子"
date: 2015-02-12T10:23:08.008Z
lastmod: 2025-03-21T21:19:49+08:00

description: ""

subtitle: "教學如何在Swift中操作字串，並有提供Library可簡化操作。"




aliases:
    - "/swift-string-9d65aea7b11d"

---

在Swift中有自己獨立的字串格式 **String**，操作的方法與NSString類似，將各種的操作方式整理在這邊方便大家查找。

大概是為了跟Objective-C能夠相容，部分String methods依舊是跟NSString相同，但又多了些新的用法，所以整個用法很不統一，因此在寫這篇文章的同時，順手寫了一個Extension將這些方法整理在一起，可以用比較統一的方法去做字串操作。

如果有人有興趣，可以參考： [https://github.com/tuzaiz/RacoonString](https://github.com/tuzaiz/RacoonString)

### 取得字串長度
`countElements(string) // Swift 1.0``count(string) // Swift 1.2`

#### RacoonString
`string.length() // RacoonString`

### 尋找字串
`var string = “Swift is awesome”``let range = string.rangeOfString(“awesome”)``if let range = range {``    // 尋找字串開始位置``    println(“Start with: \(range.startIndex)”)``    println(“End with: \(range.endIndex)”)``    // 取出要查詢的字串``    println(string[range])``}`

#### RacoonString
`string.match(&#34;awesome&#34;)  
if let regex = &#34;awe(some)&#34; {  
  string.match(regex)``}`

### 抓出特定範圍的字串
`let r = 3..&lt;5``let startIndex = advance(string.startIndex, r.startIndex)``let endIndex = advance(startIndex, r.endIndex — r.startIndex)``string[Range(start: startIndex, end: endIndex)]`

#### RacoonString
`string[3..&lt;5]`

### 切開字串
`split(string, {$0==” ”}, maxSplit: Int.max, allowEmptySlices: false)`

或是
`string.componentsSeparatedByString(“ “)`

#### RacoonString
`string.splitBy(&#34; &#34;)`

### 連接字串
`let joiner = “,”``joiner.join(matches)`

### 取代字串
`string.stringByReplacingOccurrencesOfString(“Swift”, withString: “Apple”, options: .LiteralSearch, range: nil)`

#### RacoonString
`string.sub(&#34;Swift&#34;, &#34;Apple&#34;)  
string.sub(0..&lt;5, &#34;Apple&#34;)`

### 大小寫轉換
`string.uppercaseString // 全部轉為大寫``string.capitalizedString // 每個單字第一個字大寫``string.lowercaseString // 全部轉為小寫`

### 去除前後空白與換行
`string.stringByTrimmingCharactersInSet(NSCharacterSet.whitespaceAndNewlineCharacterSet())`

#### RacoonString
`string.trim()`
