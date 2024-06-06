const mongoose = require('mongoose')

// const Stylist = mongoose.model('Stylist', {
//     username: {
//         type: String
//     },
//     email: {
//         type: String,
//         unique: true
//     },
//     password: {
//         type: String
//     },
//     bodyweight: {
//         type: Number
//     },
//     height: {
//         type: Number
//     }
// })

const User = mongoose.model('User', {
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})

// module.exports = Stylist
module.exports = User