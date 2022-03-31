const Post = require('../models/post')

module.exports = {
    index,
    show,
    new: newPost, 
    create,
    edit,
    update

};

function create(req, res) {
    // Add the user-centric info to req.body
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

function newPost(req, res) {
    res.render('posts/new');
}

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

async function edit(req, res) {
    const post = await Post.findById(req.params.id)
    res.render('posts/edit', {
        post: post
    })
}

function update(req, res) {
    Post.findOneAndUpdate({_id: req.params.id}, req.body, function(err, post) {
        if (err) return res.redirect('/posts')
        res.redirect('/posts');

    });
}






