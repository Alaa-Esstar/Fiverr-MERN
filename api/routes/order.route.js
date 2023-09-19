const router = require("express").Router();
const { verifyToken } = require("../middleware/jwt");
const { createOrder, getOrders } = require("../controller/order.controller");


router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

module.exports = router;