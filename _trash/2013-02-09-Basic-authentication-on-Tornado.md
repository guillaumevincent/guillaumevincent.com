---
layout: post
lang: en
title: Basic authentication on Tornado
author: gvincent
tags: tornado, python, authentication
---
<blockquote>
You should look at <a href="/2013/02/12/Basic-authentication-on-Tornado-with-a-decorator.html">this post</a> using a decorator</blockquote>
<p>
<a href="http://www.tornadoweb.org/">Tornado</a> is an open source web server developed by Facebook. It implement various third-party authentication schemes to connect to services like Facebook, Google OAuth, Twitter, etc. But Tornado doesn't provide a good documentation when you try to handle your own login service. I tried to do mine. Let's take a look:
<br>
<b>This solution does not use decorator method, which can be a more pythonista's way to solve this problem</b>.
<br>
My goal is to allow a user to access my web application when he has good permissions. I add 4 handlers, one for my index (MainHandler), one for my login page (LoginHandler), one for my logout page (LogoutHandler) and a last one for my web application (ScubabookHandler). 
</p>

{% highlight python %}
class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler),
            (r"/auth/login/", LoginHandler),
            (r"/auth/logout/", LogoutHandler),
            (r"/sb/", ScubabookHandler),
            ]
        settings = dict(
            template_path=Settings.TEMPLATE_PATH,
            static_path=Settings.STATIC_PATH,
            debug=Settings.DEBUG,
            cookie_secret=Settings.COOKIE_SECRET
            )
        tornado.web.Application.__init__(self, handlers, **settings)
{% endhighlight %}

The solution works like this:
When I start my web application i go to http://localhost:8888/ to get connected. I fill my form and hit enter, which send a POST request to "/auth/login/" page.

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

![login](https://lh5.googleusercontent.com/-nfy2GESHMmI/URYyQCgy_4I/AAAAAAAAK7U/FA33XlBrjto/s299/login.png){.center}

My login handler get the username and password and check permissions.
If the pair login/password is good, LoginHandler set the current user and redirect to /sb/ web application otherwise LoginHandler redirect to the index with an error message.

{% highlight python %}
class LoginHandler(BaseHandler):

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
            self.redirect(self.get_argument("next", u"/sb/"))
        else:
            error_msg = u"?error=" + tornado.escape.url_escape("Login incorrect")
            self.redirect(u"/" + error_msg)

    def set_current_user(self, user):
        if user:
            self.set_secure_cookie("user", tornado.escape.json_encode(user))
        else:
            self.clear_cookie("user")
{% endhighlight %}

My last handler start to ensure that the current user exist. If not it redirect to my index.

{% highlight python %}
class ScubabookHandler(tornado.web.RequestHandler):

    def get_current_user(self):
        return self.get_secure_cookie("user")

    def get(self):
        if not self.current_user:
            self.redirect("/")
            return
        username = self.current_user
        self.write('Hi there, '+ username)
{% endhighlight %}

All the current user informations are saved in a secure cookie. Tornado provide set_secure_cookie and get_secure_cookie methods. These two methods use a cookie secret key to encrypt the cookie.

The last thing i have to do is to check if a user exists when I hit my index. I automatically redirect to my web application and skip the login form. Here is why i'm looking at decorator method, to avoid this kind of duplication in my code.
Hope this helped !

<a href="https://gist.github.com/guillaumevincent/4745647">See the gist associate</a>