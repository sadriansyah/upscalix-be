require('dotenv').config();
const express = require("express");
//import database
const database = require("./database/connection.js");
const userRoute = require("./routes/userRoutes")

//scheduler
const scheduler = require('node-schedule');
const emailServices = require("./services/emailService.js");
const failedJobsService = require("./services/failedJobsService.js");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

scheduler.scheduleJob('*/15 * * * *', async()=>{
    emailServices.sendBirthDayMessages
    failedJobsService.retryFailedMessages
});

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to API Birthday"
    })
});


app.use("/user", userRoute)


app.listen( port, () => {
    console.log(`Server up running on port ${port}`);
})


