const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, "contacts.json");

const updateAllContact = async(data) => {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

const listContacts = async() => {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    if (!contact) {
        return null;
    }
    return contact;
}

const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateAllContact(contacts);
    return result;
}

const addContact = async(body) => {
    const allContacts = await listContacts();
    const newContact = { id: nanoid(), ...body };
    allContacts.push(newContact);
    await updateAllContact(allContacts);
    if (!newContact) { return null };
    return newContact;
}

const updateContact = async(contactId, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    contacts[index] = { id: contactId, ...body };
    await updateAllContact(contacts);
    return contacts[index];
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}