
const express = require('express');
const connectDB = require('./db/connect');
const app = express();
const port = process.env.PORT || 3000;
const route = require('./routes/tasks');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/tasks',route);
app.use(notFound);
app.use(errorHandlerMiddleware);


const start =async()=>{
    try {
        await  connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`Server is listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}


start();
