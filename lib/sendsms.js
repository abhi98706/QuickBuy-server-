import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

export async function sendOrderSMS(phone, customerName, products, totalAmount) {
  const client = twilio(accountSid, authToken);

  // Build product list
  const productLines = products
    .map(p => `${p.name} x${p.quantity} = Rs.${p.subtotal}`)
    .join(', ');

  const message =
    `Dear ${customerName}, thank you for your order on QuickBuy! 🛒 ` +
    `Your ordered items: ${productLines}. ` +
    `Order Total: Rs.${totalAmount}. ` +
    `Your order is being processed and will be delivered soon. ` +
    `For any queries contact us at quickbuy@support.com`;

  try {
    const result = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: `+91${phone}`, // adds India country code
    });

    console.log('SMS sent! SID:', result.sid);
    return result;
  } catch (error) {
    console.error('SMS error:', error.message);
  }
}