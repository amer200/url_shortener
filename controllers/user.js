const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getSignUp = (req, res) => {
    res.render('main/sign-up');
}
exports.postSignUp = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
            email: email
        })
        .then(u => {
            if (u) {
                return res.send('err this email is used !')
            } else {
                if (password.lingth < 6) {
                    return res.send('password must be more than 6 charchter')
                } else {
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hash = bcrypt.hashSync(password, salt);
                    const user = new User({
                        name: name,
                        email: email,
                        password: hash
                    })
                    user.save();
                    res.redirect('/')
                }
            }
        })
}
exports.getLogin = (req, res) => {
    res.render('main/login')
}
exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
            email: email
        })
        .then(u => {
            if (!u) {
                return res.send('no user with this email')
            } else {
                const isPassword = bcrypt.compareSync(password, u.password)
                if (isPassword) {
                    req.session.user = u._id;
                    console.log(req.session.user)
                    res.redirect('/')
                } else(
                    res.send('wrong password')
                )

            }
        })
}