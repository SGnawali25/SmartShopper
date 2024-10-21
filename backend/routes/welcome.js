const express = require('express');
const router = express.Router();


router.route("/").get((req, res, next)=>{

    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`

    if (fullUrl.includes('1')){
        res.status(200).json({
            success: true,
            message: "Welcome to the SmartShopper Backend API 1"
        })
    } else {
        res.status(200).json({
            success: true,
            message: "Welcome to the SmartShopper Backend API 2"
        })
    }
    
});

module.exports = router;