//create and send token and save in cookie
const sendToken = async(user, statusCode, message, res) => {

    const token = user.getJwtToken();
    const expiry = new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000)

    user.tokens.push({ token, expiry });    
    await user.save();

    //options for cookie
    const options = {
        expires: expiry,
        httpOnly: true,
        secure: true,
        path:"/"
    }
    

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user,
        message
    })

}

module.exports = sendToken;