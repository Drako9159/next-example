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
    <section className="flex justify-center items-center text-gray-700 h-[calc(100vh-10rem)]">
      <div className="flex w-4/6 h-2/6 justify-center">
        <div className="p-6 bg-white w-1/3">
          <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
          <h4 className="text-4xl font-bold">{product.price}$</h4>
          <p className="text-slate-700">Description: {product.description}</p>
          <Buttons productId={product.id} />
        </div>
        <img src={product.image} className="w-1/3" alt="image-example" />
      </div>
    </section>
  );
}
