const router = require("express").Router();
const { getConversations, createConversation, getSingleConversation, UpdateConversation } = require("../controller/conversation.controller");
const { verifyToken } = require("../middleware/jwt");


router.get("/", verifyToken, getConversations)
router.post("/", verifyToken, createConversation)
router.get("/single/:id", verifyToken, getSingleConversation)
router.put("/:id", verifyToken, UpdateConversation)

module.exports = router;