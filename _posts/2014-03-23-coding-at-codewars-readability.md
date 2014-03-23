---
layout: post
title: "Coding @ Codewars: Code readability and maintainability vs. LOC"
date: 2014-03-23
tags: dev kata
---

One thing I like the most when I have some free time is spending time at [Codewars.com](http://www.codewars.com/) writing some [katas](http://en.wikipedia.org/wiki/Kata_\(programming\)) and practicing my programming skills. It is really impressive how you can learn and improve your expertise by doing katas and studying others solutions to the same problem.

The last week I saw an interesting situation when I was resolving a kata about how to validate coordinates (longitude and latitude values) from an input string.

This is the kata description:

````
You need to create a function that will validate if given parameters are
valid geographical coordinates.

Valid coordinates look like the following: "23.32353342, -32.543534534"

Latitude (which is first float) can be between 0 and 90, positive or negative.
Longitude (which is second float) can be between 0 and 180, positive or negative.

Coordinates can only contain digits, or one of the following symbols
(including space after comma) -, .

There should be no space between the minus "-" sign and the digit after it.

Here are some valid coordinates:

-23, 25
24.53525235, 23.45235
04, -23.234235
43.91343345, 143
4, -3
And some invalid ones:

23.234, - 23.4234
2342.43536, 34.324236
N23.43345, E32.6457
99.234, 12.324
6.325624, 43.34345.345
0, 1,2
0.342q0832, 1.2324
````

Regex.

Sure you have also thought that this is a simple problem for resolving by using regular expressions. First of all, I'll show you what my solution was, and then I'll explain other folks' solutions that present interesting points about which might be the better approach in a real world problem (IMHO, of course).

### Sergio's solution

````javascript
function isValidCoordinates(coordinates){
  var regex = /^((-)?[0-9]+(\.[0-9]+)?\,\s(-)?[0-9]+(\.[0-9]+)?)$/
  if(regex.test(coordinates)){
    var c = coordinates.split(" ").map(parseFloat);
    return c[0] <= 90 && c[0] >= -90 && c[1] <= 180 && c[1] >= -180;
  }
  return false;
}
````

Here I tried to use the power of regex for the initial input validation. The pattern rejects those inputs which do not contain valid float numbers or not respect the required format. Then, I split the input for checking whether the coordinates are valid latitude and longitude.

The goal of this approach is to make quality code (maintainable and readable) but without make it too verbose with unnecessary lines of code (which actually make a worse approach).

<div class="info">
<p>I do not ever said that this is the best possible solution. This is just <strong>my solution</strong>.</p>
</div>

### Most valued solution

````javascript
function isValidCoordinates(coordinates){
  return !!coordinates.match(/^-?([90]|[0-8][0-9]|[0-9])(\.\d+)?,\s-?([180]|[1][0-7][0-9]|\d{1,2})(\.\d+)?$/);
}
````

Here you are the most valued solution by the folks of Codewars. Obviously, this works perfectly. Just one line of code. Fast. Efficient.

But, imagine that now latitude and longitude change their ranges (*yep, I know the probability of this happens... just an example*). Do you want to be the bugfixer guy that have to change that almost-magic line of code? Well, in this case the regex is not impossible to understand, but there are cases where the regular expression is so complex that no one can take care of it. Nobody understand it.

You can find [many discussions](http://programmers.stackexchange.com/a/113243) on Internet trying to explain when you should use or not regular expressions. I see regex as a really important feature for solving several problems, but when I'm writing code which are going to be read and modified by other colleagues, I try to do it in the most self-explanatory way that I can, and regular expressions do not usually fit in terms of readability...


### Most verbose solution

````javascript
function isValidCoordinates(c){

    // check if there is an invalid character in the string
    // find the positions of the comma in the string
    var commapos = -1;
    var spacepos = -1;
    var dotcount = 0;
    var minuspos = -1;
    for (var i=0; i<c.length; i++) {
        if (invalidChar(c[i])) return false; // check for invalid characters
        if (c[i] === ".") {
            if (dotcount != 0) return false;
            dotcount++;
        }else if (c[i] === ",") {
            if (commapos === -1) commapos = i, dotcount = 0;
            else return false; // we have more than one comma
        }else if (c[i] === " ") {
            if (spacepos != -1) return false;
            spacepos = i;
        }else if (c[i] === "-"){
            if (minuspos != -1) return false;   //if we have more than one - in one of the numbers
            if (commapos === -1) {
                if (i != 0 ) return false; //-not at the correct position
                minuspos = i;
            } else {
                if (i != commapos + 2) return false; //-not at the correct position
                minuspos = i;
            }
        }
    }

    //check if there is a space next to the comma
    if (spacepos != commapos+1) return false;

    // find Strings corresponding to latitude and longitude
    // check if they are within the acceptable boundries
    var lat, long;

    if (c[0] === "-") lat = -1 * parseFloat(c.substring(1,commapos));
    else lat  = parseFloat(c.substring(0,commapos));
    if (-90 > lat || lat> 90) return false;

    if (c[commapos+2] === "-") long = -1 * parseFloat(c.substring(commapos+3));
    else long = parseFloat(c.substring(commapos+2));
    console.log(long);
    if(-180 > long || long > 180) return false;

    return true;

}

// checks if the given char is invalid (different from : number, "," "-", ".")
function invalidChar(char) {
    var valid =[",", "-", "."];
    if (isNaN(char) && valid.indexOf(char) === -1 ) return true;
    return false;
}
````

What a long code! I don't want to be either the guy who must fix this code if there are some requirements changes...

I think this is the perfect example about how sometimes programmers make our own life complicated.

It is not easy to see that both code fragments (most valued and this) are resolving the same problem, right?

### Conclusion

I hope you have understood the goal of this article. All of the previous examples work fine. But, in strictly mode, I like the approach of writing the less code possible, KISS, DRY, whatever... but also keeping in mind that your code is going to be maintained by someone (actually, that someone could be you at some time), and it is your responsibility, as a good software engineer, to make your code readable and maintainable.

Really looking forward to see your thoughts about this topic!

### Appendix

I want to say many thanks to Nathan from Codewars for giving me the opportunity to use the kata and solutions for writing this post.
