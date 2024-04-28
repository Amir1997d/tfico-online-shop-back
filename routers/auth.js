const router = require('express').Router();
const passport = require('passport');
const User = require('../models/userModel');
const express = require('express');
router.use(express.json());

const { login, signup, newToken, logout, addUserByGoogle } = require('../controllers/authController');

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

// router.get("/google/callback", passport.authenticate("google", {
//     failureRedirect: "/login/failed",
//     successRedirect: process.env.CLIENT_URL,
//   }), (req, res) => {
//     // Assuming the user object is available in req.user after authentication
//     const { accessToken, refreshToken, user } = req.user;
//     res.json({ accessToken, refreshToken, user });
// });
              


router.post('/signup', signup);
router.post('/login', login);
router.post('/token', newToken);
router.delete('/logout', logout);
router.post('/refresh', newToken);

module.exports = router;