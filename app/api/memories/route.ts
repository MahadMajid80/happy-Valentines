import { put, list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch all memories
export async function GET() {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!token) {
      console.warn("BLOB_READ_WRITE_TOKEN not set. Returning empty memories.");
      return NextResponse.json({ memories: [] });
    }

    const { blobs } = await list({
      prefix: "memories/",
    });

    const memories = blobs.map((blob, index) => ({
      id: index + 1,
      src: blob.url,
      alt: `Memory ${index + 1}`,
      caption: "Our beautiful memory",
    }));

    return NextResponse.json({ memories });
  } catch (error) {
    console.error("Error fetching memories:", error);
    return NextResponse.json(
      { error: "Failed to fetch memories" },
      { status: 500 }
    );
  }
}

// POST - Upload a new memory
export async function POST(request: NextRequest) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!token) {
      return NextResponse.json(
        { error: "Blob storage not configured. Please set BLOB_READ_WRITE_TOKEN in your environment variables." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `memories/memory-${timestamp}.${file.name.split(".").pop()}`;

    // Upload to Vercel Blob Storage
    const { url } = await put(filename, file, {
      access: "public",
      contentType: file.type,
    });

    return NextResponse.json({
      success: true,
      memory: {
        id: timestamp,
        src: url,
        alt: `Memory ${timestamp}`,
        caption: "Our beautiful memory",
      },
    });
  } catch (error) {
    console.error("Error uploading memory:", error);
    return NextResponse.json(
      { error: "Failed to upload memory" },
      { status: 500 }
    );
  }
}

