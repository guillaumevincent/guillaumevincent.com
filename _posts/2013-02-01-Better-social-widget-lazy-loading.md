---
layout: post
lang: en
title: Better Social Widget Lazy Loading
author: gvincent
tags: social widget, lazy loading
---
I recently try to make lazy loading social widget. I found a solution I really loved. And i want to share with the community.

<!--more-->

I started by creating a CSS sprites for including images in my web page. The solution is pretty simple. I use a fixed size html bloc. And I manualy add 3 links, with all the same background image. I only change the background position to display the good image in each block.
I use the CSS stripes technique to make a single query when I load my page.


![social icon](https://lh4.googleusercontent.com/-biB8eXI7AbE/UQvxXDskG9I/AAAAAAAAK7A/jLVmq38gZX8/s115/social.png){:.img-responsive}


{% highlight html%}
<div id="social">
    <ul id="social_icon">
        <li id="panel1c"><a id="twitter" href=""></a></li>
        <li id="panel2c"><a id="googleplus" href=""></a></li>
        <li id="panel3c"><a id="facebook" href=""></a></li>
    </ul>
</div>
{% endhighlight %}


I adapt the CSS i found in this <a href="http://alistapart.com/article/sprites">excellent post</a>


{% highlight css %}
#social_icon {
    position: relative;
    margin: 20px 0px;
    padding: 0px;
    width: 170px;
    height: 25px;
}

#social_icon li {
    width: 50px;
    height: 25px;
    position: absolute;
    top: 0px;
    background: url(../img/social.png) 0 0 no-repeat;
    display: block;
    list-style: none;
}

#social_icon a {
    width: 49px;
    height: 24px;
    display: block;
}

#social_icon a:hover {
    border: solid 1px #000;
}

#social_icon #panel1c {
    left: 0px;
}

#social_icon #panel2c {
    left: 55px;
    background-position: 0 -45px;
}

#social_icon #panel3c {
    left: 110px;
    background-position: 0 -90px;
}

{% endhighlight %}


And i created a small jquery code to update my href attribute and use the good social api request


{% highlight javascript %}
$(document).ready(function() {
    var pathname = encodeURI(window.location);
    var tweeturl = 'http://twitter.com/share?url=' + pathname + '&via=rolalagile';
    $("#twitter").attr("href", tweeturl);

    var googleplusurl = 'https://plus.google.com/share?url=' + pathname
    $("#googleplus").attr("href", googleplusurl);

    var facebookurl = 'http://www.facebook.com/share.php?u=' + pathname
    $("#facebook").attr("href", facebookurl);
});
{% endhighlight %}