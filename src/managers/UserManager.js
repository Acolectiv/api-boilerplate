const Logger = require("../utils/Logger");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");

const User = model('User');

class UserManager {
    constructor(opts) {
        if(!UserManager.instance) {
            this.opts = opts;
            Logger.log("[UserManager] -> UserManager class initialized.");
            UserManager.instance = this;

            if(this.opts.memoryCaching) {
                this.caching = true;
                this.Cache = require("./MemoryStore");
            }
        }

        return UserManager.instance;
    }

    async userExists(username) {
        const user = await User.findOne({ username });
        if(!user) return false;
        else return true;
    }

    async findUserByUsername(username) {
        if(this.caching) {
            let result = this.Cache.get(username);
            if(result) return result;
            else {
                const res = await User.findOne({ username });

                this.Cache.put(username, res);
                return res;
            }
        } else {
            const result = await User.findOne({ username });
            
            return result;
        }
    }

    async createUser(payload) {
        if(!payload) return Logger.error(`[UserManager] -> Payload must be greater then 0.`);

        if((await this.userExists(payload.username)) === true) 
            return { error: "user already exists" }

        const user = new User(payload);
        let cache = await user.save();

        if(this.caching) this.Cache.put(cache._id, cache);

        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN);

        return { user, token };
    }

    async loginUser(payload) {
        if(!payload) return Logger.error(`[UserManager] -> Payload must be greater then 0.`);

        const user = await this.findUserByUsername(payload.username);
        if(!user) return { error: "user doesn't exist" };
        
        const isPasswordValid = await compare(payload.password, user.password);
        if(!isPasswordValid) return { error: "incorrect password" };

        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN);

        return { user, token };
    }
}

module.exports = new UserManager({ memoryCaching: true });