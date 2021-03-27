const httpStatus = require('http-status');
const { default: axios } = require('axios');

const upcomingLaunch = async() =>{

    const url = "https://ll.thespacedevs.com/2.0.0/launch/upcoming";
    return upcoming = await axios.get(url, {})

};

module.exports = {

    upcomingLaunch

}