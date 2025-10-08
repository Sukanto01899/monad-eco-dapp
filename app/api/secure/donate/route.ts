import dbConnect from "@/lib/config/dbConnect";
import Donate from "@/model/Donate";
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
    const { token, address, signDelegation, amount } = await request.json();

    if (!token || !address || !signDelegation || !amount) {
      return NextResponse.json(
        { error: "Input data missing", isSuccess: false },
        { status: 404 }
      );
    }

    const donate = await Donate.create({
      userId,
      token,
      token_address: address,
      max_amount: amount,
      signDelegation,
    });

    return NextResponse.json(
      { user: donate, isSuccess: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /donate:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
};

export const GET = async (request: Request) => {
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
    const donations = await Donate.find({ userId }).limit(5);
    return NextResponse.json({ donations, isSuccess: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
};
