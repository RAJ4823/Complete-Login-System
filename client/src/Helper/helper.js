import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export async function authenticate(username) {
    try {
        return await axios.post('/api/authenticate', { username });
    } catch (err) {
        return { error: 'Username not found...!', err };
    }
}

export async function register(credentials) {
    try {
        const { status } = await axios.post('/api/register', credentials);
        const message = 'Registration Failed...!';

        // Send Mail if user registered Successfully
        if (status === 201) {
            message = 'Registered Successfully!';
            const mailData = {
                username: credentials.username,
                userEmail: credentials.email,
                subject: message,
                mailType: 'registerMail',
            };
            await axios.post('/api/send-mail', mailData);
        }

        return Promise.resolve({ message });
    } catch (error) {
        return Promise.reject({ error });
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
        let { data } = await axios.get(`/api/get-user/${username}`);
        return { data };
    } catch (e) {
        return { error: "Couldn't Fetch the user data...!", e };
    }
}
export async function updateUser(credentials) {
    try {
        const token = await localStorage.getItem('token');
        const { data } = await axios.put('api/update-user', credentials, { Authorization: `Bearer ${token}` });

        return Promise.resolve({ data });
    } catch (e) {
        return Promise.reject({ error: "Couldn't Update the Profile...!", e });
    }
}

export async function generateOTP({ username }) {
    try {
        const { data, status } = await axios.get(`/api/generate-otp`, { params: { username } });
        const OTP = { data };

        // Send OTP mail
        if (status === 201) {
            const { data } = await getUser({ username });
            message = 'Registered Successfully!';
            const mailData = {
                username: username,
                userEmail: data.email,
                subject: message,
                mailType: 'otpMail',
                otp: OTP,
            };
            await axios.post('/api/send-mail', mailData);
        }

        return Promise.resolve({ OTP });
    } catch (e) {
        return Promise.reject({ error: "Couldn't genreate the OTP...!", e });
    }
}

export async function verifyOTP(credentials) {
    try {
        const { data, status } = await axios.get(`/api/verify-otp`, { params: credentials });
        return Promise.resolve({ data, status });
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
