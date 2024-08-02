const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const cloudinary = require('cloudinary')
const jwt = require('jsonwebtoken');
const user = require('../models/user');


//Register a user
exports.registerUser = catchAsyncErrors( async(req, res, next) => {
    

    const {name, email, password} = req.body;

    //whether user enterd email and password
    if(!email || !password || !name){
        return next(new ErrorHandler('Please enter name, email, and password properly', 400));
    }

    if(!req.body.avatar){
        return next(new ErrorHandler('Please choose your profile picture', 400));
    }

    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: "SmartShopper/Users",
        width: 150,
        crop: "scale"
    })

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    sendToken(user, 200, "", res)

    
}
)

//login based on user email and password
exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const {email, password} = req.body;

    //whether user enterd email and password
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    //finding user in our database
    const user = await User.findOne({email}).select('+password')

    if (!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    //checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const newTokens = user.tokens.filter(t => t.expiry > new Date(Date.now()))
    user.tokens = newTokens;
    await user.save();

    sendToken(user, 200, "", res)
})


//logout user
exports.logout = catchAsyncErrors( async(req, res, next) => {

    const options = {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        path:"/"        }

    const {token} = await req.cookies;

    if (!token){
        return next(new ErrorHandler("Please login!!!", 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)


    const user = await User.findById(decoded.id);
    const newTokens = user.tokens.filter(t => t.token !== token)
    user.tokens = newTokens
    await user.save()

    res.status(200).cookie('token', null, options).json({
        success: true,
        message: "logout succesful"
    })
})



// gives the user their own information
exports.userProfile = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

//change the password
exports.changePassword = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //confirm the old password
    const currentPassword = req.body.currentPassword;
    
    const status = await user.comparePassword(currentPassword);

    if (!status){
        const message = "Your current password doesn't match with the entered password.";
        return next(new ErrorHandler(message, 401));
    }

    //compare two entered password
    if(req.body.newPassword !== req.body.confirmNewPassword){
        const message = "Your new passwords doesn't match with each other.";
        return next(new ErrorHandler(message, 402))
    }

    user.password = req.body.newPassword;
    user.tokens = [];
    await user.save()
    sendToken(user,200 ,"Password Updated Successfully", res)

    

})

// Update user profile   =>   /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Update avatar
    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)

        //this deletes the old profile picture
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'SmartShopper/Users',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

//get all the users with details
exports.getAllUsers = catchAsyncErrors( async(req, res, next) => {
    const users = await User.find();
    const UsersCount = await User.countDocuments();

    res.status(200).json({
        success: true,
        UsersCount,
        users
    })
})

//get specific user details
exports.getUser = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user){
        return next(new ErrorHandler(`User not found with given id ${req.params.id}.`, 404));
    }

    res.status(200).json({
        success: true,
        user
    })
})

//update the user information like role name email
exports.updateUser = catchAsyncErrors( async(req, res, next) => {
    let user = await User.findById(req.params.id);
    if (!user){
        return next(new ErrorHandler(`User not found with id ${req.params.id}.`, 404))
    }

    const newData = req.body;
    newData.email = newData.email || user.email;
    newData.name = newData.name || user.name;
    newData.role = newData.role || user.role;

    user = await User.findByIdAndUpdate(req.params.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })
})


//delete the user from the database
exports.deleteUser = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not found with id ${req.params.id}`, 404));
    }

    await cloudinary.v2.api
                    .delete_resources([`${user.avatar.public_id}`], 
                    { type: 'upload', resource_type: 'image' })



    res.status(200).json({
        success: true,
        user
    })

})

//Forgot password
exports.forgotPassword = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if (!user){
        return next(new ErrorHandler('User not found with this email.', 404));
    }

    //Get reset token getResetPasswordToken
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    //create reset password url
    const resetPasswordURL = `${req.protocol}://smartshopper.sandeshgnawali.com.np/password/reset/${resetToken}`;

    const message = `<p>Your password reset link is as follow:</p>\n\n<a href = ${resetPasswordURL}>Click here </a> to reset Password
                    \n\n<p>If you have not requested this email, please contact us.</p>`;


   try{
    await sendEmail({
        email: user.email,
        subject: 'Website password recovery',
        message  
    })

    res.status(200).json({
        success: true,
        message: `Email sent to: ${user.email}`
    })

   }catch(error){
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave: false});

    return next(new ErrorHandler(error.message, 500))
   }                 

})

//reset password
exports.resetPassword = catchAsyncErrors( async(req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now()}
    }).select('+password')

    

    if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired',401))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 404))
    }

    if (await user.comparePassword(req.body.password)){
        return next(new ErrorHandler('Your old password and new password must be different', 404))
    }


    //setup password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.tokens = [];

    await user.save();
    sendToken(user, 200,"Passpord Changed successfully", res);
})
