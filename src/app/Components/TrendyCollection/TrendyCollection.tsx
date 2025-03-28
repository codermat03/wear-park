"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface Product {
  _id: string;
  name: string;
  base?: string;
  price: string;
  rating: number;
  image: string;
  isOnSale: boolean;
  description?: string;
}

const TrendyCollection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://server-wear-park.vercel.app/products");
        const result = await res.json();

        if (result.success && result.data.products) {
          setProducts(result.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const goToProductDetails = (product: Product) => {
    const query = new URLSearchParams({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description || "No description",
    }).toString();

    router.push(`/singleProduct/${product._id}?${query}`);
  };

  return (
    <section className="md:py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-start">
          Choose Your Products
        </h2>
        <p className="text-gray-600 mb-8 text-start">
          Discover the latest ready-to-wear dresses.
        </p>
        <div className="grid justify-end pr-5 text-xl font-semibold">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => router.push("/allProducts")}
          >
            View More
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <div
              key={product._id}
              className="group relative p-4 bg-white rounded-md"
            >
              <div className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10"></div>

                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full md:h-[360px] object-cover transition-transform duration-300 group-hover:scale-105 rounded-md h-[300px] mx-auto"
                  width={500}
                  height={750}
                />

                {product.isOnSale && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-20">
                    Sale
                  </span>
                )}
              </div>

              <div className="mt-4 text-center">
                <h4 className="text-sm text-gray-500 font-medium">
                  {product.base}
                </h4>
                <h3 className="text-lg font-semibold">{product.name}</h3>

                <div className="flex justify-center items-center mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(product.rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>

                <p className="text-gray-500 text-sm mt-2">{product.price}</p>
              </div>

              <div className="absolute bottom-40 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button
                  onClick={() => goToProductDetails(product)}
                  className="w-[80%] bg-white text-black px-6 py-2 text-sm font-semibold border-t border-gray-200"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendyCollection;
