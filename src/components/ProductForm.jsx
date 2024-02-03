"use client";
import { useState } from "react";
import axios from "axios";

export default function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.post("/api/products", product)
    console.log(response)
  }

  return (
    <form
      className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="name"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Product Name
      </label>
      <input
        type="text"
        placeholder="name"
        name="name"
        onChange={handleChange}
        value={product.name}
        className="shadow appearance-none text-gray-700 border rounded w-full py-2 px-3"
      />

      <label
        htmlFor="price"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Product Price:
      </label>
      <input
        type="text"
        placeholder="price"
        name="price"
        onChange={handleChange}
        value={product.price}
        className="shadow appearance-none text-gray-700 border rounded w-full py-2 px-3"
      />

      <label
        htmlFor="description"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Product Description:
      </label>
      <textarea
        type="text"
        rows={3}
        name="description"
        onChange={handleChange}
        value={product.description}
        className="shadow appearance-none text-gray-700 border rounded w-full py-2 px-3 "
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save product
      </button>
    </form>
  );
}
