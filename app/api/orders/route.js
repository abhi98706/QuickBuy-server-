import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
  const body = await req.json();
  const { fullName, phone, paymentMethod, products, totalAmount } = body;

  const { data, error } = await supabase
    .from('orders')
    .insert([{
      full_name: fullName,
      phone: phone,
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

  return NextResponse.json({ success: true, data }, { status: 201 });
}

export async function GET() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}