const express = require('express')

const { contacts: ctrl } = require("../../controllers")

const { ctrlWrapper } = require("../../helpers")

const { validation, isValidId } = require('../../middlewares');

const { schemas } = require("../../models/contacts")

const router = express.Router()


router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById))

router.post('/', validation(schemas.CreateContact), ctrlWrapper(ctrl.add))

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById))


router.put('/:contactId', isValidId, validation(schemas.CreateContact), ctrlWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', isValidId, validation(schemas.updateFavoriete), ctrlWrapper(ctrl.updateFavorite));

module.exports = router