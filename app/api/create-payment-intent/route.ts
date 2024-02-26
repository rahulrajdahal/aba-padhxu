// This is your test secret API key.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (total:number) => {
  
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return total;
};

export async function POST(req:Request) {
  
  const { total } = await req.json()
  //  Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(total),
    currency: 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return Response.json({
    clientSecret: paymentIntent.client_secret,
  });
}
