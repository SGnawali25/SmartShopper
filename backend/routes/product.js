const express = require('express');
const router = express.Router();

const {
    getProducts, 
    newProduct, 
    getProductById, 
    updateProductById, 
    deleteProductById,
    getAdminProducts,
    createProductReview,
    getProductReview,
    deleteReview,
    } = require('../controllers/productController')

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth');


router.route('/admin/product/new').post(isAuthenticatedUser, authorizedRoles('admin'), newProduct);

router.route('/products').get(getProducts);

router.route('/product/:id').get( getProductById)

router.route('/admin/products').get(isAuthenticatedUser, authorizedRoles('admin'), getAdminProducts)                            

router.route('/admin/product/:id')
                                    .put(isAuthenticatedUser, authorizedRoles('admin'), updateProductById)
                                    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProductById);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/reviews').get(isAuthenticatedUser, getProductReview)
                        .delete(isAuthenticatedUser, deleteReview)

module.exports = router;