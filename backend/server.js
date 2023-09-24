const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');


//setting up config file
dotenv.config({path:'config/config.env'})


// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1);
})
// console.log(a);


//connnecting to database
connectDatabase()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)

})

//Handle Unhandled Promise
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})