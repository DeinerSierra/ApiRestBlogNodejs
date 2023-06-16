const express = require('express')
const postController = require('../controllers/postController')
const router = express.Router();

router.post('/create-post',postController.create)
router.post('/get-post/:id',postController.getById)
router.post('/get-posts',postController.getAll)
router.put('/update/:id',postController.updateById)
router.delete('/delete/:id',postController.deleteById)
module.exports = router