const mongoose = require('mongoose'); // use mongoose instead of mongo db driver !!!!!
const {url} = require('../config');
const User = require('./user');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000// Keep trying to send operations for 5 seconds
};

//connect to DB
// MongoClient.connect(url, { useNewUrlParser: true , useUnifiedTopology: true} ,function(err, db) {
//     var cursor = db.db('RoastMe'
//     ).collection('_users').find();

//     cursor.each(function(err, doc) {

//         console.log(doc);
//     });
// });



//export db connection
async function connectDb (uri) { 
    console.log("connecting to db...");
    try { // try to establish connection
        const con = await mongoose.connect(uri,options) // return a Promise
        return con; // promise
    }
    catch(err){
        console.error(err);
        process.exit(1)
    }
}

//create pooling with async
async function pooling (){
    let database = await connectDb(url)
    return database
}


// export connect(), db() and close() from the module
//export the User schema
module.exports = {
    User: User,
    pooling : pooling
}
