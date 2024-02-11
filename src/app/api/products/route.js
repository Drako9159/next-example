import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

export async function GET() {
  try {
    const result = await conn.query("SELECT * FROM product");
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("image");

    if (!image) {
      return NextResponse.json(
        {
          message: "Image is required",
        },
        { status: 400 }
      );
    }
    const filePath = await processImage(image);

    const response = await cloudinary.uploader.upload(filePath);

    if (response) {
      await unlink(filePath);
    }

    const result = await conn.query("INSERT INTO product SET ?", {
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      image: response.secure_url,
    });

    return NextResponse.json({
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      id: result.insertId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
