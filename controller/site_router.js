///////////////////////////////////////////////////////////////////////////////////////
//                             Dependencies & Variables                              //
///////////////////////////////////////////////////////////////////////////////////////
// Require express so we can make an express application
var express = require("express");
// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

var router = express.Router();

// Require all models
var db = require("../models");


function getNewsArticles(req, res) {

    request("http://www.aljazeera.com/news/", function (error, response, html) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);

        // An empty array to save the data that is scraped
        var results = [];

        // With cheerio, find each "row.topics-sec-item" class
        // (i: iterator. element: the current element)
        $(".row.topics-sec-item").each(function (i, element) {

            // Find the text of the heading in the element and save it to the title variable.
            var articleTitle = $(element).find(".topics-sec-item-head").text();

            // Find the text of the heading in the element and save it to the title variable.
            var articleSummary = $(element).find(".topics-sec-item-p").text();

            // Find the text of the heading in the element and save it to the title variable.
            var articleImage = $(element).find(".img-responsive.lazy").data('src');

            // Find the text of the heading in the element and save it to the title variable.
            var articleLink = $(element).find("div>a").attr("href");

            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                articleTitle: articleTitle,
                articleSummary: articleSummary,
                articleImage: `http://www.aljazeera.com${articleImage}`,
                articleLink: `http://www.aljazeera.com${articleLink}`
            });
        });

        // Take the response and render it back to the client
        res.render("index", {
            article: results
        });
    });
}

router.get("/", function (req, res) {
    getNewsArticles(req, res);
});

// Route for saving an Article
router.post("/savearticle", function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Article.create(req.body).catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
    });
});

module.exports = router;