const router = require('express').Router()

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: "something went wrong within the Resources router",
        errorMessage: err.message,
        stack: err.stack
    })
})

module.exports = router