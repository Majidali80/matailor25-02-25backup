'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ProductDetailPage() {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await fetch(`/api/products/${productId}`);
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <Image
            src={product.productImage.url}
            alt={product.title}
            width={500}
            height={500}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-lg text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600">${product.price}</p>

          {/* Available Sizes */}
          {product.shirtSizes && (
            <div>
              <h3 className="text-lg font-semibold">Available Sizes</h3>
              <ul className="flex gap-2">
                {product.shirtSizes.map((size: any, index: number) => (
                  <li key={index} className="px-3 py-1 bg-gray-200 rounded-md">{size.size}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Available Colors */}
          {product.colours && (
            <div>
              <h3 className="text-lg font-semibold">Available Colors</h3>
              <ul className="flex gap-2">
                {product.colours.map((color: string, index: number) => (
                  <li key={index} className="px-3 py-1 bg-gray-200 rounded-md">{color}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Inventory */}
          <p className="text-gray-600">{product.inventory > 0 ? `In Stock: ${product.inventory}` : 'Out of Stock'}</p>

          {/* Add to Cart Button */}
          <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
