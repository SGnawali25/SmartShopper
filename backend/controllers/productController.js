const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')


//create a new product
exports.newProduct = catchAsyncErrors( async(req, res, next) => {
    let images = []
    
    images = req.body.images;
    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'SmartShopper/Products'
        });
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)
    
    let products = await apiFeatures.query;


    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        products
    })
    

})

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();
    const productCount = await Product.countDocuments();

    res.status(200).json({
        success: true,
        productCount,
        products
    })

})

// Get single product details   =>   /api/v1/product/:id
exports.getProductById = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }


    res.status(200).json({
        success: true,
        product
    })

})

// Update Product   =>   /api/v1/admin/product/:id
exports.updateProductById = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    console.log(req.body.images)


    if (req.body.images){

        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.api
                        .delete_resources([`${product.images[i].public_id}`], 
                        { type: 'upload', resource_type: 'image' })
        }
        let images = []
        images = req.body.images;
        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'SmartShopper/Products'
            });
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks
    }

    

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "produdct has been updated successfully.",
        product
    })

})

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProductById = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.api
                    .delete_resources([`${product.images[i].public_id}`], 
                    { type: 'upload', resource_type: 'image' })
    }


    res.status(200).json({
        success: true,
        message: 'Product is deleted.',
        product
    })

})

//create review of a product
exports.createProductReview = catchAsyncErrors(async(req, res, next) => {
    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());

    if (isReviewed){
        product.reviews.forEach(review=> {
            if (review.user._id.toString() === req.user.id.toString()){
                review.comment = comment,
                review.rating = rating
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0)/product.reviews.length

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        message: "Product review generated"
    })
})

//get product reviews
exports.getProductReview = catchAsyncErrors( async(req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product){
        return next(new ErrorHandler("Product not found with given id", 404));
    }

    res.status(200).json({
        success: true ,
        reviews: product.reviews
    })
})


exports.deleteReview = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter( review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;
    const ratings = reviews.reduce((acc, item) => item.rating + acc, 0)/numOfReviews || 5;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, 
        numOfReviews, 
        ratings
        }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        reviews
    })

})




