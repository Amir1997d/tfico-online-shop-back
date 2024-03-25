const router = require('express').Router();
const passport = require('passport');
const User = require('../models/userModel');
const express = require('express');
router.use(express.json());

router.get("/login/success", (req, res) => {
    if(req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user
            // cookies: req.cookies
            // jwt: req.jwt
        });
    } else {
        res.status(403).json({
            error: true,
            message: "Not Authorized!"
        });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        success: false,
        message: "Log in failure"
    });
});

router.get("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.error(err);
        } else {
            res.redirect(process.env.CLIENT_URL);
        }
    });
});

//Google Callbacks
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
})); 

//Yandex Callbacks
router.get("/yandex", passport.authenticate("yandex", { scope: ["profile", "email"] }));

router.get("/yandex/callback", passport.authenticate("yandex", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
}));

module.exports = router;