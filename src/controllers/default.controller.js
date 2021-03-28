const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const checkAwake = catchAsync(async(req, res) => {

    res.send('Alive')

})

module.exports = {

    checkAwake

}