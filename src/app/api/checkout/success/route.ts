import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

//購入履歴の保存
export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  //sessionIdはbook/checkout-success（購入完了画面）を表示した時にurlにつけられるid
  const { sessionId } = await request.json();
  try {
    //sessionIdから情報を引っ張ってくる
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata?.bookId,
      },
    });
    if (existingPurchase === null) {
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata!.bookId,
        },
      });
      return NextResponse.json({ purchase });
    } else {
      return NextResponse.json({ message: "すでに購入済みです。" });
    }
  } catch (err) {
    return NextResponse.json(err);
  }
}
