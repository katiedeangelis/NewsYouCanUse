///////////////////////////////////////////////////////////////////////////////////////
//                             Dependencies & Variables                              //
///////////////////////////////////////////////////////////////////////////////////////
var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
var port = process.env.PORT || 8080;
// Import routes and give the server access to them.
var routes = require("./controller/site_router.js");
// Set Handlebars.
var exphbs = require("express-handlebars");
var app = express();


///////////////////////////////////////////////////////////////////////////////////////
//                               App & Database Config                               //
///////////////////////////////////////////////////////////////////////////////////////
mongoose.connect('mongodb://localhost/newsdb');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


///////////////////////////////////////////////////////////////////////////////////////
//                                       Routes                                      //
///////////////////////////////////////////////////////////////////////////////////////
app.use("/", routes);

app.listen(port, function() {
    console.log("listening on port", port);
  });
