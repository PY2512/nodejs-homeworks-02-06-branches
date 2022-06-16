const Joi = require("joi");

const schemaCreateContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
        }).required(),

    phone: Joi.string().pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
        .min(10)
        .max(14)
        .required(),
});

const schemaUpdateContact = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        })
        .optional(),

    phone: Joi.string()
        .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
        .min(10)
        .max(14)
        .optional(),
}).or("name", "email", "phone");

const validate = async(schema, obj, next) => {
    try {
        await schema.validateAsync(obj);
        next();
    } catch (err) {
        next({
            status: 400,
            message: err.message.replace(/"/g, ""),
        });
    }
};

module.exports = {
    validationCreateContact: (req, res, next) => {
        return validate(schemaCreateContact, req.body, next);
    },
    validationUpdateContact: (req, res, next) => {
        return validate(schemaUpdateContact, req.body, next);
    }
}