"use client";

import CoustomImages from "@/components/images";
import { ProductType } from "@/interfaces";
import Link from "next/link";
import React, { useEffect } from "react";
import ReactStars from "react-stars";
import { toast } from "react-toastify";

const ShopingCart = () => {
  const [total, setTotal] = React.useState<number>(0);
  const [products, setProducts] = React.useState<ProductType[]>(
    JSON.parse(localStorage.getItem("carts") as string) || []
  );

  const removeProduct = (id: number) => {
    const updateCart = products.filter((product) => product.id !== id);
    localStorage.setItem("carts", JSON.stringify(updateCart));
    setProducts(updateCart);
  };
  const handleIncrement = (id: number) => {
    const updateCart = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    localStorage.setItem("carts", JSON.stringify(updateCart));
    setProducts(updateCart);
  };
  const handleDecrement = (id: number) => {
    const existProduct = products.find((product) => product.id === id);
    if (existProduct?.quantity == 1) {
      removeProduct(id);
      toast(`Remove this product`);
    } else {
      const updateCart = products.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
      localStorage.setItem("carts", JSON.stringify(updateCart));
      setProducts(updateCart);
    }
  };
  useEffect(() => {
    const total = products.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
    setTotal(total);
  }, [products]);
  return (
    <>
      {products.length ? (
        <div className="h-[100vh] bg-gray-100 pt-28">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {products.map((c) => {
                return (
                  <div
                    key={c.id}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <div className="relative w-52">
                      <CoustomImages product={c} fill />
                    </div>
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                          {c.title}
                        </h2>
                        <p className="mt-1 text-sm text-gray-700 line-clamp-2">
                          {c?.description}
                        </p>

                        <div className="flex items-center text-sm my-4">
                          <p>{c?.rating.rate}</p>
                          {c?.rating.rate && (
                            <div className="flex items-center ml-2 mr-6">
                              {/* {Array.from(
                            { length: Math.floor(product.rating.rate) },
                            (_, i) => (
                              <StarIcon
                                key={i}
                                className="text-yellow-400 h-4 w-4"
                              />
                            )
                          )}
                          {Array.from(
                            { length: 5 - Math.floor(product.rating.rate) },
                            (_, i) => (
                              <StartIconOutline
                                key={i}
                                className="text-yellow-400 h-4 w-4 "
                              />
                            )
                          )} */}

                              <ReactStars size={22} value={c.rating.rate} />
                            </div>
                          )}
                          <p className="text-blue-600 hover:underline cursor-pointer text-[16px] ">
                            See all {c?.rating.count} review
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span
                            onClick={() => handleDecrement(c.id)}
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            -{" "}
                          </span>
                          <input
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={c.quantity}
                            min="1"
                          />
                          <span
                            onClick={() => handleIncrement(c.id)}
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">
                            {" "}
                            {(c.price * c.quantity).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            onClick={() => removeProduct(c.id)}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">
                  {" "}
                  {(10).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    {(total + total * 0.1).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-4 font-medium *: text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
          <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
            <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300"></p>
            <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
              Shoping Card is empty
            </p>
            <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">
              Sorry, the page you are looking for could not be found.
            </p>
            <a
              href="#"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
              title="Return Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <Link href={"/products"}>Return Home</Link>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopingCart;
