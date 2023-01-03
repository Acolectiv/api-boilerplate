const { Schema, model } = require("mongoose");
const { hash } = require("bcrypt");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    pLink: String
});

UserSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await hash(user.password, 10);
    };

    next();
});

model('User', UserSchema);