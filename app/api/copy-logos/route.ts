import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const uploadDir = "/Users/raffayahfazhka/.gemini/antigravity/brain/51e9a279-d0ff-4810-a77a-9ede3793b4a1/.user_uploaded";
    const publicImagesDir = path.join(process.cwd(), "public", "images");

    const plivinSrc = path.join(uploadDir, "media_1794382656172_e3e64bbb.png");
    const clickcareSrc = path.join(uploadDir, "media_1794382656175_c92fe248.png");

    const plivinDest = path.join(publicImagesDir, "logo-plivin.png");
    const clickcareDest = path.join(publicImagesDir, "clickcare-logo.png");

    let plivinCopied = false;
    let clickcareCopied = false;

    if (fs.existsSync(plivinSrc)) {
      fs.copyFileSync(plivinSrc, plivinDest);
      plivinCopied = true;
    }

    if (fs.existsSync(clickcareSrc)) {
      fs.copyFileSync(clickcareSrc, clickcareDest);
      clickcareCopied = true;
    }

    return NextResponse.json({
      success: true,
      plivinCopied,
      clickcareCopied,
      publicImagesFiles: fs.readdirSync(publicImagesDir),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}

