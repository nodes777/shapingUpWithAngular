# Angular Book Store

An extension of [Code School](https://www.codeschool.com/courses/shaping-up-with-angular-js) course on Angular.js. This was made as my first foray into Angular, and after following the course I changed it from a gem store to a book store showcasing my favorite books. Instead of using all local data to display the books, I switched to using $http.get() to make an AJAX call to Google Books to pull data from there, because why host more data than you need to, ya know? I also added a new product tab that describes my experience with the book and why it's one of my favorites.

## Setup

You can see the site live at [taylornodell.com](http://taylornodell.com/bookstore).

You can also download the files here, but some features require a server to be running. If you have node and npm
installed, you can run `npm install http-server -g`. Then run the `http-server`
command inside the `app` folder and you should be able to see the application
running at `http://127.0.0.1:8080/`.

You can edit the original version [on your browser on plunkr](http://plnkr.co/edit/LXETQi?p=preview).

## Attributions

* [Code School](https://github.com/codeschool/ShapingUpWithAngular.js/blob/master/app/index.html)

## Frameworks & Techniques
* Angular.js
* Google Books API
* Templating
* Bootstrap


