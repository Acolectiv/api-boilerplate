const express = require("express");
const router = express.Router();

const UserManager = require("../managers/UserManager");

router.post('/create', async (req, res, next) => {
    try {
        const { username, email, password, first_name, last_name } = req.body;

        if(!username || !email || !password || !first_name || !last_name)
            return res.status(401).send({ success: false, error: "Username, email, password, first_name, last_name empty." });

        const { user, token, error } = await UserManager.createUser({ username, email, password, first_name, last_name });
        if(error) return res.status(401).send({ success: false, error });

        return res.send({ user, token });
    } catch(e) {
        res.status(500).send({ success: false, error: e });
    };
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if(!username || !password)
            return res.status(401).send({ success: false, error: "Username, password empty." });

        const { user, token, error } = await UserManager.loginUser({ username, password });
        if(error) return res.status(401).send({ sucess: false, error });

        return res.send({ user, token });
    } catch(e) {
        console.log(e)
        res.status(500).send({ success: false, error: e });
    }
});

router.get('/retrieve/:username', async (req, res, next) => {
    let username = req.params.username;
    if(!username) return res.status(401).send({ success: false, error: "no username was provided" });

    let user = await UserManager.findUserByUsername(username);
    if(!user) return res.status(401).send({ sucess: false, error: "account with that username doesn't exist" });

    return res.send({ success: true, user: user });
})

module.exports = router;