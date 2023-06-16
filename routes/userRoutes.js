const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router();

router.put('/update/:id',userController.updateById)
router.delete('/delete/:id',userController.deleteById)
router.get('/get-user/:id',userController.getById)
module.exports = router