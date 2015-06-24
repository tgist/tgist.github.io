---
layout: post
title: "多说评论与jekyll的结合"
category: tech
---

# 多说评论嵌入到博客中

- 声明：跟着我的步骤走肯定能够完成。
1. 到多说评论的官网注册一个账户并且获取一个shortname。（具体方法不赘述）
2. 获取到信息之后，到多说的后台管理，点击工具，里面有多说评论框的html代码和js代码。
3. 里面可能会有一个让你迷惑的东西那就是这一段代码：
4. ```html
<div class="ds-thread" 
data-thread-key="请将此处替换成文章在你的站点中的ID" 
data-title="请替换成文章的标题" 
data-url="请替换成文章的网址">
</div>
```
5. 此代码中有三处要改动的地方，这些都应该用Liquid的语法进行填写，具体填写什么呢。
6. ```html
<div class="ds-thread" 
{% if page.id %}data-thread-key="{{ page.id }}"{% endif %}  
data-title="{% if page.title %}{{ page.title }} - {% endif %}
{{ site.title }}">
</div>
```
7. 第一个是page.id 第二个是page.title 第三个是site.title
8. 让多说评论框在你的文章详情页面显示，还需要一个步骤，那就是找到你的post.html（详情页面模板）并且将你从多说官网复制下来的东西放到里面就ok了。
 - 易出错：多说评论为什么能够评论到你的评论系统中去呢？就是因为获取到了你的shortname，所以说shortname写错了的话，那就呵呵了。