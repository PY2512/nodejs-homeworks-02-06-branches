const { Contact } = require("../../models/contacts");

const { createError } = require("../../helpers");

const getById = async(req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId, "-createdAt -updatedAt")
    if (!result) {
        throw createError(404);
    }
    res.json(result);
}


module.exports = getById;