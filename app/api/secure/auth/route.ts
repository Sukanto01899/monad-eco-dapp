import dbConnect from "@/lib/config/dbConnect";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const userHeader = request.headers.get("x-user");
  if (!userHeader)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); // 💡 FIX: Return a proper response

  try {
    await dbConnect();
    console.log(request);
    const user = JSON.parse(userHeader);
    const { smartAddress, signDelegation } = await request.json();
    if (!smartAddress) {
      return NextResponse.json(
        { error: "Missing smart address" },
        { status: 400 }
      );
    }
    const { userId } = user;
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists", isSuccess: false },
        { status: 409 }
      );
    }
    const saveUser = await User.create({
      userId,
      name: "EcoUser",
      smart_address: smartAddress,
      image: "",
      signDelegation,
    });

    return NextResponse.json(
      { user: saveUser, isSuccess: true },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  const userHeader = request.headers.get("x-user");
  if (!userHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const user = JSON.parse(userHeader);
    const { userId } = user;
    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found", isSuccess: false, user: null },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { user: existingUser, isSuccess: true },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Something went wrong!", isSuccess: false },
      { status: 500 }
    );
  }
};
