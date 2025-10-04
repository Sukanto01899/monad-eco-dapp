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
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Parse the incoming form data
  const formData = await request.formData();
  const file = formData.get("image") as File | null;
  if (!file) {
    return NextResponse.json(
      { message: "No image file found" },
      { status: 400 }
    );
  }
  const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  // Try catch block to handle file saving and AI verification
  try {
    await dbConnect();
    const { userId } = JSON.parse(userHeader);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const verifyProof = await aiVerification(filePath);
    if (!verifyProof) {
      return NextResponse.json(
        { message: "No proof available" },
        { status: 400 }
      );
    }

    const aiResponse = parseAiResponse(verifyProof); // Parse the AI response
    if (!aiResponse?.is_recycle) {
      return NextResponse.json(
        { message: "No proof available" },
        { status: 400 }
      );
    }

    if (aiResponse?.is_recycle === "yes") {
      const user = await User.findOne({ userId });
      if (!user || !user.smart_address) {
        return NextResponse.json(
          { message: "User not found or smart address missing" },
          { status: 400 }
        );
      }
      const hash = await sendReward(user.smart_address);
      console.log("Reward tx hash: ", hash);
      return NextResponse.json(
        { message: aiResponse, hash: hash },
        { status: 200 }
      );
    }
    if (aiResponse?.is_recycle === "no") {
      return NextResponse.json(
        { message: aiResponse, hash: null },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Could not verify image" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json(
      { message: "Failed verify image!" },
      { status: 500 }
    );
  } finally {
    // Clean up the uploaded file
    await unlink(path.join(uploadDir, fileName));
    console.log("Temporary file deleted:", fileName);
  }
}
