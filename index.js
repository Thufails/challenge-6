const express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    cors = require('cors'),
    router = require('./routes/index')

require('dotenv').config

app.use(express.json({ strict: false }))
app.use(cors())
app.use('/images', express.static('public/images'))
app.use('/api/v1', router)

app.get('*', (req, res) => {
    return res.status(404).json({
        error: 'End Point is not defined'
    })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})