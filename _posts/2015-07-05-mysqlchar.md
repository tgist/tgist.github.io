---
layout: post
title: MySQL中char(2)能够保存几个中文字符
category: tech
tags: [ecshop, php]
---


- mysql中有好几种编码方式，所以我们要把主要的几种都试一下。

1. 首先是utf-8编码方式，虽然知乎上面有很多说法，但是本着实践出真知的精神，我们发现只能存放2个中文字符。
2. 再次是latin编码，不出意料也是。
3. 到gbk，没问题，也是两个中文字符。

|utf-8|latin|gbk
|2|2|2