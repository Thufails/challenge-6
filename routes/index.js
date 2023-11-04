const express = require('express'),
    router = express.Router(),
    prodRouter = require('./product')

router.use('/product', prodRouter)

module.exports = router