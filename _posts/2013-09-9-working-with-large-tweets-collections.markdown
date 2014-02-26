---
layout: post
title:  "Working with large tweets' collections"
date:   2013-09-09 18:57:07
tags:   tfm falcon
---

These days I’ve been facing the first challenges working on my Master Thesis. As I’ve been explaining in other posts, to be able of achieve the main goal of the Thesis I have to create a system which can work with large collections of tweets in order to analyze them.

I already had a large collection of spanish tweets (± a million and a half) which I had been collected on July. This collection was stored in a CSV file which I thought it was the easiest way of processing them later, because other alternatives such as XML or JSON would imply to create a tree structure (with more than a million of nodes) in memory for being able to process them.

Of course, **this was my first mistake**. Working with CSV presents another kind of potential disadvantages because of the kind of content which I’m going to analyze. My tweets' collection resulted in a non-valid CSV file with comma chars embedded inside the values and several characters which I'd have to escape. In fact, although the use of CSV may seem simple, there are many complex cases to manage, and also specialized libraries fail when working with some kinds of file. This was my experience with *OpenCSV*, which offers a really nice performance for several tasks with CSV but, in my particular case, it couldn't parse my CSV file successfully.

So, I had to start thinking about one of the other alternatives: **XML**.  OK, firstly I thought about a large tree structures in memory... but, obviously it must exist an alternative way.  XML it is present in almost every kind of projects, and its use with large files must be already covered.  And, a Google search later, I remembered SAX. Apparently, problem solved.

SAX works without loading the entire XML tree structure in memory, by only  analyzing each element of the XML document sequentially. This key feature allows me to process each tweet without a memory leak.

In addition, XML offers to me a better way for structuring the tweets' collection, avoiding some of the problems presented before.

Due to this strategy change, I had to start on thinking about technologies which facilitate the work of manipulate XML files. The July tweets' collection was done by using an small Java system which I had developed for the last subject of the Master's first course.

IMHO, working with XML in Java is no easy and I remembered some interesting points about the **Scala** support for this kind of files. Once I thought this, I started to read about Scala and, finally, it was the language which I've chosen for making the tasks about collecting and analyzing the set of tweets.

Some of the benefits of using Scala (which perhaps may not be applied to your particular case) are:

### XML native support
Working and serialize an object in XML by using Scala is absurdly simple:

````scala
/**
 * Project: falcon
 * Package: org.falcon.model
 *
 * Author: Sergio Álvarez
 * Date: 09/2013
 */
class Tweet(username: String, location: String, timezone: String, latitude: String, longitude: String, text: String) {

  def toXML =
    <tweet>
      <username>
        {username}
      </username>
      <location>
        {location}
      </location>
      <timezone>
        {timezone}
      </timezone>
      <latitude>
        {latitude}
      </latitude>
      <longitude>
        {longitude}
      </longitude>
      <text>
        {text}
      </text>
    </tweet>
}
````

The Scala support for working with literals allows us to code the objects' XML representation easily. As well as its later deserialization.

### Compile to JVM code
This is specially interesting because allows Java developers to use libraries which they are familiar with in their Java programs.

Actually, Scala has another good points for Java developers because, although it is a functional language, it allows imperative programming and its object-oriented philosophy is really similar to Java. These reasons give to Java developers the ability of starting to write Scala code quickly (which does not imply that they can write high quality Scala code quickly...)

### Summary
Just for making a brief summary about the exposed in this post:

* CSV is not a good choice for storing large collections of tweets with complex content
* SAX offers the possibility of working with large XML files efficiently with no memory leaks
* Scala's support for XML is a **key feature** for choosing it over Java

You can see the application of the previous ideas on my [GitHub](https://github.com/sergio-alvarez) profile.
