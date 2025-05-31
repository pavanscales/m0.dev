// app/api/upload/route.ts

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();

    const description = formData.get("description");
    const file = formData.get("image");

    if (typeof description !== "string") {
      return Response.json({ error: "Invalid description format" }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return Response.json({ error: "Invalid or missing file" }, { status: 400 });
    }

    console.log("📝 Description:", description);
    console.log("🖼️ File:", file.name);

    return Response.json({
      message: "Upload successful",
      description,
      fileName: file.name,
    });
  } catch (err) {
    console.error("❌ Upload error:", err);
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: "Upload failed", details: errorMsg }, { status: 500 });
  }
}
