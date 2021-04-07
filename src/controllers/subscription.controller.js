const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { subscriptionService } = require('../services')

const subscribe = catchAsync(async(req, res) => {
    const subscription = await subscriptionService.newSubscribe(req.body)
    res.send(subscription)
})

const unSubscribe = catchAsync(async(req, res) => {
    const unSubscription = await subscriptionService.deleteSubscriber(req.body)
    res.send(unSubscription)
})

const findallSubscribers = catchAsync(async(req, res) => {
    const subscribers = await subscriptionService.findAllSubscribers()
    res.send(subscribers)
})

module.exports = {

    subscribe,
    findallSubscribers,
    unSubscribe

}