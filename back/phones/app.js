const express = require('express');
const router = express.Router();
const controller = require('./controller');

const phones = require('./phones.json');
controller.setup(phones);

router.get('/', controller.get);

router.get('/:id', controller.getById);

router.delete('/:id', controller.delete);

router.post('/', controller.post);

router.put('/:id', controller.put);

router.patch('/:id', controller.patch);
module.exports = router;
