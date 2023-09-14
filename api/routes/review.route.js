const router = require("express").Router();
const { createReview, getReviews, deleteReview } = require("../controller/review.controller");
const { verifyToken } = require("../middleware/jwt");

router.post("/", verifyToken, createReview)
router.get("/:gigId", getReviews)
router.delete("/:id", deleteReview)

module.exports = router;