const router = require('express').Router();
const passport = require('passport');
const User = require('../models/userModel');
const express = require('express');
router.use(express.json());

const { login, signup, newToken, logout } = require('../controllers/authController');

router.get("/login/success", (req, res) => {
    if(req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            // user: req.user
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

router.delete("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.error(err);
        } else {
            logout(req.body);
            res.status(200).json({message: "user i slogged out!"});
        }
    });
});

//Google Callbacks
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to frontend with tokens
        const sendUser = req.user;
        const accessToken = req.user.accessToken;
        const refreshToken = req.user.refreshToken;
        const roll = sendUser.user.isAdmin;
        const name = sendUser.user.username;
        const id = sendUser.user.userId;

        res.redirect(`${process.env.CLIENT_URL}/login/?accessToken=${accessToken}&refreshToken=${refreshToken}&roll=${roll}&id=${id}&name=${name}`);
    }
);

router.post('/signup', signup);
router.post('/login', login);
router.post('/token', newToken);
router.post('/refresh', newToken);
// router.delete('/logout', logout);

module.exports = router;


// router.get("/google/callback", passport.authenticate("google", {
//     successRedirect: process.env.CLIENT_URL,
//     failureRedirect: "/login/failed"
// })); 