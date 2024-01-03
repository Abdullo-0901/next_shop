"use client";
import { ProductType } from "@/interfaces";
import Image from "next/image";
import React, { FC } from "react";
import CoustomImages from "./images";
import Link from "next/link";

// eslint-disable-next-line @next/next/no-async-client-component
const Product: FC<{ product: ProductType }> = async ({ product }) => {
  console.log(product);

  return (
    <Link
      href={`product/${product.id}`}
      className=" h-96 flex flex-col p-6 rounded-lg border group hover:scale-105 transition-transform ease-in-out duration-200"
    >
      <div className="relative max-h-80 flex-1 mb-5">
        <CoustomImages product={product} />
      </div>
      <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
        {product.category}
      </h3>
      <div className="font-semibold flex items-center justify-between mt-4 mb-1 ">
        <h2 className="w-44  truncate">{product.title}</h2>
        <p>${product.price}</p>
      </div>
      <p className="leading-relaxed text-base line-clamp-2">
        {product.description}
      </p>
    </Link>
  );
};

export default Product;
