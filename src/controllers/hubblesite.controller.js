const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { hubblenewsService } = require('../services');

const hubblenews = catchAsync(async(req, res) => {

    const hubblenews = await hubblenewsService.hubblesiteLatestNews();
    res.send(hubblenews.data)

})

module.exports = {

    hubblenews

}   