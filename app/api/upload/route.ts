// app/api/upload/route.ts

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();

    const description = formData.get("description");
    const file = formData.get("image");

    if (typeof description !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid description format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const fileName = file && file instanceof File ? file.name : null;

    console.log("📝 Description:", description);
    console.log("🖼️ File:", fileName);

    return new Response(
      JSON.stringify({
        message: "Upload successful",
        description,
        fileName,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("❌ Upload error:", err);

    return new Response(
      JSON.stringify({
        error: "Upload failed",
        details: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
