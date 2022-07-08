const express = require('express')
const logger = require('morgan')
const cors = require('cors')

require("dotenv").config()


const routes = require('./routes/api')


const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use('/api/auth', routes.auth)
app.use('/api/contacts', routes.contacts)


app.use((req, res) => {
    res.status(404).json({ status: "error", code: 404, message: "Not found" })
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ staus: "fail", code: status, message: err.message })
})

module.exports = app