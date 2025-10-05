import dbConnect from "@/lib/config/dbConnect";
import { sendReward } from "@/lib/utils/saveDataOnBlockchain";
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
    if (!user || !user.smart_address) {
      return NextResponse.json(
        { error: "User or signed delegation not found", isSuccess: false },
        { status: 404 }
      );
    }
    const transactionHash = await sendReward(user.smart_address, 4);
    return NextResponse.json(
      { transactionHash, isSuccess: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!", isSuccess: false },
      { status: 500 }
    );
  }
};
