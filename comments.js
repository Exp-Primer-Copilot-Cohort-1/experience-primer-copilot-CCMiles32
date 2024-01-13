// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import the comments.js
const comments = require('./comments.js');

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get comments by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    res.json(comment);
});

// Post comments
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        name: req.body.name,
        comment: req.body.comment
    };

    comments.push(comment);

    res.json(comment);
});

// Put comments
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));

    comment.name = req.body.name;
    comment.comment = req.body.comment;

    res.json(comment);
});

// Delete comments
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));

    const index = comments.indexOf(comment);
    comments.splice(index, 1);

    res.json(comment);
});

// Listen port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});