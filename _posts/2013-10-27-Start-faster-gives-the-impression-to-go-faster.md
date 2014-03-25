---
layout: post
title: Start faster gives the impression to go faster
author: gvincent
lang: en
tags: user experience, javascript, gmail
---

One of the most critical aspects of any web project is performance !
Performance is extremely important and there are a lot of techniques every web developers can use:

 *  Make fewer requests
 *  Maximising parallelisation
 *  DNS prefetching
 *  GZip and minification
 *  Optimising images

But there is an other technique I really like:

* Persuade user's brain that your site loads faster (confuse the user's brain)

<!--more-->

If you start faster, you gives the impression to go faster. For example if you fake the rendering of a progress bar
you can give the impression that loading took less time. It's just an impression. But it is very effective.

As Gmail, imagine you hide all the elements before the page is loaded.
You loads the minimum CSS/JS/HTML file to implement a progress bar,
and then load the rest of the JavaScript elements asynchronously.
Once everything is loaded, you display the entire page.

Now you fake the rendering of your progress bar by accelerating it at the beginning.
In my case I created a gaussianFunction corresponding to an array of 100 fake increments.
Every time I render my loading bar, I add this number to my total count.

{% highlight javascript %}
var gaussianFunction = [0, 1, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 6, 7, 7, 8, 9, 9, 10, 10, 11, 11, 12, 13, 13, 14, 14, 15, 16, 16, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 19, 19, 19, 18, 18, 18, 17, 17, 16, 16, 15, 14, 14, 13, 13, 12, 11, 11, 10, 10, 9, 9, 8, 7, 7, 6, 6, 6, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0];

var fakecount = count + gaussianFunction[count]

{% endhighlight %}

With this simple trick, you give the impression to go faster. While you take the same time to load.

## You wanna see a demo ?

Sure, [here you go...](/demos/gmail-loader/)

[jsbin](http://jsbin.com/amevId/176/)


![gmail loader](https://lh4.googleusercontent.com/-9EH0gqVz7ss/Um4MpLkXmfI/AAAAAAAANOU/uNPY6hcJEIU/w476-h677-no/Capture+d%2527e%25CC%2581cran+2013-10-27+23.58.48.png){.center .img-responsive}

If you have other kind of brain confuse techniques, let me know and put a comment bellow.