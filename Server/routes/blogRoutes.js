const express = require ('express')
const router = express.Router()
const BlogController = require ('../controller/blogController')
const auth = require ('../middleware/auth')

router.post('/', auth, BlogController.CreateBlog);
// router.get('/', BlogController.getBlogs);
// router.put('/:id', auth, BlogController.updateBlog);
// router.delete('/:id', auth, BlogController.deleteBlog);

module.exports = router;