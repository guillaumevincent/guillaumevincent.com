guillaumevincent.com
====================

v0.2.0

Requirements
------------
* [jekyll](http://jekyllrb.com/)
* [gulp](http://gulpjs.com/)
* [bower](http://bower.io/)
* [nodejs](http://nodejs.org/)


Build
-----

    jekyll build
    cd config
    gulp css
    gulp uncss

Test
----
start two processus:

gulp in watch mode

    cd config
    gulp

and jekyll web server in watch mode

    jekyll serve --watch

open in a browser http://0.0.0.0:4000/

Notes
-----

Modify static files only in static folder. Public folder is used by gulp to save optimize static files.

Thanks
------
A big thank you to Paul Lewis ‏@aerotwis, because I stole his beautiful "Hello!" div on his web site: http://aerotwist.com


License
-------
The MIT License (MIT)

Copyright (c) 2014 Guillaume Vincent

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.