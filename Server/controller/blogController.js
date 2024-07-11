const BlogPost = require('../model/BlogPost');

exports.createBlog = async (req, res) => {
    const { title, content } = req.body;
    const author = req.user.id;
    try {
        const newBlog = new BlogPost({ title, content, author });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await BlogPost.find().populate('author', 'username');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const blog = await BlogPost.findById(id);
        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        await blog.save();
        res.json(blog);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await BlogPost.findById(id);
        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await blog.remove();
        res.json({ msg: 'Blog removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};