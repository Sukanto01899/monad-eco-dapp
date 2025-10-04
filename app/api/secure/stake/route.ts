import dbConnect from "@/lib/config/dbConnect";
import stakeDelegationRedeem from "@/lib/utils/redeemDelegation";
import User from "@/model/User";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const userHeader = request.headers.get("x-user");
  if (!userHeader) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    await dbConnect();
    const { userId } = JSON.parse(userHeader);
    const user = await User.findOne({ userId });
    const { amount } = await request.json();
    if (!user || !user.signDelegation) {
      return NextResponse.json(
        { error: "User or signed delegation not found" },
        { status: 404 }
      );
    }
    const transactionHash = await stakeDelegationRedeem(
      amount,
      user.signDelegation
    );
    return NextResponse.json(
      { transactionHash, isSuccess: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /stake:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
};
