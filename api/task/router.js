// build your `/api/tasks` router here
const router = require('express').Router()

router.use('*', (req, res) => {
    res.json({ api: "up" })
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: "something went wrong within the Tasks router",
        errorMessage: err.message,
        stack: err.stack
    })
})

module.exports = router