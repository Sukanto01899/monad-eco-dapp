import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import aiVerification from "@/lib/utils/verifyViaAi";
import { parseAiResponse } from "@/lib/utils/aiResponseParse";
import { sendReward } from "@/lib/utils/saveDataOnBlockchain";
import dbConnect from "@/lib/config/dbConnect";
import User from "@/model/User";

export async function POST(request: NextRequest) {
  const userHeader = request.headers.get("x-user");
  if (!userHeader)
    return NextResponse.json(
      { error: "Unauthorized", isSuccess: false },
      { status: 401 }
    );

  // Parse the incoming form data
  const formData = await request.formData();
  const file = formData.get("image") as File | null;
  if (!file) {
    return NextResponse.json(
      { error: "No image file found", isSuccess: false },
      { status: 400 }
    );
  }
  // Try catch block to handle file saving and AI verification
  try {
    await dbConnect();
    const { userId } = JSON.parse(userHeader);

    const verifyProof = await aiVerification(file);
    if (!verifyProof) {
      return NextResponse.json(
        { error: "No proof available", isSuccess: false },
        { status: 400 }
      );
    }

    const aiResponse = parseAiResponse(verifyProof); // Parse the AI response
    if (!aiResponse?.is_recycle) {
      return NextResponse.json(
        { error: "No proof available", isSuccess: false },
        { status: 400 }
      );
    }

    if (aiResponse?.is_recycle === "yes") {
      const user = await User.findOne({ userId });
      if (!user || !user.smart_address) {
        return NextResponse.json(
          {
            error: "User not found or smart address missing",
            isSuccess: false,
          },
          { status: 400 }
        );
      }
      const hash = await sendReward(user.smart_address);
      console.log("Reward tx hash: ", hash);
      return NextResponse.json(
        { message: aiResponse, hash: hash, isSuccess: true },
        { status: 200 }
      );
    }
    if (aiResponse?.is_recycle === "no") {
      return NextResponse.json(
        {
          message: aiResponse,
          hash: null,
          isSuccess: false,
          error: "You are not recycling!",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Could not verify image", isSuccess: false },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json(
      { error: "Failed verify image!", isSuccess: false },
      { status: 500 }
    );
  }
}
