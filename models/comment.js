const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const commentSchema = new Schema({
    title: String,
})

module.exports = mongoose.model('Comment', commentSchema);