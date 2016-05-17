
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

function getBooks(callback){
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
    // and when the asynchronous stuff is complete
    callback(store.products);
}

function babylon(){
    // call getBooks function and pass in a callback function which
    // first function runs when it has completed
    getBooks(log);
    //define the callback function, named log
    function log(fullStore) {
        console.log('huzzah, I\'m done!');
        console.log(fullStore[0]);
        console.log(fullStore);
        console.log("pageCount: "+fullStore[0].pageCount);
        console.log("price: "+fullStore[0].price);
       makeGraph();
    }
}
babylon();

function makeGraph(){
    var bardata = [];
        for (var i = 0; i < store.products.length; i++) {
            bardata.push(store.products[i].price);
        }

           var margin = { top: 30, right: 30, bottom: 40, left:70 }

            var height = 400 - margin.top - margin.bottom,
                width = 600 - margin.left - margin.right,
                barWidth = 50,
                barOffset = 5;

            var tempColor;

            var colors = d3.scale.linear()
            .domain([0, bardata.length*.33, bardata.length*.66, bardata.length])
            .range(['#B58929','#C61C6F', '#268BD2', '#85992C'])

            var yScale = d3.scale.linear()
                    .domain([0, d3.max(bardata)])
                    .range([0, height]);

            var xScale = d3.scale.ordinal()
                    .domain(d3.range(0, bardata.length))
                    .rangeBands([0, width], 0.2)

            var tooltip = d3.select('body').append('div')
                    .style('position', 'absolute')
                    .style('padding', '0 10px')
                    .style('background', 'white')
                    .style('opacity', 0)

            var myChart = d3.select('#chart').append('svg')
                .style('background', '#F8F8F8')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
                .selectAll('rect').data(bardata)
                .enter().append('rect')
                    .style('fill', function(d,i) {
                        return colors(i);
                    })
                    .attr('width', xScale.rangeBand())
                    .attr('x', function(d,i) {
                        return xScale(i);
                    })
                    .attr('height', 0)
                    .attr('y', height)

                .on('mouseover', function(d) {

                    tooltip.transition()
                        .style('opacity', .9)

                    tooltip.html("$ "+d)
                        .style('left', (d3.event.pageX - 35) + 'px')
                        .style('top',  (d3.event.pageY - 30) + 'px')


                    tempColor = this.style.fill;
                    d3.select(this)
                        .transition()
                        .style('opacity', .5)
                        .style('fill', 'gold')
                        .duration(100)
                })

                .on('mouseout', function(d) {
                    d3.select(this)
                        .transition()
                        .style('opacity', 1)
                        .style('fill', tempColor)
                        .duration(200)
                })

            myChart.transition()
                .attr('height', function(d) {
                    return yScale(d);
                })
                .attr('y', function(d) {
                    return height - yScale(d);
                })
                .delay(function(d, i) {
                    return i * 100;
                })
                .duration(1500)
                .ease('elastic')

            var vGuideScale = d3.scale.linear()
                .domain([0, d3.max(bardata)])
                .range([height, 0])

            var vAxis = d3.svg.axis()
                .scale(vGuideScale)
                .orient('left')
                .ticks(10)

            var vGuide = d3.select('svg').append('g')
                vAxis(vGuide)
                vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
                vGuide.selectAll('path')
                    .style({ fill: 'none', stroke: "#000"})
                vGuide.selectAll('line')
                    .style({ stroke: "#000"})

            var vLabel = d3.select('svg').append('g')
                    .attr("class", "y axis")
                    .call(vAxis)
                  .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 1)//fix the y pos of "price"
                    .attr("x",0 - (height / 2))
                    .attr("dy", "1.7em")
                    .style("text-anchor", "end")
                    .text("Price");

            var hAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')
                //put book names below
                /*.tickValues(xScale.domain().filter(function(d, i) {
                    return !(i % (bardata.length/5));
                }))*/

            var hGuide = d3.select('svg').append('g')
                hAxis(hGuide)
                hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
                hGuide.selectAll('path')
                    .style({ fill: 'none', stroke: "#000"})
                hGuide.selectAll('line')
                    .style({ stroke: "#000"})
    }
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
      price: 1.00,
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