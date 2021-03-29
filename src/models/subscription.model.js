let mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set('useCreateIndex', true);

let subscriptionSchema = new mongoose.Schema({

    discord_user_id: String,
    subscription: Boolean

})

const Subscription = mongoose.model('subscription', subscriptionSchema)

module.exports = Subscription