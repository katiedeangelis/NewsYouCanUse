///////////////////////////////////////////////////////////////////////////////////////
//                             Dependencies & Variables                              //
///////////////////////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({  
    articleTitle: String,
    articleSummary: String,
    articleImage: String,
    articleLink: String
});

// This creates the model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;