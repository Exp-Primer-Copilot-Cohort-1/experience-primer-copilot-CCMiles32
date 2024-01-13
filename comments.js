//create web server
const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             comment
//=================================

//save comment
router.post("/saveComment", (req, res) => {
  //save comment info into DB
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    //save to DB
    if (err) return res.json({ success: false, err });
    //if no error, save to DB
    Comment.find({ _id: comment._id }) //find the comment we saved
      .populate("writer") //populate the writer field
      .exec((err, result) => {
        //execute the query
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

//get comments
router.post("/getComments", (req, res) => {
  Comment.find({ postId: req.body.videoId }) //find the comment we saved
    .populate("writer") //populate the writer field
    .exec((err, comments) => {
      //execute the query
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, comments });
    });
});

module.exports = router;