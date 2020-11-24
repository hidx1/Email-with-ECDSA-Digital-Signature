import { Schema, model } from 'mongoose';

const User = new Schema({
    googleID: { type: String, required: true },
    email: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
});

const UserModel = model('user', User);

export default UserModel;
