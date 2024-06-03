const router = require("express").Router();
const { User, Score } = require("../models");
const withAuthorization = require("../utils/auth");

router.get("/", async (req, res) => {
	try {
		res.render("home", {
			logged_in: req.session.logged_in,
		});
	} catch (error) {
		res.status(500).json(error);
	}
});


router.get("/login", (req, res) => {
	if (req.session.logged_in) {
		res.redirect("/dashboard");
		return;
	}

	res.render("login");
});

module.exports = router;
