const httpStatus = require('http-status');
const { Subscription } = require ('../models');

const newSubscribe = async(req) => {

    /* console.log(req) */

    let subscribed = Subscription.findOne({ _id }, {"discord_user_id" : req.discord_user_id})

    console.log(subscribed._id)

    if(subscribed._id != undefined){
        console.log('already sub')
        return 'Already Subscribed'
    }else{
        const newSubscriber = new Subscription({

            discord_user_id: req.discord_user_id,
            subscription: true
    
        })

        let saved = await newSubscriber.save();
        if(saved){
            return newSubscriber
        }else{
            return 'failed'
        }
    }

}

module.exports = {

    newSubscribe

}