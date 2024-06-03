const router = require("express").Router();
const { User, Score } = require("../models");
const withAuthorization = require("../utils/auth");

router.get("/", async (req, res) => {
	const posts = await Post.findAll();
    res.render('home', { posts });
});


router.get("/login", (req, res) => {
	if (req.session.logged_in) {
		res.redirect("/dashboard");
		return;
	}

	res.render("login");
});

module.exports = router;
