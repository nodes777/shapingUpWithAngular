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
        //this.products = books; //This is the local data, defined below
        var store = this;
        store.products = [];
        var isbns = ["0452286379", "0793821010", "0761523391"];
        isbns.forEach(function(isbn) {
            var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn + "&key=AIzaSyBQ9ddCXiRFaB8IoNO3ghXfk4SjlxZizJY";
            var book = {};
            $http.get(url).success(function(data) {

                /*Add Google Books Data*/
                book.title = data.items[0].volumeInfo.title;
                book.author = data.items[0].volumeInfo.authors[0];
                book.description = data.items[0].volumeInfo.description;
                book.pageCount = data.items[0].volumeInfo.pageCount;
                book.image = data.items[0].volumeInfo.imageLinks.thumbnail;
                book.pubDate = data.items[0].volumeInfo.publishedDate;
                book.link = data.items[0].accessInfo.webReaderLink;
                console.log(book.link);

                /*Add Local Data*/
                book.isbn = isbn;
                book.reviews = {};

                /*Push it to the store*/
                store.products.push(book);
            });
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


    var books = [{
        name: 'The Fountainhead',
        description: "When The Fountainhead was first published, Ayn Rand's daringly original literary vision and her groundbreaking philosophy, Objectivism, won immediate worldwide interest and acclaim. This instant classic is the story of an intransigent young architect, his violent battle against conventional standards, and his explosive love affair with a beautiful woman who struggles to defeat him.",
        author: "Ayn Rand",
        price: 6.48,
        isbn: 0452286379,
        rarity: 7,
        color: '#CCC',
        pages: 753,
        images: [
            "img/fhead1.jpg",
            "img/fhead2.jpg",
            "img/fhead3.jpg"
        ],
        reviews: [{
            stars: 5,
            body: "I love this gem!",
            author: "joe@thomas.com",
            createdOn: 1397490980837
        }, {
            stars: 1,
            body: "This gem sucks.",
            author: "tim@hater.com",
            createdOn: 1397490980837
        }]
    }, {
        name: 'The Simple Guide to Fresh Water Aquariums',
        description: "The key to becoming a dedicated aquarium hobbyist is to succeed with your first aquarium. The Simple Guide to Freshwater Aquariums concentrates on providing you with a complete plan and all the information you need to choose and use the right-for-you aquarium equipment and the right-for-you fish and plants: it wants you to succeed. The information is presented in a completely straightforward text that’s easy to read, easy to understand - and very definitely easy to put to good use.",
        author: "David E. Boruchowitz ",
        price: 4.33,
        rarity: 6,
        isbn: 0793821010,
        color: '#EEE',
        pages: 254,
        images: [
            "img/fish1.jpg",
            "img/fish2.jpg",
        ],
        reviews: [{
            stars: 3,
            body: "I think this gem was just OK, could honestly use more shine, IMO.",
            author: "JimmyDean@sausage.com",
            createdOn: 1397490980837
        }, {
            stars: 4,
            body: "Any gem with 12 faces is for me!",
            author: "gemsRock@alyssaNicoll.com",
            createdOn: 1397490980837
        }]
    }, {
        name: 'Zircon',
        description: "Zircon is our most coveted and sought after gem. You will pay much to be the proud owner of this gorgeous and high shine gem.",
        shine: 70,
        price: 1100,
        rarity: 2,
        color: '#000',
        faces: 6,
        images: [
            "img/gem-06.gif",
            "img/gem-07.gif",
            "img/gem-10.gif"
        ],
        reviews: [{
            stars: 1,
            body: "This gem is WAY too expensive for its rarity value.",
            author: "turtleguyy@zdn.me",
            createdOn: 1397490980837
        }, {
            stars: 1,
            body: "BBW: High Shine != High Quality.",
            author: "LouisW407@gmail.com",
            createdOn: 1397490980837
        }, {
            stars: 1,
            body: "Don't waste your rubles!",
            author: "nat@flatland.com",
            createdOn: 1397490980837
        }]
    }];

})();