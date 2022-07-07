const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp")
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async(req, res) => {
    try {
        const { _id: id } = req.user;
        const { filename } = req.file;
        const [extension] = filename.split(".").reverse();
        const name = `${id}.${extension}`;
        const newDir = path.join(avatarsDir, name);
        await fs.rename(req.file.path, newDir);
        Jimp.read(newDir)
            .then(ava => {
                return ava
                    .resize(250, 250)
                    .write(newDir)
            })
            .catch(err => {
                console.error(err);
            });
        // const file = await Jimp.read(tempPath);
        // await file.resize(250, Jimp.AUTO);
        // await file.writeAsync(tempPath);
        // await fs.rename(tempPath, newDir)
        const avatarURL = path.join("avatars", name)
        const result = await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });
        res.json({ avatarURL: result.avatarURL })
    } catch (error) {
        if (error.message("no such file")) {
            await fs.unlink(req.file.path);
        }
        throw error;
    }
}

module.exports = updateAvatar