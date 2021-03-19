const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { podService } = require('../services');

const pod = catchAsync(async(req, res) => {

    const pod = await podService.pictureofday();
    res.send(pod.data)

})

module.exports = {

    pod

}