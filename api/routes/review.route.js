const router = require("express").Router();

router.get("/test", (req, res) => {
    res.send("it works");
})

module.exports = router;