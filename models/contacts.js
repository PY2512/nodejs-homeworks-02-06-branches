const { Schema, model, SchemaTypes } = require("mongoose")
const Joi = require("joi");

const group = ['work', 'friend', 'family', 'other']

const CreateContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
        }).required(),

    phone: Joi.string().pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
        .min(10)
        .max(14)
        .required(),

    favorite: Joi.boolean().required(),

    group: Joi.string().required().valid(...group)
});

const updateFavoriete = Joi.object({ favorite: Joi.boolean().required() })

const schemas = {
    CreateContact,
    updateFavoriete
}

const contactSchema = Schema({
    name: { type: String, required: true, uniqu: true },
    email: { type: String, required: true },
    phone: { type: String, required: true, uniqu: true },
    group: { type: String, enum: group, required: true },
    favorite: { type: Boolean, default: false },
    owner: { type: SchemaTypes.ObjectId, ref: "user" }
}, { versionKey: false, timestamps: true });

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas
};