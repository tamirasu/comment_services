const express = require('express');
const router = express.Router();

const { createComment, getCommentsByProject, getSingleComment } = require('../controllers/controllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, createComment);
router.get('/getall/:project', authMiddleware, getCommentsByProject);
router.get('/comment/:id', authMiddleware, getSingleComment);
module.exports = router;
