const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { subscriptionService } = require('../services')

const subscribe = catchAsync(async(req, res) => {

    /* console.log(req.body) */
    const subscription = await subscriptionService.newSubscribe(req.body)
    res.send(subscription)

})

module.exports = {

    subscribe

}