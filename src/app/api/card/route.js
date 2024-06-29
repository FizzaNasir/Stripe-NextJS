import { getCustomer } from '@/app/Utils/stripeService';
import { getHeaders } from '@/app/Utils/stripeService';

import { addCustomerCard } from '@/app/Utils/stripeService';
import { createCustomer } from '@/app/Utils/stripeService';
import { listCustomerCards } from '@/app/Utils/stripeService';
import { deleteCustomerCard } from '@/app/Utils/stripeService';

const POST = async (req, res) => {
  const {token} = await req.json()
  const { email } = getHeaders(req);

  try {
    let customer = await getCustomer(email);
    if (!customer) 
      customer = createCustomer(email)

    return Response.json(await addCustomerCard(customer.id, token));
  } catch (error) {
   return  Response.json ({ error: 'Failed to process request' });
  }
};


const GET = async (req, res) => {
  try {
    const { email } = getHeaders(req);
    let customer = await getCustomer(email);

    return Response.json(await listCustomerCards(customer.id))

  } catch (error) {
    throw error;
  }
};

const DELETE = async (req, res) => {
  try {
    const {card} = await req.json()
    const { email } = getHeaders(req);

    let customer = await getCustomer(email);

    if (!customer) throw new NotFoundException(`Customer with the email ${email} not found in stripe.`)
    
    if (card.includes("card"))
      return Response.json(await deleteCustomerCard(customer.id, card))

    else if(card.includes("pm"))
      return Response.json(await deleteCustomerCard(card))
      
    throw new BadRequestException("Card or Payment method id is not valid")
} catch (error) {
  return Response.json(error)
}
};
export { POST, GET, DELETE };
