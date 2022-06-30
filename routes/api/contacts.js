const express = require('express')

const { contacts: ctrl } = require("../../controllers")

const { ctrlWrapper } = require("../../helpers")

const { auth, validation, isValidId } = require('../../middlewares');

const { schemas } = require("../../models/contacts")

const router = express.Router()


router.get('/', auth, ctrlWrapper(ctrl.getAll))

router.get('/:contactId', auth, isValidId, ctrlWrapper(ctrl.getById))

router.post('/', auth, validation(schemas.CreateContact), ctrlWrapper(ctrl.add))

router.delete('/:contactId', auth, isValidId, ctrlWrapper(ctrl.removeById))

router.put('/:contactId', auth, isValidId, validation(schemas.CreateContact), ctrlWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', auth, isValidId, validation(schemas.updateFavoriete), ctrlWrapper(ctrl.updateFavorite));

module.exports = router