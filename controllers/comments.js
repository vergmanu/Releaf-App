var Post = require('../models/post');

module.exports = {
  create,
  delete: deleteComment,
};

function create(req, res) {
  Post.findById(req.params.id, function(err, post) {
    post.comments.push(req.body);
    post.save(function(err) {
      res.redirect(`/posts/${post._id}`);
    });
  });
}

// function deleteComment(req, res) {
//   Post.comments.findByIdAndDelete(req.params.id, function(err, post) {
//     //post.comments.deleteOne(req.body);
//       res.redirect(`/posts/${post._id}`);
//   });
// }

// function deleteComment(req, res, next) {
//   Post.findOne({'comment._id': req.params.id})
//     .then(function(post) {
//     // Find the review subdoc using the id method on Mongoose arrays
//     const comment = post.comments.id(req.params.id);
//     // Ensure that the review was created by the logged in user
//     if (!comment.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`);
//     // Remove the review using the remove method of the subdoc
//     comment.remove()
//     // Save the updated movie
//     post.save().then(function() {
//       // Redirect back to the movie's show view
//       res.redirect(`/posts/${post._id}`);
//     }).catch(function(err) {
//       // Let Express display an error
//       return next(err);
//       // res.redirect(`/movies/${movie._id}`);
//     });
//   });
// }

function deleteComment(req, res, next) {
  Post.findOne({'comments._id': req.params.id })
      .then(function(post) {
          const comment = post.comments.id(req.params.id)
          if(!comment.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`)
          comment.remove()
          post.save().then(function() {
              res.redirect(`/posts/${post._id}`)
          }).catch(function(err) {
              return next(err)
          })
  })
}