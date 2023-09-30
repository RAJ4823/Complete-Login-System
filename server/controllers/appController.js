import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/** Middleware for verify user */
export async function verifyUser(req, res, callback) {
    try {
        const { username } = req.method == 'GET' ? req.query : req.body;

        // check the user existance
        let isUsernameExist = await UserModel.findOne({ username });
        if (!isUsernameExist) return res.status(404).send({ error: 'Username Not Found' });
        callback();
    } catch (error) {
        return res.status(404).send({ error: 'Authentication Error' });
    }
}

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "the_247",
  "password" : "RAJ@482003",
  "email": "the_247@superverse.com",
  "firstName" : "Raj",
  "lastName": "Patel",
  "mobile": 1234567890,
  "address" : "A-111, Burj Khalifa, Dubai",
  "profile": "<image-uri>"
}
*/
export async function register(req, res) {
    try {
        const { username, password, email, profile } = req.body;

        // check username exists
        const isUsernameExist = new Promise((resolve, reject) => {
            UserModel.findOne({ username })
                .then((data) => (data ? reject({ error: 'Please use unique username' }) : resolve()))
                .catch((err) => reject({ isUsernameExist: err }));
        });

        // check email exists
        const isEmailExists = new Promise((resolve, reject) => {
            UserModel.findOne({ email })
                .then((data) => (data ? reject({ error: 'Please use unique email' }) : resolve()))
                .catch((err) => reject({ isEmailExistsError: err }));
        });

        Promise.all([isUsernameExist, isEmailExists])
            .then(() => {
                if (password) {
                    bcrypt
                        .hash(password, 10)
                        .then((hashedPassword) => {
                            const user = new UserModel({
                                username: username,
                                password: hashedPassword,
                                profile: profile || '',
                                email: email,
                            });

                            user.save()
                                .then(() => res.status(201).send({ msg: 'User Registered Successfully' }))
                                .catch(() => res.status(500).send({ error: 'User Registration Failed' }));
                        })
                        .catch((err) => res.status(500).send({ error: 'Unable to hash password' }));
                }
            })
            .catch((err) => res.status(500).send(err));
    } catch (err) {
        return res.status(500).send(err);
    }
}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "the_247",
  "password" : "RAJ@482003",
  }
*/
export async function login(req, res) {
    const { username, password } = req.body;

    try {
        // User verified first then login function is called, so user data always exists
        const data = await UserModel.findOne({ username: username });
        const isPassowrdCorrect = await bcrypt.compare(password, data.password);

        if (isPassowrdCorrect) {
            // Create JWT Token
            const load = { userId: data._id, username: data.username };
            const expires = { expiresIn: '24h' };
            const token = jwt.sign(load, process.env.JWT_SECRET_KEY, expires);

            return res.status(200).send({
                msg: 'Login Successfull',
                username: data.username,
                token: token,
            });
        } else {
            return res.status(400).send({ error: "Don't Have Password" });
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}

/** GET: http://localhost:8080/api/user/the_247 */
export async function getUser(req, res) {
    const { username } = req.params;
    try {
        UserModel.findOne({ username })
            .then((data) => {
                const { password, ...rest } = Object.assign({}, data.toJSON());
                return res.status(201).send(rest);
            })
            .catch((err) => res.status(501).send({ error: 'Username Not Found' }));
    } catch (err) {
        return res.status(500).send(err);
    }
}

export async function updateUser(req, res) {
    res.json('updateUser');
}

export async function generateOTP(req, res) {
    res.json('generateOTP');
}

export async function verifyOTP(req, res) {
    res.json('verifyOTP');
}

export async function createResetSession(req, res) {
    res.json('createResetSession');
}

export async function resetPassword(req, res) {
    res.json('resetPassword');
}
