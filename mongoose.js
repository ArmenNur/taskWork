const mongoose = require('mongoose')


const option = require('./keys')

mongoose
    .connect(`${option.dbUrl}/${option.db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .catch(err => {
        console.log(err)
        throw ('mongo connect faild')
    });

console.log('db connected')
module.exports = mongoose;