// app/api/upload/route.ts

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const description = formData.get("description")?.toString() || "";
    const file = formData.get("image") as File | null;

    console.log("Description:", description);
    console.log("File:", file);

    // You can’t directly access file path or save it like with formidable,
    // but you can read the file content if needed:
    // const fileBuffer = await file?.arrayBuffer();

    return new Response(
      JSON.stringify({
        message: "Upload successful",
        description,
        fileName: file?.name || null,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

p0    return new Response(
      JSON.stringify({ error: "Upload failed", details: (err as Error).message }),
      { status: 500 }
    );
  }
}
