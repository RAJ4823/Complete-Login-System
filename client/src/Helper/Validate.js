import toast from 'react-hot-toast';

export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    return errors;
}

export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);
    return errors;
}

export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values, true);
    return errors;
}

export async function registerValidation(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values, true);
    emailVerify(errors, values);
    return errors;
}

export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    return errors;
}

function usernameVerify(error = {}, values) {
    const validRegex = /^[A-Za-z0-9_]+$/;

    if (!values.username) {
        error.username = toast.error('Username is required...!');
    } else if (!validRegex.test(values.username)) {
        toastWarn('Only alphanumeric characters and underscores are allowed in username');
        error.username = toast.error('Invalid Username...!');
    }
    return error;
}

function passwordVerify(errors = {}, values, confirm = false) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        errors.password = toast.error('Password is Required...!');
    } else if (values.password.includes(' ')) {
        errors.password = toast.error('Password cannot contain white spaces.');
    } else if (values.password.length < 8) {
        errors.password = toast.error('Password must be more than 8 characters long.');
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error('Password must have special character.');
    } else if (confirm && values.password !== values.confirm_password) {
        errors.password = toast.error('Password not match...!');
    }

    return errors;
}

function emailVerify(error = {}, values) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!values.email) {
        error.email = toast.error('Email is Required...!');
    } else if (values.email.includes(' ') || !emailRegex.test(values.email)) {
        error.email = toast.error('Invalid Email...!');
    }
    return error;
}

function toastWarn(message) {
    return toast(message, {
        icon: '⚠️',
        duration: 6000,
    });
}
