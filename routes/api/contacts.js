const express = require('express')

const router = express.Router()

const contactes = require("../../models/contacts")

const { createError } = require("../../helpers/index")

const {
    validationCreateContact,
    validationUpdateContact,
} = require("./validation")


router.get('/', async(req, res, next) => {
    try {
        const contacts = await contactes.listContacts();
        return res.status(200).json(contacts)
    } catch (error) {
        next(error)
    }
})

router.get('/:contactId', async(req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contactes.getContactById(contactId);
        if (!contact) {
            throw createError(404, `Contact with id: ${contactId} didn't find`)
        }
        res.status(200).json(contact)
    } catch (error) {
        next(error)
    }
})

router.post('/', validationCreateContact, async(req, res, next) => {
    try {
        const contact = await contactes.addContact(req.body);
        res.status(201).json(contact)
    } catch (error) {
        next(error)
    }
})

router.delete('/:contactId', async(req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contactes.removeContact(contactId)
        if (!contact) {
            throw createError(404, `Contact with id: ${contactId} didn't find`)
        }
        res.status(200).json(contact)
    } catch (error) {
        next(error)
    }
})

router.put('/:contactId', validationUpdateContact, async(req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contactes.updateContact(contactId, req.body);
        if (!contact) {
            throw createError(404, `Contact with id: ${contactId} didn't find`)
        }
        res.json(contact)
    } catch (error) {
        next(error)
    }
})

module.exports = router