const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/myblog').then(
    ()=> {
        console.log('connected');
    }
).catch(
    (err) => {
        console.log(err);
    }
)

module.exports = mongoose;