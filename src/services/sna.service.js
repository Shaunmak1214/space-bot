const httpStatus = require('http-status');
const { default: axios } = require('axios');

const snaNewsAll = async() => {

    const url = "https://www.spaceflightnewsapi.net/api/v2/articles"
    return allNews = await axios.get(url, {})

};

module.exports = {

    snaNewsAll

}