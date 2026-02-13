import { del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

// DELETE - Remove a memory
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!token) {
      return NextResponse.json(
        { error: "Blob storage not configured. Please set BLOB_READ_WRITE_TOKEN in your environment variables." },
        { status: 500 }
      );
    }

    const { id } = await params;
    
    // Extract the blob URL from the request or construct it
    const url = request.nextUrl.searchParams.get("url");
    
    if (!url) {
      return NextResponse.json(
        { error: "URL parameter is required" },
        { status: 400 }
      );
    }

    // Delete from Vercel Blob Storage
    await del(url);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting memory:", error);
    return NextResponse.json(
      { error: "Failed to delete memory" },
      { status: 500 }
    );
  }
}

