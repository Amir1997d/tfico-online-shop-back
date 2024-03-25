require("dotenv").config();
const passport = require('passport');
const session = require('express-session');
const passportSetup = require('./passport');
const authRoute = require('./routers/auth');

const cors = require("cors");
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const users = require('./routers/user');
const blades = require('./routers/comment');
const machines = require('./routers/group');
const productRatings = require('./routers/userReviewRate');
const orders = require('./routers/tag');
const reviews = require('./routers/review');

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
app.use('/api/reviews', reviews);
app.use('/api/blades', comments);
app.use('/api/machines', groups);
app.use('/api/orders', tags);
app.use('/api/ratings', userRatings);

app.listen(process.env.PORT, () => {
    console.log(`Express server is running on port 5000...`);
});