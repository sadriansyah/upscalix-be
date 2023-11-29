const { Sequelize, Op } = require('sequelize');
const axios = require('axios');
const schedule = require('node-schedule');
const moment = require('moment');
const User = require("../models/user.model")
const FailedJobs = require("../models/failedJobs.model")
const NodeCache = require('node-cache');

const appCache = new NodeCache();

exports.sendBirthDayMessages = async () => {
    try {
        const currentDate = moment().startOf('day');
        const users = await User.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn("MONTH", Sequelize.col('birthday')), currentDate.format('M')),
                    Sequelize.where(Sequelize.fn("DAY", Sequelize.col('birthday')), currentDate.format('D')),
                ]
            }
            
        });

        for(const user of users){
            const {id, firstName} = user;
            const message = `Hey, ${firstName}, it's your birthday`;
            const email = "test@digitalenvision.com.au";

            const userLocalTime = moment(currentDate)
                .tz(user.location)
                .hour(9)
                .minute(0)
                .second(0);

            const currentTime = moment();
            const timeDiff = userLocalTime.diff(currentTime);

            if(timeDiff > 0){
                schedule.scheduleJob(userLocalTime.toDate(), async() => {
                    try {
                        await axios.post('https://email-service.digitalenvision.com.au/send-email',{
                            email, message
                        });
                        console.log("later");
                        console.log(`Birthday message sent to ${firstName}`)
                    } catch (error) {
                        await FailedJobs.create({
                            userId: id,
                            message: `Failed to send birthday message to ${firstName}`
                        });
                        console.log("FAILEDE SCHEDULE");
                        console.log(`Failed to send birthday message to ${firstName}`);
                    }
                })
            }else{
                var birthdayKey = `birthdaykey-${id}`;
                var cache = appCache.get(birthdayKey);
                console.log(cache);
                if(!cache > 0){
                    try {
                        await axios.post('https://email-service.digitalenvision.com.au/send-email',{
                            email, message
                        });
                        console.log("SEND BY ME");
                        console.log(`Birthday message sent to ${firstName}`)
                        appCache.set(birthdayKey, id);
                    } catch (error) {
                        await FailedJobs.create({
                            userId: id,
                            message: `Failed to send birthday message to ${firstName}`
                        });
                        console.log("FAILED ON HERE");
                        console.log(`Failed to send birthday message to ${firstName}`);
                    }
                }
            }

        }

    } catch (error) {
        console.log(error);
    }
}
