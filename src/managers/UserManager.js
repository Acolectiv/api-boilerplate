const Logger = require("../utils/Logger");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");

const User = model('User');

class UserManager {
    constructor() {
        if(!UserManager.instance) {
            Logger.log("[UserManager] -> UserManager class initialized");
            UserManager.instance = this;
        }

        return UserManager.instance;
    }

    async userExists(username) {
        const user = await User.findOne({ username });
        if(!user) return false;
        else return true;
    }

    async findUserByUsername(username) {
        return User.findOne({ username });
    }

    async createUser(payload) {
        if(!payload) return Logger.error(`[UserManager] -> Payload must be greater then 0.`);

        let error = null;

        if((await this.userExists(payload.username)) === true) 
            return { error: "user already exists" }

        const user = new User(payload);
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN);

        return { user, token };
    }

    async loginUser(payload) {
        if(!payload) return Logger.error(`[UserManager] -> Payload must be greater then 0.`);

        let error = null;

        const user = await this.findUserByUsername(payload.username);
        if(!user) return { error: "user doesn't exist" };
        
        const isPasswordValid = await compare(payload.password, user.password);
        if(!isPasswordValid) return { error: "incorrect password" };

        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN);

        return { user, token };
    }
}

module.exports = new UserManager();