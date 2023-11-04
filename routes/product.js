const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/productControllers'),
    multer = require('../middlewares/multer'),
    multerLib = require('multer')();

router.post('/create', multer.image.single('image'), controller.createImage); //upload image ke database
router.post('/create-with-imagekit', multerLib.single('image'), controller.createWithImageKit);
router.post('/upload', multerLib.single('image'), controller.upload);
router.get('/images', controller.getImage)
router.get('/images/:id', controller.getImagebyId)
router.put('/images-edit/:id', controller.editImages)
router.delete('/images-delete/:id', controller.deleteImage)

module.exports = router