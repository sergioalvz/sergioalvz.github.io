---
layout: post
title:  "No set"
tags:   tfm puma
---

Hey! What a long time without writing anything... It was a crazy time last months. I have been finishing my lectures at University and I've also switched to a new job, so... exciting times are coming! :)

Thanks god I had also time for working on my Master Thesis. The last month was specially productive and I have a nice system for analyzing big datasets of tweets and obtaining some interesting results.

As I explained in my previous post (yep... September 2013), I've been saving tweets by using XML because of the CSV complexity for representing tweets' content successfully. Once I had to start to analyze them, I had to implement some kind of XML parser for being able to extract the content of each tweet. By using Scala, working with XML is much more easier than with Java, so by using SAX and *pattern matching* I wrote code like this:

````scala
val reader = new XMLEventReader(Source.fromFile(_path))
var isTweetTextNode = false
reader.foreach(event => {
  event match {
    case EvElemStart(_, "text", _, _) => isTweetTextNode = true
    case EvText(text) if isTweetTextNode => applyFilter(text)
    case EvElemEnd(_, "text") => isTweetTextNode = false
    case _ => ;
  }
})
````

Because SAX works by using events, I just need to detect when the element *text* is reached for obtaining its content. Said so, the line:

````scala
case EvElemStart(_, "text", _, _) => isTweetTextNode = true
````

matches when the text element starts. I set the variable `isTweetTextNode` to `true` in order to ensure that I retrieve the content of text's nodes only when is inside of the *text* element:

````scala
case EvText(text) if isTweetTextNode => applyFilter(text)
````

This simple block of code give me the ability of analyze big XML dataset (~8GB) without memory leak.

