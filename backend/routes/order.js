const express = require('express');
const router = express.Router();

const {
    newOrder, 
    getSingleOrder, 
    myOrders, 
    allOrders, 
    updateOrder, 
    deleteOrder
    } = require('../controllers/orderController');

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/admin/orders').get(isAuthenticatedUser, allOrders);
router.route('/admin/update/order/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateOrder);
router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteOrder);
module.exports = router;