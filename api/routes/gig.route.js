const router = require("express").Router();
const { createGig, deleteGig, getGig, getGigs } = require("../controller/gig.controller");
const { verifyToken } = require("../middleware/jwt");


router.post("/", verifyToken, createGig)
router.delete("/:id", verifyToken, deleteGig)
router.get("/single/:id", verifyToken, getGig)
router.get("/", verifyToken, getGigs)

module.exports = router;