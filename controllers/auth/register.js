const bcrypt = require("bcryptjs");
const { createError, sendMail } = require("../../helpers");
const { User } = require("../../models/user");
const { nanoid } = require("nanoid")
const gravatar = require("gravatar")

const register = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, "Email is use")
    }
    const verificationToken = nanoid();
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const result = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
        verificationToken
    });
    const mail = {
        to: email,
        subject: 'Подтверждение email',
        html: `<p>Thanks for signing up with App! You must follow this link of registration to activate your account:</p></br><a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Veryfi email</a>`
    };
    await sendMail(mail);
    res.status(201).json({ "user": { "email": result.email, "subscription": result.subscription } });
}

module.exports = register