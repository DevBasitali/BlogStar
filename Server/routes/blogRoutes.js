const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const auth = require('../middleware/auth');

router.post('/', auth, blogController.createBlog);
router.get('/', blogController.getBlogs);
router.put('/:id', auth, blogController.updateBlog);
router.delete('/:id', auth, blogController.deleteBlog);

module.exports = router;
