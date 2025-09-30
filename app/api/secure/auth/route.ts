import { saveUser } from "@/lib/utils/saveDataOnBlockchain";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const userHeader = request.headers.get("x-user");
  if (!userHeader)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); // 💡 FIX: Return a proper response

  try {
    console.log(request);
    const user = JSON.parse(userHeader);
    const { smartAddress } = await request.json();
    if (!smartAddress) {
      return NextResponse.json(
        { error: "Missing smart address" },
        { status: 400 }
      );
    }
    const { userId } = user;
    const hash = await saveUser([userId, "name", "", smartAddress, "0x"]);

    if (!hash) {
      return NextResponse.json(
        { error: "Transaction failed!" },
        { status: 500 }
      );
    }
    return NextResponse.json({ status: 201, hash, user: userId });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
};
