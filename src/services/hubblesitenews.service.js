const httpStatus = require('http-status');
const { default: axios } = require('axios');

const hubblesiteNewsAll = async() => {

    const url = "http://hubblesite.org/api/v3/news"
    return allNews = await axios.get(url, {})

};

const hubblesiteLatestNews = async() => {

    const url = "http://hubblesite.org/api/v3/news_release/last"
    return latestNews = await axios.get(url, {})

};

const hubblesiteNewsById = async(id) => {

    const url = `http://hubblesite.org/api/v3/news_release/${id}`
    return news = await axios.get(url, {})

}

module.exports = {

    hubblesiteNewsAll,
    hubblesiteNewsById,
    hubblesiteLatestNews

}