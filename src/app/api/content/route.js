import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "content.json");

export async function GET() {
  try {
    const rawData = await fs.readFile(dataFilePath, "utf-8");
    const json = JSON.parse(rawData);
    return NextResponse.json(json);
  } catch (err) {
    console.error("Error reading content.json:", err);
    return NextResponse.json(
      { error: "Failed to read content" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const updatedContent = await request.json();
    if (!updatedContent || typeof updatedContent !== "object") {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    await fs.writeFile(dataFilePath, JSON.stringify(updatedContent, null, 2), "utf-8");
    return NextResponse.json({ success: true, message: "Content updated successfully" });
  } catch (err) {
    console.error("Error saving content.json:", err);
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    );
  }
}
