const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/items', itemController.getAllItems);
router.post('/items', itemController.addItem);
router.put('/items/:id', itemController.updateItem);
router.patch('/items/:id', itemController.patchItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;
