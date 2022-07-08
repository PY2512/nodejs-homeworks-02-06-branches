const bcrypt = require("bcryptjs");
const { createError } = require("../../helpers");
const { User } = require("../../models/user");
const gravatar = require("gravatar")

const register = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, "Email is use")
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const result = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL
    });
    res.status(201).json({ "user": { "email": result.email, "subscription": result.subscription } });
}

module.exports = register