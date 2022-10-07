const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();



const corsConfig = {
    origin: true,
    credentials: true,
};
app.set("trust proxy", 1)
app.use(cors(corsConfig))
app.options('*', cors(corsConfig));

app.use(express.json())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
} 

const mailRouter = require('./mailRoute')
app.use('/contact', mailRouter)

module.exports = app