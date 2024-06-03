const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');

router.get('/dashboard', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login');
    }
    const user = await User.findByPk(req.session.userId, {
        include: [Post]
    });
    res.render('dashboard', { user, posts: user.Posts });
});

router.post('/', async (req, res) => {
    if (!req.session.userId) return res.sendStatus(401);
    const { title, content } = req.body;
    const user = await User.findByPk(req.session.userId);
    const post = await Post.create({ title, content, username: user.username, userId: user.id });
    res.redirect('/posts/dashboard');
});

router.post('/delete/:id', async (req, res) => {
    if (!req.session.userId) return res.sendStatus(401);
    const postId = req.params.id;
    await Post.destroy({ where: { id: postId, userId: req.session.userId } });
    res.redirect('/posts/dashboard');
});

router.post('/edit/:id', async (req, res) => {
    if (!req.session.userId) return res.sendStatus(401);
    const postId = req.params.id;
    const { title, content } = req.body;
    await Post.update({ title, content }, { where: { id: postId, userId: req.session.userId } });
    res.redirect('/posts/dashboard');
});

module.exports = router;