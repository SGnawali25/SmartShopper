const catchAsyncError = require("../middlewares/catchAsyncErrors")



exports.processPayment = catchAsyncError(async (req, res, next) => {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment'}
    });

    // console.log(paymentIntent);

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    });
});

exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
});
