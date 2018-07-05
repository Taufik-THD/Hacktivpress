const express = require('express')
const router = express.Router()
const multer = require('multer');
const { sendUploadToGCS } = require('../middlewares/uploadGcs');
const { getArticle, addArticle, editArticle, deleteArticle } = require("../controllers/articles_controller")
const upload = multer({
 storage  : multer.memoryStorage(),
 limits   : {
   fileSize: 30*1024*1024
   }
})

// const { getUsers, signUp, signIn } = require("../controllers/user_controller");

router.get('/', getArticle)
router.post('/', upload.single('image'), sendUploadToGCS, addArticle)

router.put('/:id', (req, res) => {
  console.log('article');
})
router.delete('/:id', (req, res) => {
  console.log('article');
})

module.exports = router
