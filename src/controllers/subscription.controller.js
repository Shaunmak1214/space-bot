const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { subscriptionService } = require('../services')

const subscribe = catchAsync(async(req, res) => {

    /* console.log(req.body) */
    const subscription = await subscriptionService.newSubscribe(req.body)
    res.send(subscription)

})

const findallSubscribers = catchAsync(async(req, res) => {

    const subscribers = await subscriptionService.findAllSubscribers()
    res.send(subscribers)

})

module.exports = {

    subscribe,
    findallSubscribers

}