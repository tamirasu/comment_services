const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: { type: String, required: true },
    project: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
