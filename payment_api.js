const express = require('express');
const stripe = require('stripe')('your_stripe_secret_key');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/payment', async (req, res) => {
    const { amount, currency, source, description } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            source,
            description,
        });

        res.json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: 'Payment processing failed' });
    }
});

app.post('/webhook', (req, res) => {
    // Handle webhook events from Stripe
    const event = req.body;

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful:', paymentIntent.id);
            break;
        case 'payment_intent.payment_failed':
            const failedPaymentIntent = event.data.object;
            console.log('PaymentIntent failed:', failedPaymentIntent.id);
            break;
        // Add more event types as needed
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
