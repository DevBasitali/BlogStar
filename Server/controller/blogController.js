const BlogPost = require("../model/BlogPost");

exports.CreateBlog = async (req, res) => {
  const { title, content } = res.body;
  const author = req.users.id;

  try {
    const newBlog = Blog({ title, content, author });
    await newBlog.save();
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const Blogs = BlogPost.find().populate("author", "username");
    res.json(Blogs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
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
