import toast from 'react-hot-toast';
import { authenticate } from './helper';

export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    if (values.username) {
        const authPromise = authenticate(values.username);
        toast.promise(authPromise, {
            loading: 'Fetching username...',
            success: 'Username Found Successfully',
            error: 'User does not exists...!',
        });
        authPromise.then(({ status }) => {
            if (status != 200) {
                errors.exist = 'User does not exists';
            }
        });
    }
    return errors;
}

export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);
    return errors;
}

export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values);

    if (errors.length === 0) {
        if (values.password !== values.confirm_pwd) {
            errors.exist = toast.error('Password not match...!');
        }
    }

    return errors;
}

export async function registerValidation(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);
    return errors;
}

export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    return errors;
}

function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username required...!');
    } else if (values.username.includes(' ')) {
        error.username = toast.error('Invalid Username...!');
    }
    return error;
}

function passwordVerify(errors = {}, values) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        errors.password = toast.error('Password Required...!');
    } else if (values.password.includes(' ')) {
        errors.password = toast.error('Wrong Password...!');
    } else if (values.password.length < 8) {
        errors.password = toast.error('Password must be more than 8 characters long');
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error('Password must have special character');
    }

    return errors;
}

function emailVerify(error = {}, values) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!values.email) {
        error.email = toast.error('Email Required...!');
    } else if (values.email.includes(' ')) {
        error.email = toast.error('Wrong Email...!');
    } else if (!emailRegex.test(values.email)) {
        error.email = toast.error('Invalid email address...!');
    }
    return error;
}
