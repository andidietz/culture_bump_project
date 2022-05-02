const express = require('express')
const cors = require('cors')
const ExpressError = require('./expressError')

// const directoryRoutes = require('./routes/directory')
// const eightStepsRoutes = require('./routes/eightSteps')
const referencPointsRoutes = require('./routes/referencePoints')
const userRoutes = require('./routes/user')

const app = express()
app.use(cors())
app.use(express.json())


app.use('/directory', referencPointsRoutes)
app.use('/eight-steps', referencPointsRoutes)
app.use('/users', userRoutes)

app.get('/', function(req, res) {
    res.send({
        company: 'Culture'
    })
})

app.use(function(req, res, next) {
    const notFoundError = new ExpressError('Not Found', 404)
    return next(notFoundError)
})

app.use(function(err, req, res, next) {
    let status = err.status || 500
    let message = err.message

    return res.status(status).json({
        error: {message, status}
    })
})

module.exports = app