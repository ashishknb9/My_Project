const mongoose = require('mongoose');
const validator = require('validator');

const postSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true,
    },
    body:{
        type:String,
       required:true
    }
});
// we will  create a new collection
const posts = new mongoose.model('posts',postSchema);

module.exports = posts;