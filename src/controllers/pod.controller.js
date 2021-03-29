const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { podService } = require('../services');

const pod = catchAsync(async(req, res) => {

    var podArr = []
    const pod = await podService.pictureofday();
    podArr.push(pod.data)
    res.send(podArr)

})

module.exports = {

    pod

}