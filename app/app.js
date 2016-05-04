
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
        }]
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
        }]
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
        }]
    }];
//var isbns = ["0452286379", "0793821010", "0761523391"];
})();