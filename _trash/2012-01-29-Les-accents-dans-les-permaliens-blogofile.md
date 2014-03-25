---
layout: post
lang: fr
title: Supprimer les accents des titres blogofile
author: gvincent
tags: hack, blogofile
---

Blogofile, le générateur de blog statique que j'utilise, a la fâcheuse tendance de mettre des accents dans les permaliens de nos billets.
C'est assez ennuyeux, surtout si comme moi votre hébergeur n'accepte pas les caractères unicodes dans ses urls.
J'ai modifié un hack de [zzzeek](http://twitter.com/zzzeek) qui corrigeait ce défaut, mais qui supprimait les accents.
J'ai amélioré cette modification pour remplacer les accents par les lettres correspondantes.

[ancien hack](http://techspot.zzzeek.org/2010/12/06/my-blogofile-hacks/)

{% highlight python %}
diff --git a/_controllers/blog/post.py b/_controllers/blog/post.py
index c95b580..0a8922e 100644
--- a/_controllers/blog/post.py
+++ b/_controllers/blog/post.py
@@ -24,6 +24,8 @@ import BeautifulSoup
 
 import blogofile_bf as bf
 
+import unicodedata
+
 logger = logging.getLogger("blogofile.post")
 
 config = bf.config.controllers.blog.post
@@ -158,7 +160,8 @@ class Post(object):
	          text = ''.join(s.findAll(text=True))\
	                              .replace("\n", "").split(" ")
	          return " ".join(text[:num_words]) + '...'
-        
+  	
+
	 def __post_process(self):
	     # fill in empty default value
	     if not self.title:
@@ -166,7 +169,31 @@ class Post(object):
	                 datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
	     
	     if not self.slug:
-            self.slug = re.sub("[ ?]", "-", self.title).lower()
+			#original blogofile hack by zzzeek			
+			#http://techspot.zzzeek.org/2010/12/06/my-blogofile-hacks/
+
+			slug = self.title.lower()
+
+			#accents replaced by the corresponding letters without accent
+			nkfd_form = unicodedata.normalize('NFKD', unicode(slug))
+			slug = u"".join([c for c in nkfd_form if not unicodedata.combining(c)])
+
+			# convert ellipses to spaces
+			slug = re.sub(r'\.{2,}', ' ', slug)
+
+			# flatten everything non alpha or . into a single -
+			slug = re.sub(r'[^0-9a-zA-Z\.]+', '-', slug)
+
+			# trim off leading/trailing -
+			slug = re.sub(r'^-+|-+$', '', slug)
+			self.slug = slug
+
+			#######################################################
+
+			# original
+			#self.slug = re.sub("[ ?]", "-", self.title).lower()
+
+			#######################################################
 
	     if not self.date:
	         self.date = datetime.datetime.now(pytz.timezone(self.__timezone))

{% endhighlight %}

