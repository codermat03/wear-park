/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const category =
    typeof window !== "undefined"
      ? window.location.pathname.split("/").pop()
      : "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://server-wear-park.vercel.app/products"
        );
        const result = await response.json();
        if (result.success) {
          setProducts(result.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product: any) => product.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Products in {category}
        </h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product: any, index: number) => (
              <div key={index} className="border p-4 rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="object-cover mb-4 w-full h-40"
                  width={500}
                  height={500}
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">৳{product.price}</p>
                <p className="text-sm text-gray-400">{product.rating} ★</p>
                <Link
                  href={`/singleProduct/${product._id}?name=${
                    product.name
                  }&price=${product.price}&image=${encodeURIComponent(
                    product.image
                  )}&sizes=${encodeURIComponent(
                    JSON.stringify(["M", "L", "XL"])
                  )}&description=${encodeURIComponent(
                    JSON.stringify(product.description)
                  )}`}
                  className="text-black mt-4 block text-center py-2 px-6 bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  Buy Now
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
