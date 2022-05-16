const ShortUrl = require('../models/shortUrl');
exports.getMainPage = (req, res) => {
    ShortUrl.find()
        .then(urls => {
            res.render('main/index', {
                urls: urls
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.shrinkUrl = (req, res) => {
    const full = req.body.fullUrl;
    const url = new ShortUrl({
        full: full
    })
    url.save()
        .then(resu => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
}
exports.redirectToUrl = async (req, res) => {
    const shortUrl = await ShortUrl.findOne({
        short: req.params.shortUrl
    });
    if (!shortUrl) {
        res.sendStatus(404);
    } else {
        shortUrl.clicks++
        shortUrl.save()
        res.redirect(shortUrl.full)
    }
}