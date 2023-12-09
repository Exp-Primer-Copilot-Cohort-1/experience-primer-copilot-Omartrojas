// Create web server
// 1. Load the 'express' module
var express = require('express');
// 2. Create an object of the express module
var app = express();
// 3. Load the 'body-parser' module
var bodyParser = require('body-parser');
// 4. Configure the 'body-parser' module to read JSON
app.use(bodyParser.json());
// 5. Configure the 'body-parser' module to read URL encoded data
app.use(bodyParser.urlencoded({extended: false}));
// 6. Load the 'mongoose' module
var mongoose = require('mongoose');
// 7. Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost/mean');
// 8. Create a schema for 'Comment' objects
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
// 9. Create a model for 'Comment' objects
var Comment = mongoose.model('Comment', commentSchema);
// 10. Create a GET route to retrieve all comments
app.get('/comments', function(req, res) {
    Comment.find({}, function(err, comments) {
        if (err) throw err;
        res.json(comments);
    });
});
// 11. Create a POST route to create new comments
app.post('/comments', function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) throw err;
        res.json({'status': 'Successfully created comment'});
    });
});
// 12. Create a DELETE route to delete comments
app.delete('/comments', function(req, res) {
    Comment.remove({}, function(err) {
        if (err) throw err;
        res.json({'status': 'Successfully deleted all comments'});
    });
});
// 13. Create a GET route to retrieve a single comment
app.get('/comments/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) throw err;
        res.json(comment);
    });
});
// 14. Create a PUT route to update a single comment
app.put('/comments/:id', function(req, res) {
    Comment.findByIdAndUpdate(req.params.id, req.body, function(err, comment) {
        if (err) throw err;
        res.json({'status': 'Successfully updated comment'});
    });
});
// 15. Create a DELETE route to delete a single comment
app.delete