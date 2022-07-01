const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { auth, validation } = require("../../middlewares");
const { schemas } = require("../../models/user");

// signup
router.post('/register', validation(schemas.registerUser), ctrlWrapper(ctrl.register));

// signin
router.post('/login', validation(schemas.loginUser), ctrlWrapper(ctrl.login));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

// signout
router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.patch('/update', auth, validation(schemas.updateSubUser), ctrlWrapper(ctrl.updateSubscription));


module.exports = router;