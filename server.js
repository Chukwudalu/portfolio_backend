const dotenv = require('dotenv')
dotenv.config({path: './config.env'});

const app = require('./app')


process.on('uncaughtException', err => {
    console.log(err.name, err.message)
    console.log('Uncaught exception... Shutting down')
    process.exit(1)
})

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('Unhandled Rejection... Shutting down')
    server.close(() =>{
        process.exit(1)
    })
})

process.on('SIGTERM', () => {
    console.log('SIGTERM RECIEVED. Shutting down now')
    server.close(() => {
        console.log('Process terminated');
    })
})

