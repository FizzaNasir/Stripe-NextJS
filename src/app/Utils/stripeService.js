import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

export async function getCustomer(email) {
    try {
      const customers = await stripe.customers.list({ email });
      let customer = customers.data[0];
      if (!customer) throw new NotFoundException(`Customer with the email ${email} not found in stripe.`)
      
      return customer
    } catch (error) {
      throw error
    }
  }
  
  export async function addCustomerCard(customer, token) {
    try {
      return await stripe.customers.createSource(customer, { source: token });
      
    } catch (error) {
      throw error
    }
  }

  export async function deleteCustomerCard(customer, card) {
    try {  
        if (card.includes("card"))
        return await stripe.customers.deleteSource(customer, card)

        else if(card.includes("pm"))
        return await stripe.paymentMethods.detach(card)   

    } catch (error) {
      throw error
    }
  }

  export async function listCustomerCards(customer) {
    try {
        return await stripe.customers.listPaymentMethods(customer)
      
    } catch (error) {
      throw error
    }
  }
  
  export async function createCustomer(email) {
    try {
       return customer = await stripe.customers.create({email});
      
    } catch (error) {
      throw error
    }
  }
  
   export async function createPaymentIntent(amount, currency, customer) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            customer,
            payment_method_types: ['card'],
        });
      return({client_secret: paymentIntent.client_secret})
    } catch (error) {
      throw error
    }
  }

  export function getHeaders(req) {
    const requestHeaders = new Headers(req.headers);
    return {
      email: requestHeaders.get('email'),
    };
  }

