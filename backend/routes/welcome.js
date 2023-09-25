const express = require('express');
const router = express.Router();


router.route("/").get((req, res, next)=>{
    res.status(200).json({
        success: true,
        message: "Welcome to the Smart Shopper Backend API"
    })
});

module.exports = router;