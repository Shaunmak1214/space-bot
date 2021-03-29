const httpStatus = require('http-status');
const { Subscription } = require ('../models');

const newSubscribe = async(req) => {

    /* console.log(req) */

    const newSubscriber = new Subscription({

        discord_user_id: req.discord_user_id,
        subscription: true

    })

    console.log(newSubscriber)
    let saved = await newSubscriber.save();
    if(saved){
        return newSubscriber
    }else{
        return 'failed'
    }

}

module.exports = {

    newSubscribe

}