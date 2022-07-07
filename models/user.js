const Joi = require("joi");
const { Schema, model } = require("mongoose");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const category = ["starter", "pro", "business"]

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email is required'],
        match: emailRegexp,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    subscription: {
        type: String,
        enum: category,
        default: "starter"
    },
    token: {
        type: String,
        ddefault: "",
    },
    avatarURL: {
        type: String,
        required: true
    }
}, { versionKey: false, timestamps: true });

const registerUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().default("starter").valid(...category),
    token: Joi.string().default("")
});

const loginUser = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
});

const updateSubUser = Joi.object({
    subscription: Joi.string().valid(...category),
});

const schemas = {
    registerUser,
    loginUser,
    updateSubUser
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas
}