import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendOrderSMS } from '@/lib/sendsms';

export async function POST(req) {
  const body = await req.json();
  const { fullName, phone, address, paymentMethod, products, totalAmount } = body;

  const { data, error } = await supabase
    .from('shipping_details')
    .insert([{
      full_name: fullName,
      phone: phone,
      address: address,
      payment_method: paymentMethod,
      products: products,
      total_amount: totalAmount,
      status: 'pending'
    }])
    .select();

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }

  await sendOrderSMS(phone, fullName, products, totalAmount);

  return NextResponse.json({ success: true, data }, { status: 201 });
}

export async function GET() {
  const { data, error } = await supabase
    .from('shipping_details')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}