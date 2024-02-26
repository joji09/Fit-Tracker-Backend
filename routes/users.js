const jsonschema = require("jsonschema");

const express = require("exress");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const { ensureLoggedIn } = require("../middleware/auth");


router.get("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err){
        return next(err);
    }
});

module.exports = router;