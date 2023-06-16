const express = require('express')
const categoryController = require('../controllers/categoryController')
const router = express.Router();

router.post('/create',categoryController.create)
router.get('/get-categories',categoryController.getAll)
module.exports = router