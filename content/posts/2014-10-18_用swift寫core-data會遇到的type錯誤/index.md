---
title: "用Swift寫Core Data會遇到的Type錯誤"
author: "兔子"
date: 2014-10-18T14:56:19.470Z
lastmod: 2025-03-21T21:19:47+08:00

description: ""

subtitle: "這幾天用Swift撰寫Core Data的應用時總是會出現一些詭異的錯誤，像是下面這段Code："

image: "/posts/2014-10-18_用swift寫core-data會遇到的type錯誤/images/1.png" 
images:
 - "/posts/2014-10-18_用swift寫core-data會遇到的type錯誤/images/1.png"
 - "/posts/2014-10-18_用swift寫core-data會遇到的type錯誤/images/2.png"


aliases:
    - "/swift-core-data-type-592e37e3f4c8"

---

這幾天用Swift撰寫Core Data的應用時總是會出現一些詭異的錯誤，像是下面這段Code：
`var fetchRequest = NSFetchRequest(entityName: “Person”)  
var people = appDelegate.managedObjectContext?.executeFetchRequest(fetchRequest, error: nil)  
var person = people?.first as Person  
println(people)  
println(person)`

同樣類似的用法，我曾遇過下面兩種奇特的狀況

一種是第一個println有輸出Array與值，但person卻是nil。

而另一種則是直接就顯示下面的Warning接著Crash
> **CoreData: warning: Unable to load class named ‘Person’ for entity ‘Person’. Class not found, using default NSManagedObject instead.**

查了許多地方後終於找出了問題的所在，原來在Swift中關於Type的形式應該是 **ProjectName.TypeName**

但Xcode在 .xcdatamodeld 新增Entity時，並不會將Entity指向正確的Type，格式只有 **TypeName，**導致Runtime時找不到該Type，所以不然是因為 as 的轉型態不正確而變成 nil，要不然就是直接Crash。

我想這是諸多Swift為了相容於舊專案而衍生出來的問題之一，不過解法也相當簡單，只要到 .xcdatamodeld 檔案中的Configurations將每一個Entity的Class指向正確的地方就可以了。

![image](/posts/2014-10-18_用swift寫core-data會遇到的type錯誤/images/1.png#layoutTextWidth)

![image](/posts/2014-10-18_用swift寫core-data會遇到的type錯誤/images/2.png#layoutTextWidth)


現在總算是可以正確的抓出我要的資料了。
