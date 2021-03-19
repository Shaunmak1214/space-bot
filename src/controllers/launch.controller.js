const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { upcomingLaunchesService } = require('../services');

const upcomingLaunches = catchAsync(async(req, res) => {

    const upcomingLaunches = await upcomingLaunchesService.upcomingLaunches();
    res.send(upcomingLaunches.data[0])

})

module.exports = {

    upcomingLaunches

}