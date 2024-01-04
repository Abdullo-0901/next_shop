"use client";
import CoustomImages from "@/components/images";
import { ProductType } from "@/interfaces";
import { Dialog } from "@headlessui/react";
// import { StarIcon as StartIconOutline } from "@heroicons/react/24/outline";
// import { StarIcon } from "@heroicons/react/24/solid";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
const ProductDetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductType>();
  const router = useRouter();
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await response.json();
      setProduct(product);
      setLoading(false);
    }
    getData();
  }, [id]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false), router.push("/");
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-scroll ">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className={"mx-auto max-w-3xl bg-white p-10"}>
            {loading ? (
              <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin"></div>
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full ">
                    <CoustomImages product={product} />
                  </div>
                )}
                <div className="flex flex-1 flex-col">
                  <div className="flex-1">
                    <h1 className="font-semibold">{product?.title}</h1>
                    <p className="font-medium text-sm">${product?.price}</p>
                    <div className="flex items-center text-sm my-4">
                      <p>{product?.rating.rate}</p>
                      {product?.rating.rate && (
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

                          <ReactStars size={22} value={product.rating.rate} />
                        </div>
                      )}
                      <p className="text-blue-600 hover:underline cursor-pointer text-[18px] ">
                        See all {product?.rating.count} review
                      </p>
                    </div>
                    <p className="line-clamp-5 text-sm my-2">
                      {product?.description}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm ">
                    <button className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent  hover:text-black ">
                      Add to bag
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="button w-full bg-white  border-blue-600 hover:border-blue-600 hover:bg-blue-600  hover:text-white "
                    >
                      View full details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetailPage;
