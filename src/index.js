const express = require('express');
const { rateLimit } = require('express-rate-limit') ;
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const limiter = rateLimit({
    windowMs:2*60*1000,//2min
    max:3,//limit each ip to 2 requests per window here per 15 min
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(limiter)


app.use('/flightsService', createProxyMiddleware({ target: ServerConfig.FLIGHT_SERVICE, changeOrigin: true, pathRewrite: {'^/flightsService' : '/'} }));
app.use('/bookingService', createProxyMiddleware({ target: ServerConfig.BOOKING_SERVICE, changeOrigin: true }));
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});

/**
 * user
 *  |
 *  v
 * localhost:3001 (API Gateway) localhost:4000/api/v1/bookings
 *  |
 *  v
 * localhost:3000/api/v1/flights
 */