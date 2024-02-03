import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM product WHERE id=?", [
      params.id,
    ]);
    if (result.length === 0) {
      return NextResponse.json(
        { message: "product_not_found" },
        { status: 404 }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM product WHERE id=?", [
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "product_not_found" },
        { status: 404 }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await conn.query("UPDATE product SET ? WHERE id = ?", [
      data,
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "product_not_found" },
        { status: 404 }
      );
    }
    const product = await conn.query("SELECT * FROM product WHERE id=?", [
      params.id,
    ]);

    return NextResponse.json(product[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
