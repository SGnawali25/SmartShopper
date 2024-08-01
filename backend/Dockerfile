FROM node

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY server.js server.js
COPY app.js app.js
COPY config/database.js config/database.js
COPY controllers/authController.js controllers/authController.js
COPY controllers/orderController.js controllers/orderController.js
COPY controllers/paymentController.js controllers/paymentController.js
COPY controllers/productController.js controllers/productController.js
COPY middlewares/auth.js middlewares/auth.js
COPY middlewares/catchAsyncErrors.js middlewares/catchAsyncErrors.js
COPY middlewares/errors.js middlewares/errors.js
COPY models/order.js models/order.js
COPY models/product.js models/product.js
COPY models/user.js models/user.js
COPY routes/auth.js routes/auth.js
COPY routes/order.js routes/order.js
COPY routes/payment.js routes/payetment.js
COPY routes/product.js routes/product.js
COPY routes/welcome.js routes/welcome.js
COPY utils/apiFeatures.js utils/apiFeatures.js
COPY utils/errorHandler.js utils/errorHandler.js
COPY utils/jwtToken.js utils/jwtToken.js
COPY utils/sendEmail.js utils/sendEmail.js

RUN npm install

COPY config/config.env config/config.env
EXPOSE 4000

ENTRYPOINT [ "node", "server.js" ]