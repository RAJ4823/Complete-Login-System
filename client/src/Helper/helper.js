import axios from 'axios';
import jwt_decode from 'jwt-decode';
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export async function getUsername() {
    const token = localStorage.getItem('token');
    if (!token) {
        return Promise.reject('Cannot find the Token...!');
    }
    const decodedToken = jwt_decode(token);
    return decodedToken;
}

export async function authenticate(username) {
    try {
        const { status } = await axios.post('/api/authenticate', { username });
        if (status !== 200) {
            throw new Error({ message: 'Username not Found...!' });
        }
        return Promise.resolve({ message: 'Username found successfully.' });
    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function register(credentials) {
    try {
        const { status } = await axios.post('/api/register', credentials);

        // Send Mail if user registered Successfully
        if (status === 201) {
            let message = 'Registered Successfully!';
            const mailData = {
                username: credentials.username,
                userEmail: credentials.email,
                subject: message,
                mailType: 'registerMail',
            };
            await axios.post('/api/send-mail', mailData);
            return Promise.resolve({ message });
        } else {
            throw new Error('Registration Failed...!');
        }
    } catch (err) {
        let message = err?.response?.data?.error;
        return Promise.reject({ err, message });
    }
}

export async function login(credentials) {
    try {
        const { data } = await axios.post('/api/login', credentials);
        return Promise.resolve({ data });
    } catch (e) {
        return Promise.reject({ error: 'Login Failed...!', e });
    }
}

export async function getUser({ username }) {
    try {
        let { data } = await axios.get(`/api/user/${username}`);
        return data;
    } catch (e) {
        return { error: "Couldn't Fetch the user data...!", e };
    }
}

export async function updateUser(credentials) {
    try {
        const token = await localStorage.getItem('token');
        const { data } = await axios.put('api/update-user', credentials, { headers: { Authorization: `Bearer ${token}` } });

        return Promise.resolve({ data });
    } catch (err) {
        let message = err?.response?.data?.error;
        return Promise.reject({ err, message });
    }
}

export async function generateOTP(username) {
    try {
        let { data, status } = await axios.get(`/api/generate-otp`, { params: { username } });

        // Send OTP mail
        if (status === 201) {
            let { email } = await getUser({ username });
            const mailData = {
                username: username,
                userEmail: email,
                subject: 'Password Recovery OTP',
                mailType: 'otpMail',
                otp: data?.OTP,
            };
            await axios.post('/api/send-mail', mailData);
        }

        return Promise.resolve(data?.OTP);
    } catch (e) {
        return Promise.reject({ error: "Couldn't genreate the OTP...!", e });
    }
}

export async function verifyOTP(credentials) {
    try {
        const { data, status } = await axios.get(`/api/verify-otp`, { params: credentials });
        return { data, status };
    } catch (e) {
        return Promise.reject({ error: 'OTP Verification Failed...!', e });
    }
}

export async function resetPassword(credentials) {
    try {
        const { data, status } = axios.put('/api/reset-password', credentials);
        return Promise.resolve({ data, status });
    } catch (e) {
        return Promise.reject({ error: 'Password reset failed...!', e });
    }
}
