import dbConnect from "@/lib/config/dbConnect";
import { claimRewardsDelegationRedeem } from "@/lib/utils/redeemDelegation";
import User from "@/model/User";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const userHeader = request.headers.get("x-user");
  if (!userHeader) {
    return NextResponse.json(
      { error: "Unauthorized", isSuccess: false },
      { status: 401 }
    );
  }
  try {
    await dbConnect();
    const { userId } = JSON.parse(userHeader);
    const user = await User.findOne({ userId });
    if (!user || !user.signDelegation) {
      return NextResponse.json(
        { error: "User or signed delegation not found", isSuccess: false },
        { status: 404 }
      );
    }
    const transactionHash = await claimRewardsDelegationRedeem(
      user.signDelegation
    );
    return NextResponse.json(
      { transactionHash, isSuccess: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /unstake:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
};
