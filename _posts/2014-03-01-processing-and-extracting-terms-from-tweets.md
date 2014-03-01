---
layout: post
title:  "Processing and extracting terms from large datasets of tweets"
date:   2014-03-01 17:40:00 +0100
tags:   tfm puma
---

Last month was specially productive and I'm developing a nice system for analyzing big datasets of tweets and start to obtain the first results.

As I explained in previous posts (yep... September 2013), I've been saving tweets by using XML because of the CSV complexity for representing tweets' content successfully. Once I had to start to analyze them, I had to implement some kind of XML parser for being able to extract the content of each tweet. By using Scala working with XML is much more easier than with Java and I used *pull parsing* and *pattern matching* for writing code like this:

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

Because this kind of parser works by using events, I just need to detect when the `EvElemStart` for the `<text>` element is fired in order to obtain its content. Said so, the line:

````scala
case EvElemStart(_, "text", _, _) => isTweetTextNode = true
````

has now more sense, isn't it? I set the variable `isTweetTextNode` to `true` because I need to be sure that I'm retrieving the content of text's nodes only when the parser is inside of the `<text>` element:

````scala
case EvText(text) if isTweetTextNode => applyFilter(text)
````

That simple block of code give me the ability of analyze large XML dataset (~8GB) without memory leak.

### Adding filters for extracting terms

#### Strategy

The main strategy that I'm following for inferencing tweets location by its content is to, roughly, compare the frequency of several terms within two different datasets that I collect with specific characteristics, in order to see what terms are more specific from each place by using the likelihood ratio test.

For instance, now I'm specially focused on distinguish Spanish tweets that are posted from Spain to the others posted from anywhere else. To achieve this goal, I used the collector [Falcon](https://github.com/sergio-alvarez/falcon) for retrieving two big dataset. One, from tweets located in Spain. The other, just for tweets written in Spanish.

For picking up the bounding boxes needed for retrieving tweets from Spain by using the [Twitter Streaming API](https://dev.twitter.com/docs/streaming-apis), I developed a web utility: [b2pick](https://github.com/sergio-alvarez/b2pick) which allows me to easily take bounding boxes by drawing rectangles around the desired areas:

![Bounding boxes from Spain](/assets/posts/Spain_bounding_boxes.png)

For each rectangle, b2pick returns the coordinates exactly how Twitter's API expects them:

![b2pick results panel](/assets/posts/b2pick_results_panel.png)

#### Extracting terms

Once I had the datasets and the XML parser set up, I had to develop the filters system that, for each tweet, extract the following terms:

* Mentions
* Hashtags
* Bigrams

In order to maximize the system's flexibility, I designed a custom implementation of the <strong>Decorator design pattern</strong> that allows to chain several filters dynamically for each tweet. I said this is a custom implementation, because in the original [Decorator](http://en.wikipedia.org/wiki/Decorator_pattern), it is usual that each filter acts over the results of previous decorators. But, in this case, I want each filter acts over the original tweet, because it has no sense to obtain bigrams over the results of extracting mentions and vice versa. So, each filter decorates the original tweet and concatenates its results with the previous extractions.

It gives me the ability of constructing filters by combining them:

````scala
new HashtagFilter(new MentionFilter()) // Extracts hashtags and bigrams for each tweet
new MentionFilter(new BigramsFilter()) // Extracts mentions and bigrams for each tweet
new BigramsFilter() // Extracts bigrams for each tweet
```

If you are interested, I've used the [twitter-text lib](https://github.com/twitter/twitter-text-java) for extracting mentions and hashtags for each tweet. As well as a simple implementation for extracting bigrams:

````scala
private[this] def getBigrams(tweet: String): List[Array[String]] = {
  tweet.split(" ").combinations(2).toList
}
```

Obviously, this last method produces some noise that I have to clean after the extraction by removing stop-words, empty bigrams, bigrams composed by the same words or those bigrams composed by non-words terms.
