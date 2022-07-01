const { User } = require("../../models/user");

const updateSubscription = async(req, res) => {
    const { subscription } = req.body;
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
    res.json(result);
}

module.exports = updateSubscription;