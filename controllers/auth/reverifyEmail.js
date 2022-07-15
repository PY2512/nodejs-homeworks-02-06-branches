const { createError, sendMail } = require('../../helpers');
const { User } = require('../../models/user');

const reverifyEmail = async(req, res) => {
    const { email } = req.body;
    if (!email) {
        throw createError(400, "Missing required field email")
    };
    const user = await User.findOne({ email });
    if (!user) {
        throw createError(401, "User not found");
    }
    const { verificationToken, verify } = user;
    if (verify) {
        throw createError(400, "Verification has already been passed");
    }
    const mail = {
        to: email,
        subject: 'Подтверждение email',
        html: `<a target="_blank" href='http://localhost:3000/users/verify/${verificationToken}'>Click to verify your email address</a>`,
    };
    await sendMail(mail);
    res.status(200).json("Verification successful");
}
module.exports = reverifyEmail