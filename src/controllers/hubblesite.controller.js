const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { hubblenewsService } = require('../services');

const hubblenews = catchAsync(async(req, res) => {

    var newData = [];
    const hubblenews = await hubblenewsService.hubblesiteNewsAll();
    var unstructured = hubblenews.data;

    for (var key in unstructured) {
        if (unstructured.hasOwnProperty(key)) {
            console.log(key + " -> " + unstructured[key].news_id);
            const dataById = await hubblenewsService.hubblesiteNewsById(unstructured[key].news_id);
            var newObj = {
                'news_id' : dataById.data.news_id,
                'name': dataById.data.name,
                'url': dataById.data.url,
                'publication': dataById.data.publication,
                'abstract': dataById.data.abstract,
                'thumbnail': dataById.data.thumbnail,
            }
            newData.push( newObj )

        }
    }
    res.send(newData)
})

const hubblenewsLatest = catchAsync(async(req, res) => {

    const hubblenewsLatest = await hubblenewsService.hubblesiteLatestNews();
    res.send(hubblenewsLatest.data)

})

module.exports = {

    hubblenews,
    hubblenewsLatest

}   