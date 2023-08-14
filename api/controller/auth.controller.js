const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/createError");

const register = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            ...req.body,
            password: hash
        })

        await newUser.save();
        res.status(201).send("User has been created")
    } catch (err) {
        next(err)
    }
}
const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User Not Found !"))

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong password or username"));

        const token = jwt.sign({
            id: user._id, isSeller: user.isSeller
        }, process.env.JWT_KEY)

        const { password, ...info } = user._doc
        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).send(info)
    } catch (err) {
        next(err);
    }
}
const logout = async (req, res, next) => {
    try {
        res.clearCookie("accessToken", {
            sameSite: "none",
            secure: true
        }).status(200).send("User has been loged out.")
    } catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    login,
    logout
}