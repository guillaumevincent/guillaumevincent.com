---
layout: post
title:  Tags
search_omit: true
---

{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
{% assign tags = site_tags | split:',' | sort %}

{% for item in (0..site.tags.size) %}{% unless forloop.last %}
  {% capture this_word %}{{ tags[item] | strip_newlines }}{% endcapture %}
  <h2 id="{{ this_word }}">{{ this_word }}</h2>
  <ul class="post-list">
  {% for post in site.tags[this_word] %}{% if post.title != null %}
    <li>
    <a href="{{ site.url }}{{ post.url }}">{{ post.title }} - 
    <span class="entry-date">
    <time>
    {% assign m = post.date | date: "%-m" %}
    {{ post.date | date: "%-d" }}
    {% case m %}
    {% when '1' %}janvier
    {% when '2' %}février
    {% when '3' %}mars
    {% when '4' %}avril
    {% when '5' %}mai
    {% when '6' %}juin
    {% when '7' %}juillet
    {% when '8' %}août
    {% when '9' %}septembre
    {% when '10' %}octobre
    {% when '11' %}novembre
    {% when '12' %}décembre
    {% endcase %}
    {{ post.date | date: "%Y" }}
    </time>
    </span></a></li>
  {% endif %}{% endfor %}
  </ul>
{% endunless %}{% endfor %}