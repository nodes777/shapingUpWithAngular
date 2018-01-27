
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
      name: 'Freakonomics',
      isbn: '0062132342',
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
        myTake:"I read this in high school at the recommendation of my father. Building off of the ideas of “Thinking Fast and Slow” by Daniel Kahneman, the authors present economics in a very accessible way. Sort of like Popular Mechanics but for economics. I'm also of fan of the podcast by the same name."
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
        myTake: "Definitely not required reading for most people. This book got me really excited about fish keeping, which I know is a bit odd. I was in middle school and the thing I liked most about the hobby is the absolute control you have over this environment. I don’t consider myself a very controlling person, but being able to see and influence all the minutiae of nitrates, water hardness, and pH was really fun for me. Not to mention the aesthetic of having a glowing, bubbling tank, full of hovering animals in your living room is just pleasant. This book helped me raise several tanks at a young age and even become a fish father to many platies."
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
    },{
      name: 'The Zero Marginal Cost Society',
      isbn: '1137278463',
      price: 1,
       reviews: [{
            stars: 5,
            body: " This is preposterous!",
            author: "joe@thomas.com",
            createdOn: 1397490980837
        }, {
            stars: 1,
            body: " I really enjoyed this book!",
            author: "crumbs@mumble.com",
            createdOn: 1397490980837
        }],
        myTake:"I like to stay up to date on economic theory and as a big fan of Freakonomics and other ‘pop-econ’, I knew I just had to get this book. I was not disappointed. Jeremy Rifkin pulls in many facets of near-future life to create a highly probable prediction for the demise of capitalism, due to capitalism.."
    }];
//var isbns = ["0062132342", "0793821010", "0761523391"];
})();