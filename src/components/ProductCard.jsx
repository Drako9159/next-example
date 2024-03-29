"use client";

import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded-lg text-gray-700 border-gray-800 mb-3 hover:bg-gray-100 hover:cursor-pointer"
    >
      {product.image && (
        <img src={product.image} className="w-full rounded-t-lg" alt="image-example" />
      )}
      <div className="p-4">
        <h1 className="text-l font-bold">{product.name}</h1>
        <h2 className="text-2xl text-slate-500">{product.price}</h2>
        <p>{product.description}</p>
      </div>
    </Link>
  );
}
