import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const stripe = await new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { title, price, bookId, userId } = await request.json();
  // console.log(title, price);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        bookId: bookId,
      },
      client_reference_id: userId,
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: title,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });
    return NextResponse.json({ checkout_url: session.url });
  } catch (err: unknown) {
    // return NextResponse.json(err.message);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    }
    return NextResponse.json({ error: "An unknown error occurred" });
  }
}
