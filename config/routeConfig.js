const express = require('express');
const cors = require('cors');
var cons = require('consolidate');
const homeRouter = require('../route/home.route');
const path = require('path');
const compression = require('compression');
module.exports = (app) => {  

    const corsOptions = {
        origin: (origin, callback) => {
            callback(null, true)
        },
        'preflightContinue': false,
        'optionsSuccessStatus': 204,
        'credentials': true
    }
    app.use(cors(corsOptions))
    app.use(compression());
    app.use(express.json({limit: '50mb', extended: true}));
    app.use(express.urlencoded({limit: '50mb', extended: true}));
    app.set('trust proxy', 1);
    app.engine('html', cons.swig)
    app.set('views', path.join(__dirname, 'dist'));
    app.set('view engine', 'html');

    let cookie = {};
    if (process.env.PRODUCTION === 'true'){
        cookie = {
            secure: true, // if true only transmit cookie over https
            httpOnly: true, // if true prevent client side JS from reading the cookie 
            maxAge: 1000 * 60 * 60 * 24 , // session max age in miliseconds
            sameSite: 'none'
        }
    }else{
        cookie = {
            secure: false, // if true only transmit cookie over https
            httpOnly: true, // if true prevent client side JS from reading the cookie 
            maxAge: 1000 * 60 * 60 * 24 , // session max age in miliseconds
            sameSite: true
        }
    }
    app.use(express.static('dist/dashboard-admin'));

    app.use('/', homeRouter); 
    
}
