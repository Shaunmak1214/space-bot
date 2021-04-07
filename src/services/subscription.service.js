const httpStatus = require('http-status');
const { Subscription } = require ('../models');

const newSubscribe = async(req) => {
    let subscribed = await Subscription.find({discord_user_id : req.discord_user_id})

    if(subscribed.length === 0){
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
    }else{
        return "1"
    }
}

const deleteSubscriber = async(req) => {
    Subscription.findOneAndDelete({discord_user_id : req.discord_user_id}, function(err, res){
        if(err){
            console.log(err)
        }else{
            console.log('Deleted User :', docs);
        }
    })
}

const findAllSubscribers = async() => {
    let subscriber = await Subscription.find()
    if(subscriber.length === 0){
        return 'Nothing Found'
    }else{
        return (subscriber)
    }
}

module.exports = {

    newSubscribe,
    findAllSubscribers,
    deleteSubscriber

}