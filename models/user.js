const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    rolle: {
        type: String,
        default: 'basic'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    urls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShortUrl' }]
})
module.exports = mongoose.model('User', userSchema);