require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
mongoose.connect(process.env.DB_URL);
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session({
    secret: process.env.SESSINO_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true
    }
}))
// routes
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');
app.use('/', mainRoutes);
app.use('/user', userRoutes);

app.listen(process.env.PORT || 3000);