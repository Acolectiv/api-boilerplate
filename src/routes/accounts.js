const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const UserManager = require("../managers/UserManager");

router.post('/create', auth, async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password)
            return res.status(401).send({ success: false, error: "Username, email, password empty." });

        const { user, token, error } = await UserManager.createUser({ username, email, password });
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
})

module.exports = router;