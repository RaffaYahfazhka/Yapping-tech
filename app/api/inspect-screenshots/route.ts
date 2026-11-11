import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "images", "screenshot");
    if (!fs.existsSync(dir)) {
      return NextResponse.json({ error: "Directory does not exist", dir });
    }
    const files = fs.readdirSync(dir);
    return NextResponse.json({ files });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

