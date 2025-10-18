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
    console.log(verifyProof);
    if (!verifyProof) {
      return NextResponse.json(
        { error: "No proof available", isSuccess: false },
        { status: 400 }
      );
    }

    const aiResponse = parseAiResponse(verifyProof); // Parse the AI response
    if (!aiResponse?.is_action && !aiResponse?.proof_status) {
      return NextResponse.json(
        { error: "No proof available", isSuccess: false },
        { status: 400 }
      );
    }
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
    const action = aiResponse?.is_action;
    if (
      action &&
      (action === "recycling" ||
        action === "tree_plantation" ||
        action === "public_transport")
    ) {
      const proofStatus = aiResponse.proof_status;
      let hash;
      if (proofStatus && proofStatus === "confirmed") {
        hash = await sendReward(user.smart_address, 3);
      } else if (proofStatus && proofStatus === "plausible") {
        hash = await sendReward(user.smart_address, 3);
      } else if (proofStatus && proofStatus === "unlikely") {
        hash = await sendReward(user.smart_address, 4);
      }
      return NextResponse.json(
        { message: aiResponse, hash: hash, isSuccess: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: aiResponse,
          hash: null,
          isSuccess: false,
          error: "Your image is not valid!",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json(
      { error: "Failed verify image!", isSuccess: false },
      { status: 500 }
    );
  }
}
