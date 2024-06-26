const jsonschema = require("jsonschema");

const express = require("express");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const { ensureLoggedIn } = require("../middleware/auth");
const { NotFoundError } = require("../expressError");

const router = express.Router();



router.get("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err){
        return next(err);
    }
});

router.get("/userId/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        const username = req.params.username;
        const user = await User.getUserId(username);

        if(!user) throw new NotFoundError(`User with username ${username} not found`);

        return res.json({ user });
    } catch (error) {
        return next(error);
    }
});

// Patch route to update user's profile information.
router.patch("/:username", ensureLoggedIn, async function (req, res, next) {
    try { 
        const updatedUserData = req.body;
        const username = updatedUserData.username;
        const updatedUser = await User.update(username, updatedUserData);

         return res.json({ user: updatedUser });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;