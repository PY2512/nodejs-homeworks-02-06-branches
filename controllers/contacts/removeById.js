const { Contact } = require("../../models/contacts");

const { createError } = require("../../helpers/");

const removeById = async(req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
        throw createError(404)
    }
    res.status(200).json({ "message": "contact deleted" })
}

module.exports = removeById;