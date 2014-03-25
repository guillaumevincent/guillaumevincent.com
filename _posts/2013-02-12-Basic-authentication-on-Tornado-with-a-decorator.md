---
layout: post
lang: en
title: Basic authentication on Tornado with a decorator
author: gvincent
tags: tornado, python, authentication
---

[Tornado](http://www.tornadoweb.org/) is an open source web server developed by Facebook.
It implement various third-party authentication schemes to connect to services like Facebook, Google OAuth, Twitter, etc.
But Tornado doesn't provide a good documentation when you try to handle your own login service.
I tried to do mine.

<!--more-->

My goal is to allow a user to access my web application when he has good permissions.
I add 3 handlers, one for my index (MainHandler), one for my login page (AuthLoginHandler),
one for my logout page (AuthLogoutHandler).


{% highlight python %}
class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler),
            (r"/auth/login/", AuthLoginHandler),
            (r"/auth/logout/", AuthLogoutHandler),
        ]
        settings = {
            "template_path":Settings.TEMPLATE_PATH,
            "static_path":Settings.STATIC_PATH,
            "debug":Settings.DEBUG,
            "cookie_secret": Settings.COOKIE_SECRET,
            "login_url": "/auth/login/"
        }
        tornado.web.Application.__init__(self, handlers, **settings)
{% endhighlight %}


The settings\["login_url"\] property set the url to be used by the @authenticated decorator.
What I want is to redirect the user to login url (/auth/login/) if he's not identified.


{% highlight python %}
class MainHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        username = tornado.escape.xhtml_escape(self.current_user)
        self.render("index.html", username = username)
{% endhighlight %}


It's so simple, isn't it ?
<br> It remains for me to create a handler for my login screen, and a handler to delete my cookie when i reach auth/logout/ url.


{% highlight python %}
class AuthLoginHandler(BaseHandler):
    def get(self):
        try:
            errormessage = self.get_argument("error")
        except:
            errormessage = ""
        self.render("login.html", errormessage = errormessage)

    ...

class AuthLogoutHandler(BaseHandler):
    def get(self):
        self.clear_cookie("user")
        self.redirect(self.get_argument("next", "/"))
{% endhighlight %}


My login handler get method render the login.html page.


{% highlight html %}
<form action="/auth/login/" method="post" id="login_form">
    <fieldset>
        <label for="username">Username</label>
        <input class="text-input" id="username" name="username" type="text" value="">
    </fieldset>

    <fieldset>
        <label for="password">Password</label>
        <input class="text-input" id="password" name="password" type="password" value="">
    </fieldset>

    <fieldset>
        <span class="errormessage">{{errormessage}}</span>
    </fieldset>

    <div id="form_btn">
        <input id="signin-btn" class="btn btn-blue" type="submit" value="Sign In" tabindex="3">
    </div>
</form>
{% endhighlight %}

![login form](https://lh5.googleusercontent.com/-nfy2GESHMmI/URYyQCgy_4I/AAAAAAAAK7U/FA33XlBrjto/s299/login.png){.img-responsive}


When a user makes a POST request on /auth/login/,
my web server validates if the pair username/password is good and writes the user cookie.
Otherwise it redirects the user to the login page with an error message.


{% highlight python %}
class AuthLoginHandler(BaseHandler):
    def get(self):
        try:
            errormessage = self.get_argument("error")
        except:
            errormessage = ""
        self.render("login.html", errormessage = errormessage)

    def check_permission(self, password, username):
        if username == "admin" and password == "admin":
            return True
        return False

    def post(self):
        username = self.get_argument("username", "")
        password = self.get_argument("password", "")
        auth = self.check_permission(password, username)
        if auth:
            self.set_current_user(username)
            self.redirect(self.get_argument("next", u"/"))
        else:
            error_msg = u"?error=" + tornado.escape.url_escape("Login incorrect")
            self.redirect(u"/auth/login/" + error_msg)

    def set_current_user(self, user):
        if user:
            self.set_secure_cookie("user", tornado.escape.json_encode(user))
        else:
            self.clear_cookie("user")
{% endhighlight %}

All the current user informations are saved in a secure cookie.
Tornado provide set_secure_cookie and get_secure_cookie methods.
These two methods use a cookie secret key to encrypt the cookie.


Hope this helped !

<a href="https://gist.github.com/guillaumevincent/4771570">See the gist associate</a>
