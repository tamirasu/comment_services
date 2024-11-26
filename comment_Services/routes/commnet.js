router.delete('/:project/:id', authenticateToken, async (req, res) => {
    const { project, id } = req.params;

    try {
        const deletedComment = await Comment.findOneAndDelete({ project, _id: id });
        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found or does not belong to this project' });
        }

        res.status(200).json({ message: 'Comment deleted successfully', comment: deletedComment });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const authenticateToken = require('../middleware/auth');

// Route to create a comment
router.post('/', authenticateToken, async (req, res) => {
    const { author, project, title, text } = req.body;

    if (!author || !project || !title || !text) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newComment = new Comment({ author, project, title, text });
        await newComment.save();
        res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get all comments for a project
router.get('/:project', authenticateToken, async (req, res) => {
    const { project } = req.params;

    try {
        const comments = await Comment.find({ project });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get one comment by ID
router.get('/comment/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ error: 'Comment not found' });
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to delete a comment by project and ID
router.delete('/:project/:id', authenticateToken, async (req, res) => {
    const { project, id } = req.params;

    try {
        const deletedComment = await Comment.findOneAndDelete({ project, _id: id });
        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found or does not belong to this project' });
        }

        res.status(200).json({ message: 'Comment deleted successfully', comment: deletedComment });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
