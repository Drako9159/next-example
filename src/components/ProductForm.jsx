"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });

  const [file, setFile] = useState(null);
  const router = useRouter();
  const form = useRef(null);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      axios.get(`/api/products/${params.id}`).then((res) => {
        setProduct({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
        });
      });
    }
  }, []);

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    if (file) {
      formData.append("image", file);
    }
    if (!params.id) {
      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } else {
      const response = await axios.put(`/api/products/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    }

    form.current.reset();
    router.refresh();
    router.push("/products");
    router.refresh();
  }

  return (
    <div className="flex ">
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
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
          autoFocus
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
          placeholder="00.00"
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

        <label
          htmlFor="productImage"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Image:
        </label>
        <input
          type="file"
          className="shadow appearance-none text-gray-700 border rounded w-full py-2 px-3 mb-2"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

        {file && (
          <img
            className="w-96 object-contain mx-auto my-4"
            src={URL.createObjectURL(file)}
            alt="image-preview"
          />
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {params.id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}
