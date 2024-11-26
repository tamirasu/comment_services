const Comment = require('../models/models');

exports.createComment = async (req, res) => {
    const { author, project, title, text } = req.body;
  
    if (!author || !project || !title || !text) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const comment = new Comment({ author, project, title, text });
      await comment.save();
      res.status(201).json({ message: 'Comment created', comment });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  exports.getCommentsByProject = async (req, res) => {
    const { project } = req.params;
  
    try {
      const comments = await Comment.find({ project });
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  exports.getSingleComment = async (req, res) => {
    const { id } = req.params;
  
    try {
      const comment = await Comment.findById(id);
      if (!comment) return res.status(404).json({ message: 'Comment not found' });
  
      res.status(200).json({ comment });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };