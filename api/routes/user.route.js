const router = require("express").Router();
const { deleteUser } = require("../controller/user.controller");
const { verifyToken } = require("../middleware/jwt");

router.delete("/:id", verifyToken, deleteUser)

module.exports = router;