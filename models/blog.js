const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    }
});
const BlogPost=mongoose.model("BlogPost", blogSchema);
module.exports = BlogPost;