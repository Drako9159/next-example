"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function Buttons({ productId }) {
  const router = useRouter();

  async function handleDelete() {
    if (confirm("are you sure you want to delete this product?")) {
      const response = await axios.delete(
        `http://localhost:3000/api/products/${productId}`
      );
      if (response.status == 204) {
        router.push("/");
        router.refresh();
      }
    }
  }

  function handleUpdate() {
    router.push(`/products/edit/${productId}`);
  }

  return (
    <div className="flex gap-x-2 justify-end mt-2">
      <button
        className=" text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
        onClick={handleDelete}
      >
        delete
      </button>
      <button
        className=" text-white bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded"
        onClick={handleUpdate}
      >
        edit
      </button>
    </div>
  );
}
