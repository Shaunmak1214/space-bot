const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { snanewsService } = require('../services');

const snanews = catchAsync(async(req, res) => {

    const snaNews = await snanewsService.snaNewsAll();
    res.send(snaNews.data)

})

module.exports = {

    snanews

}