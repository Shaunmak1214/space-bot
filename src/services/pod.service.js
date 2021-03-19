const httpStatus = require('http-status');
const { default: axios } = require('axios');

const pictureofday = async() => {

    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
    return pod = await axios.get(url, {});

}

module.exports = {

    pictureofday

}