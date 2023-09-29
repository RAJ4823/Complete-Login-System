import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
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
                .then((err, data) => {
                    if (err) reject(new Error(err));
                    if (data) reject({ error: 'Please use unique username' });

                    resolve();
                })
                .catch((err) => reject({ isUsernameExistError: err }));
        });

        // check email exists
        const isEmailExists = new Promise((resolve, reject) => {
            UserModel.findOne({ email })
                .then((err, data) => {
                    if (err) reject(new Error(err));
                    if (data) reject({ error: 'Please use unique email' });

                    resolve();
                })
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
                                .then(() => {
                                    res.status(201).send({
                                        msg: 'User Registered Successfully',
                                        user: user,
                                    });
                                })
                                .catch((err) => {
                                    res.status(500).send({ err });
                                });
                        })
                        .catch((err) => {
                            res.status(500).send({
                                error: 'Unable to hashed password',
                            });
                        });
                }
            })
            .catch((err) => {
                res.status(500).send({ err, error: 'PROMISE FAILED' });
            });
    } catch (err) {
        res.status(500).send({ err });
    }
}

export async function login(req, res) {
    res.json('login');
}

export async function getUser(req, res) {
    res.json('getUser');
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
