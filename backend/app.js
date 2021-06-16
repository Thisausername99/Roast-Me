const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const cors = require('cors')
// const bodyParser = require('body-parser');
const {port} = require('./config'); // import connection string from config
const client = require('./model');


// const cookieParser = require('cookie-parser');
//Middleware
app.use(express.json());
app.use(cors());

//for sign up and login
app.use('/api/auth', userRoutes);




app.get('/', (req,res) => {
    res.send('We are on home');
});


// connect to db
client.pooling().then(async () => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
    }).catch(err => {
    console.error('Failed to make all database connections!')
    console.error(err)
    process.exit(1)
})