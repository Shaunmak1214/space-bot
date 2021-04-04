const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { snanewsService } = require('../services');

const snanews = catchAsync(async(req, res) => {
    
    const snaNews = await snanewsService.snaNewsAll();
    res.send(snaNews.data)

})

const snanewsStartAndLimit = catchAsync(async(req, res) => {

    const snanewsCounted = await snanewsService.snaNewsCounted(req.params.start, req.params.limit);
    res.send(snanewsCounted.data)

})

module.exports = {

    snanews,
    snanewsStartAndLimit

}