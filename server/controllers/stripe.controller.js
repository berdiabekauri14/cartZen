const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Sample Product',
                            description: 'This is a sample product.'
                        },
                        unit_amount: 2000
                    },
                    quantity: 1
                }
            ],
            success_url: `http://localhost:5000/success`,
            cancel_url: `http://localhost:5000/cancel`
        });

        res.redirect(session.url);
    } catch(err) {
        console.error('Error creating checkout session:', err);
    }
};

module.exports = {
    createCheckoutSession
};