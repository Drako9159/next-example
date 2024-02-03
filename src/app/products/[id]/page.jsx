import axios from "axios";
import Buttons from "./Buttons";

async function loadProduct(productId) {
  const { data } = await axios.get(
    `http://localhost:3000/api/products/${productId}`
  );
  return data;
}

export default async function ProductPage({ params }) {
  const product = await loadProduct(params.id);

  return (
    <section className="flex justify-center items-center text-gray-700">
      <div className="p-6 bg-white">
        <p>Name: {product.name}</p>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>

        <Buttons productId={product.id} />
      </div>
    </section>
  );
}
