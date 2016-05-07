
(function() {
    var app = angular.module('bookStore', ['store-directives']);

    app.controller('GalleryController', function() {
        this.imageIndex = 0;
        this.currentImageChange = function(imageNumber) {
            console.log(imageNumber);
            this.imageIndex = imageNumber || 0;
        };
    });

    app.controller('StoreController', ['$http', function($http) {
        var store = this;
        store.products = [];
        /*For each item in the data below*/
        localData.forEach(function(localData) {
          /*Create an empty book object*/
            var book = {};
            /*Get the isbn number and create a url to GET with*/
            var isbn = localData.isbn
            var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn + "&key=AIzaSyBQ9ddCXiRFaB8IoNO3ghXfk4SjlxZizJY";

            /*Add Google Books Data*/
            $http.get(url).success(function(data) {
                book.title = data.items[0].volumeInfo.title;
                book.author = data.items[0].volumeInfo.authors[0];
                book.description = data.items[0].volumeInfo.description;
                book.pageCount = data.items[0].volumeInfo.pageCount;
                book.image = data.items[0].volumeInfo.imageLinks.thumbnail;
                book.pubDate = data.items[0].volumeInfo.publishedDate;
                book.link = data.items[0].accessInfo.webReaderLink;
            });

            /*Add Local Data*/
            book.isbn = localData.isbn;
            book.reviews = localData.reviews;
            book.price = localData.price;
            book.myTake = localData.myTake;

            /*Push it to the store*/
            store.products.push(book);
        })
    }]);

    app.controller("ReviewController", function() {

        this.review = {};

        this.addReview = function(product) {
            this.review.createdOn = Date.now();
            product.reviews.push(this.review);
            this.review = {};
        };

    });

    var localData = [{
      name: 'The Fountainhead',
      isbn: '0452286379',
      price: 6.48,
       reviews: [{
            stars: 5,
            body: "I love this book!",
            author: "joe@thomas.com",
            createdOn: 1397490980837
        }, {
            stars: 1,
            body: "This is a bad book.",
            author: "tim@hater.com",
            createdOn: 1397490980837
        }],
        yLink: "https://www.youtube.com/watch?v=4196WvmEcYM",
        myTake:"If I can, I’d like to bypass the political affiliations this book has, and just focus on where I was while reading this. I had just graduated high school and was taking some time off before college. During this “gap semester”, I was working full time at a TJ Maxx and had freedom that I never really had before. This book was a motivator, it told me the very Disney-esque, you can do anything you want if you work hard, story. While I understand I have a lot more opportunity than most people, I think this is an important lesson. It helped me stay focused on improving myself, at a time when I could’ve just been partying with friends. It’s a good self-discipline, pro creator book."
    },{
      name: 'The Simple Guide to Fresh Water Aquariums',
      isbn: '0793821010',
      price: 4.33,
       reviews: [{
            stars: 3,
            body: "Pretty decent guide.",
            author: "JimmyDean@sausage.com",
            createdOn: 1397490980837
        }, {
            stars: 4,
            body: "Very useful for me!",
            author: "gemsRock@alyssaNicoll.com",
            createdOn: 1397490980837
        }],
        myTake: "Definitely not required reading for most people. This book got me really excited about fish keeping, which I know is a bit odd. I was in middle school and the thing I liked most about the hobby is the absolute God-like control you have over this environment. I don’t consider myself a very controlling person, but being able to see and influence all the minutiae of nitrates, water hardness, and pH was really fun for me. Not to mention the aesthetic of having a glowing, bubbling tank, full of hovering animals in your living room is just pleasant. This book helped me raise several tanks at a young age and even become a fish father to many platies."
    },{
      name: 'The Sims',
      isbn: '0761523391',
      price: 1,
       reviews: [{
            stars: 5,
            body: "Great game, great book!",
            author: "joe@thomas.com",
            createdOn: 1397490980837
        }, {
            stars: 1,
            body: "Not enough pictures.",
            author: "tim@hater.com",
            createdOn: 1397490980837
        }],
        myTake:"This one is a joke. I think it’s pretty funny if someone asks me what my favorite book is and I say “The Sims Strategy Guide”."
    }];
//var isbns = ["0452286379", "0793821010", "0761523391"];
})();