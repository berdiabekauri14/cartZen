const express = require('express');
const { createCheckoutSession } = require('../controllers/stripe.controller');

const stripeRouter = express.Router();

stripeRouter.get('/create-checkout-session', createCheckoutSession);

module.exports = stripeRouter;