import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

export const createStripe = async (req, res) => {
  try {
    const createCharges = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "INR",
    });
    res.status(200).send(createCharges);
  } catch (error) {
    console.log(error);
  }
};
