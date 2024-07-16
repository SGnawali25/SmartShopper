const express = require('express');
const router = express.Router();
const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')

const {
    registerUser, 
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword, 
    userProfile,
    changePassword,
    updateProfile,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/reset').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, userProfile);
router.route('/password/change').put(isAuthenticatedUser, changePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/admin/users').get(isAuthenticatedUser, getAllUsers);

router.route('/admin/user/:id')
                            .get(isAuthenticatedUser, authorizedRoles('admin'), getUser)
                            .put(isAuthenticatedUser, authorizedRoles('admin'), updateUser)
                            .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteUser);

module.exports = router