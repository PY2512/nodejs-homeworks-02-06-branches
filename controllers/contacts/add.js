const { Contact } = require("../../models/contacts");

const add = async(req, res) => {
    const { _id: owner } = req.user;
    const newContact = await Contact.create({...req.body, owner });
    // const newContact = await Contact.create(req.body);

    res.status(201).json(newContact)
}

module.exports = add;