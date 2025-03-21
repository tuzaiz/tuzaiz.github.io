---
title: "Swift下將NSData轉換成String"
author: "兔子"
date: 2014-10-19T14:58:58.623Z
lastmod: 2025-03-21T21:19:48+08:00

description: ""

subtitle: "Swift中跟Foundation之間的恩怨情仇實在剪不斷理還亂。"




aliases:
    - "/swift-nsdata-string-323ed8a7e3cc"

---

Swift中跟Foundation之間的恩怨情仇實在剪不斷理還亂。

在Foundation中大部份I/O時都會取得NSData格式的資料，而以前在Objective-C時取得NSData要轉成NSString需要經過
`NSString *string = [[NSString alloc] initWithData:data encoding:NSUTF8Encoding];`

將NSData轉換成NSString，但是在Swift下對於字串有自己專用的Type **String**

我原本以為應該會有 **String.stringWithData(data, encoding=.UTF8)** 或是 **String(data, encoding=.UTF8)** 之類的方法可以用，結果找了半天都找不到。

查了半天，結果終於找到解法：
`var string : String = NSString(data: data, encoding: NSUTF8StringEncoding)`

原來因為在Swift下的String基本上背後還是NSString，所以可以直接轉換來使用。

Swift是個好語言，不過為了與既有的Foundation架構還有Objective-C相容實在要花太多的力氣，這是目前學習Swift的一個很大的障礙，接下來就看蘋果會怎麼去發展這個潛力無窮的新語言囉。
