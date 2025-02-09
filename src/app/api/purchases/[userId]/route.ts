import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
//購入履歴検索API
export async function GET(request: Request) {
  const userId = request.url.split("purchases/")[1];
  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
      },
    });
    if (!purchases || purchases.length === 0) {
      return NextResponse.json([]); // 空の配列を返す
    }
    return NextResponse.json(purchases);
  } catch (err) {
    return NextResponse.json(err);
  }
}
