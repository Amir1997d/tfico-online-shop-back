const { User } = require('../models/userModel');
const { RefreshToken } = require('../models/refreshTokenModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Op } = require('sequelize');

let refreshTokens = [];

User.findOrCreateByGoogleId = async function (googleId, userData) {
    const hashedPassword = await bcrypt.hash("default_pas_swo_rdan_dsec_ret", 10);
    const [user, created] = await this.findOrCreate({
        where: { email: userData.email },
        defaults: {
            googleId,
            username: userData.name.familyName + "_" + Math.floor(100000 + Math.random() * 900000),
            email: userData.email,
            password: hashedPassword,
            firstName:  userData.name.givenName,
            lastName: userData.name.familyName
        }
    });
    if (!created) {
        await this.update({ googleId }, {
            where: {
                email: userData.email
            }
        });
    }
    return { user, created };
};

const addUserByGoogle = async (profile) => {
    try {
        const googleId = profile.id;
        const userData = {
            name: profile.name,
            email: profile.emails[0].value,
        };
        const {user} = await User.findOrCreateByGoogleId(googleId, userData);

        const accessToken = jwt.sign({ userId: user.id, username: user.username, isAdmin: user.isAdmin }, 
            process.env.JSON_ACCESS_TOKEN_SECRET_KEY, 
            { expiresIn: '30m' });
    
        const refreshToken = jwt.sign({ userId: user.id, username: user.username, isAdmin: user.isAdmin }, 
            process.env.JSON_REFRESH_TOKEN_SECRET_KEY);

        // if (created) {
        //     console.log('New user created:', user);
        // } else {
        //     console.log('User is updated:', user);
        // }

        await RefreshToken.create({
            refreshToken: refreshToken,
            userId: user.id
        });

        const userResponse = {
            userId: user.id,
            username: user.username,
            isAdmin: user.isAdmin
        };

        return { accessToken, refreshToken, user: userResponse };
    } catch (error) {
        console.error('Error creating user:', error);
    }  
}

const signup = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existedUser = await User.findOne({
            where: {
                [Op.or]: [{username: username}, {email: email}]
            }
        });

        if(existedUser) {
            res.status(409).json({ message: 'User Already Exists!'});
            console.log(existedUser);
        }
        else {
            const newUser = await User.create({
                username,
                password: hashedPassword,
                email
            });
        
            const accessToken = jwt.sign({ userId: newUser.id, username: newUser.username, isAdmin: newUser.isAdmin }, 
                process.env.JSON_ACCESS_TOKEN_SECRET_KEY, 
                { expiresIn: '30m' });
        
            const refreshToken = jwt.sign({ userId: newUser.id, username: newUser.username, isAdmin: newUser.isAdmin }, 
                process.env.JSON_REFRESH_TOKEN_SECRET_KEY);
            
            await RefreshToken.create({
                refreshToken: refreshToken,
                userId: newUser.id
            });

            const userResponse = {
                userId: newUser.id,
                username: newUser.username,
                isAdmin: newUser.isAdmin
            };
    
            res.status(201).json({ accessToken, refreshToken, user: userResponse, message: 'User created successfully' });
        }
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
  
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username }});
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid Username!' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Password!' });
        }

        const accessToken = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, 
            process.env.JSON_ACCESS_TOKEN_SECRET_KEY, 
            { expiresIn: '30m' });

        const refreshToken = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, 
            process.env.JSON_REFRESH_TOKEN_SECRET_KEY);

        await RefreshToken.create({
            refreshToken: refreshToken,
            userId: user.id
        });

        const userResponse = {
            userId: user.id,
            username: user.username,
            isAdmin: user.isAdmin
        };

        res.status(200).json({ accessToken, refreshToken, user: userResponse, message: 'Login successful' });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const newToken = async (req, res) => {
    const { token, userId } = req.body;
    if(!token) return res.status(401).json({ message: "You are not authenticated!"});
    const refresh = await RefreshToken.findOne({
        where: {
            [Op.and]: [{userId: userId}, {refreshToken: token}]
        }
    })
    if (!refresh) return res.status(403).json({ message: "Invalid Token!"});
    jwt.verify(token, process.env.JSON_REFRESH_TOKEN_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ name: user.username }, 
            process.env.JSON_ACCESS_TOKEN_SECRET_KEY, 
            { expiresIn: '30m' });
        res.json({ accessToken: accessToken})
    })
}

// const logout = async (req, res) => {
//     const { token, userId } = req.body;
//     refreshTokens.filter(token => token !== req.body.token);
//     await RefreshToken.destroy({
//         where: {
//             refreshToken: token,
//             userId: userId
//         }
//     });
//     res.status(204).json({ message: "User is logged out!"});
// }

const logout = async (body) => {
    const { token, userId } = body;
    refreshTokens.filter(token => token !== req.body.token);
    await RefreshToken.destroy({
        where: {
            refreshToken: token,
            userId: userId
        }
    });
    return { message: "Loged Out!"}
}

module.exports = {
    signup,
    login,
    newToken,
    logout,
    newToken,
    addUserByGoogle,
}