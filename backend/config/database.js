const mongoose = require('mongoose');

exports.connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log(`Database is connected at ${process.env.MONGO_URI}`)})
    .catch((error)=>{console.log(error)})
}