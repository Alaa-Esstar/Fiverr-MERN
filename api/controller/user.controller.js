const User = require("../models/user.model");
const { createError } = require("../utils/createError");

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(createError(404, "User not found"));

        if (req.userId !== user._id.toString()) {
            return next(createError(403, "You can delete only your account!"));
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("deleted!")
    } catch (err) {
        next(err);
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        res.status(200).send(user)
    } catch (err) {
        next(err);
    }
}

module.exports = {
    deleteUser,
    getUser
}