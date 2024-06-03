const User = require("./User");
const Post = require('./Post');
const Comment = require('./Comment');

User.hasOne(Score, {
  foreignKey: "user_id",
});

Score.belongsTo(User, {
	foreignKey: "user_id",
});

module.exports = { User, Post, Comment };