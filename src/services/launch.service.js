const httpStatus = require('http-status');
const { default: axios } = require('axios');

const upcomingLaunches = async() => {

    const url = "https://api.spacexdata.com/v3/launches/upcoming"
    let upcoming = await axios.get(url, {});

    return upcoming;

}

module.exports = {

    upcomingLaunches

};