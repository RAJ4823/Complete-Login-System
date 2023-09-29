import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide unique username'],
        unique: [true, 'Username already exists'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        unique: false,
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true,
    },
    mobile: { type: Number },
    address: { type: String },
    profile: { type: String },
    firstName: { type: String },
    lastName: { type: String },
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);