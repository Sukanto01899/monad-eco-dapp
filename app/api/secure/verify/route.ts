import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import aiVerification from "@/lib/utils/verifyViaAi";
import { parseAiResponse } from "@/lib/utils/aiResponseParse";

export async function POST(request: NextRequest) {
  const userHeader = request.headers.get("x-user");
  if (!userHeader)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { userId } = JSON.parse(userHeader);
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    if (!file) {
      return NextResponse.json(
        { message: "No image file found" },
        { status: 400 }
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const verifyProof = await aiVerification(filePath);
    if (!verifyProof) {
      return NextResponse.json(
        { message: "No proof available" },
        { status: 400 }
      );
    }

    const aiResponse = parseAiResponse(verifyProof);
    console.log(aiResponse);

    return NextResponse.json(
      {
        message: "File saved successfully",
        fileName: fileName,
        filePath: `/uploads/${fileName}`,
        proof: aiResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json(
      { message: "Failed to upload image" },
      { status: 500 }
    );
  }
}
