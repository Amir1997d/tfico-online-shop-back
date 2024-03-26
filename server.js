require("dotenv").config();
const passport = require('passport');
const session = require('express-session');
const passportSetup = require('./passport');
const authRoute = require('./routers/auth');

const users = require('./routers/user');
const blades = require('./routers/blade');
const machines = require('./routers/machine');
const orders = require('./routers/order');
const reviews = require('./routers/review');
// const productRatings = require('./routers/productRating');

const cors = require("cors");
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(
    session({
        secret: 'cyberwolv',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use('/auth', authRoute);
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/users', users);
app.use('/api/blades', blades);
app.use('/api/machines', machines);
app.use('/api/orders', orders);
app.use('/api/reviews', reviews);
// app.use('/api/ratings', productRatings);

app.listen(process.env.PORT, () => {
    console.log(`Express server is running on port 5000...`);
});