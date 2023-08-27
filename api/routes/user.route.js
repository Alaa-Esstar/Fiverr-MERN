const router = require("express").Router();
const { deleteUser, getUser } = require("../controller/user.controller");
const { verifyToken } = require("../middleware/jwt");

router.delete("/:id", verifyToken, deleteUser)
router.get("/:id", verifyToken, getUser)

module.exports = router;