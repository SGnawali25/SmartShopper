const product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/product.json');
const {connect} = require('mongoose');

//setting dotenv file
dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

const seedProducts = async() => {
    try{
        await product.deleteMany();
        console.log("Products are deleted.")
        await product.insertMany(products);
        console.log('all products are inserted')
    }catch(error){
        console.log(error.message);
        process.exit();
    }
}

seedProducts()