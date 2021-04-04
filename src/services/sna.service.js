const httpStatus = require('http-status');
const { default: axios } = require('axios');

const snaNewsAll = async() => {

    const url = "https://www.spaceflightnewsapi.net/api/v2/articles"
    return allNews = await axios.get(url, {})

};

const snaNewsCounted = async(start, limit) => {

    const url = `https://www.spaceflightnewsapi.net/api/v2/articles?_start=${start}&_limit=${limit}`
    return await axios.get(url, {})

}

module.exports = {

    snaNewsAll,
    snaNewsCounted

}