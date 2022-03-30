const Post = require('../models/post')

module.exports = {
    index,
    show,
    new: newPost, 
    create,
    edit,
    update

};

function index(req, res) {
    Post.find({}, function(err, posts) {
        res.render('posts/index', { posts });
    });
}

function show(req, res) {
    Post.findById(req.params.id, function(err, post) {
        res.render('posts/show', { post });
    });
}

function newPost(req, res) {
    res.render('posts/new');
}

// function create(req, res) {
//     const post = new Post(req.body);
//     post.save(function(err) {
//         if (err) return res.render('posts/new');
//         console.log(post);
//         res.redirect('/posts');
//     })
// }

function create(req, res) {
    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
  
    const post = new Post(req.body);
    post.save(function(err) {
    if (err) return res.render('posts/new');
    console.log(post);
    res.redirect('/posts');
    });
  }

function edit(req, res) {
    res.render('posts/edit', {
        post: Post.getOne(req.params.id)
    })
}

function update(req, res) {
    Post.update(req.params.id, req.body);
    res.redirect('/posts')
}