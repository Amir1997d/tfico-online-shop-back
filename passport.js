const passport = require("passport");
const express = require('express');
passport.use(express.json());

const { addUserByGoogle, addUserByYandex } = require('./controllers/userController');


const GoogleStrategy = require("passport-google-oauth20").Strategy;
const YandexStrategy = require("passport-yandex").Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"]
        },
        async function(accessToken, refreshToken, profile, done) {
            await addUserByGoogle(profile);
            done(null, profile);
        }
    )
);

passport.use(
    new YandexStrategy(
        {
            clientID: process.env.YANDEX_CLIENT_ID,
            clientSecret: process.env.YANDEX_CLIENT_SECRET,
            callbackURL: "/auth/yandex/callback",
            scope: ["profile", "user:email"]
        },
        async function(accessToken, refreshToken, profile, done) {
            await addUserByYandex(profile);
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
