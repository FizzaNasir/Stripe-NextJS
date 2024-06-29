import Stripe from 'stripe';
import { getHeaders } from '@/app/Utils/stripeService';
import { getCustomer } from '@/app/Utils/stripeService';
import { createPaymentIntent } from '@/app/Utils/stripeService';

const POST = async (req, res) => {
try {
    const { email } = getHeaders(req);

    let customer = await getCustomer(email);

    const {amount, currency} = await req.json()   
    return Response.json(await createPaymentIntent(amount, currency, customer.id))

} catch (error) {
    throw error;
}
};

export { POST } 