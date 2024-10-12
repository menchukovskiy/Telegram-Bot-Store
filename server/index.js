require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');

const multer = require('multer')
const upload = multer()
const formData = require("express-form-data")

const PORT = process.env.PORT || 3300

const app = express()
app.use( cors() )
// for parsing application/json
app.use( express.json() )

//for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// for parsing multipart/form-data
//app.use(upload.array()); 

app.use(formData.union())

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.use('/api', router)


//Обработка ошибок
app.use(errorHandler)


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen( PORT, () => console.log( 'Server running on port' + PORT ) )
    } catch (e){
        console.log(e)
    }
}
 

start()
