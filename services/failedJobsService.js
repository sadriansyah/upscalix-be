const { Sequelize, Op} = require('sequelize')
const axios = require('axios')
const moment = require('moment');
const User = require("../models/user.model")
const FailedJobs = require("../models/failedJobs.model")
const NodeCache = require("node-cache");

const appCache = new NodeCache();

exports.retryFailedMessages = async() => {
    try {
        const fails = await FailedJobs.findAll();

        for(const fail of fails){
            const {userId} = fail;
            const user = User.findOne({
                where : {
                    id: userId
                }
            })
            const {id, firstName} = user;
            const message = `Hey, ${firstName}, it's your birthday`;
            const email = "test@digitalenvision.com.au";
            var birthdayKey = `failedBirthday-${id}`;
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
                        await FailedJobs.destroy({
                            where:{
                                id:fail.id
                            }
                        });

                    } catch (error) {
                       
                        console.log("FAILED ON HERE");
                        console.log(`Failed to send birthday message to ${firstName}`);
                    }
                }
        }

    } catch (error) {
        console.log('error');
    }
}