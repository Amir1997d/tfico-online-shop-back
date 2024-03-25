const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');

User.findOrCreateByGoogleId = async function (googleId, userData) {
    const [user, created] = await this.findOrCreate({
        where: { email: userData.email },
        defaults: {
            googleId,
            username: userData.displayName,
            email: userData.email,
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

User.findOrCreateByYandexId = async function (yandexId, userData) {
    const [user, created] = await this.findOrCreate({
        where: { yandexId, email: userData.email, },
        defaults: {
            username: userData.displayName,
            email: userData.email,
        }
    });
    if (!created) {
        await this.update({ yandexId }, {
            where: {
                email: userData.email
            }
        });
    }
    return { user, created };
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Unable to fetch users' });
    }
}

const addUserByGoogle = async (profile) => {
    try {
        const googleId = profile.id;
        const userData = {
            displayName: profile.displayName,
            email: profile.emails[0].value,
        };
        const { user, created } = await User.findOrCreateByGoogleId(googleId, userData);
        if (created) {
            console.log('New user created:', user);
        } else {
            console.log('User is updated:', user);
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }  
}

const addUserByYandex = async (profile) => {
    try {
        const yandexId = profile.id;
        const userData = {
            displayName: profile.displayName,
            email: profile.emails[0].value,
        };
        const { user, created } = await User.findOrCreateByYandexId(yandexId, userData);
        if (created) {
            console.log('New user created:', user);
        } else {
            console.log('User is updated:', user);
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

const getUserById = async (req, res) => {
    try {
      let user = await User.findOne({
        where: {
          yandexId: req.params.userId
        }
      });
      if(user === null) {
        user = await User.findOne({
            where: {
              googleId: req.params.userId
            }
          });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Unable to fetch user' });
    }
}

const getUsernameById = async (req, res) => {
    try {
      let user = await User.findOne({
        where: {
          id: req.params.userId
        }
      });
      res.status(200).json(user.username);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Unable to fetch user' });
    }
}

const deleteUser = async (req, res) => {
    const { userId } = req.body;
    try {
        await User.destroy({
          where: {
            id: userId
          }
        });
        res.status(202).json({ message: "user is deleted!" });
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Unable to delete user' });
      }
}

const updateUserRole = async (req, res) => {
    try {
        const { userId, userRole } = req.body; 
        await User.update({ isAdmin: userRole }, {
            where: {
                id: userId
            }
        });
        res.status(200).json({ message: "user role is updated!" });
    } catch(error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ error: 'Unable to update user role' });
    }
}

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    getAllUsers,
    addUserByGoogle,
    addUserByYandex,
    getUserById,
    getUsernameById,
    deleteUser,
    updateUserRole,
    login,
    signup
}