const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    url: process.env.DB_connection,
    port : process.env.port,
    token : process.env.TOKEN_SECRET
    // masterKey: process.env.API_KEY,
    // port: process.env.PORT
};