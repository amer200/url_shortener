const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
mongoose.connect('mongodb://localhost:27017/shortinerUrl');
app.use(express.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    ShortUrl.find()
        .then(urls => {
            res.render('index', {
                urls: urls
            })
        })
        .catch(err => {
            console.log(err)
        })
})
app.post('/shortUrl', (req, res) => {
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
})
app.get('/:shortUrl', async (req, res) => {
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
})
app.listen(process.env.PORT || 3000);