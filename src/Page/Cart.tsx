import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCartProducts,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "./features/cart/cartSlice";
import useFetch from "../hooks/useFecth";
import { AppDispatch, RootState } from "../reducers/store";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CartItem from "./features/cart/CartItem";
import CartType from "../interfaces/CartType";
import { motion } from "framer-motion";
import { container } from "./Products";

const itemstyle = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Cart() {
  const navigate = useNavigate();

  useFetch(fetchAllCartProducts, []);

  const { cartproducts, isLoading, error, total } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleIncreaseQtyClick = (productId: number) => {
    dispatch(increaseQuantity(Number(productId)));
  };

  const handleDecreaseQtyClick = (productId: number) => {
    dispatch(decreaseQuantity(Number(productId)));
  };

  const handleRemoveItemClick = (productId: number) => {
    dispatch(removeItem(Number(productId)));
  };

  const handleonClickShopping = () => {
    navigate("/products");
  };

  const memoizedhandleonClickShopping = useCallback(handleonClickShopping, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="grid items-center justify-center p-2">
      <p className="font-semibold text-3xl mb-3">
        Total Cart Items:{cartproducts.length}
      </p>
      <motion.ul
        className="container"
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ width: "100%", border: "1px solid whitesmoke" }}
      >
        {cartproducts.map((item: CartType) => {
          return (
            <motion.li key={item.id} className="item" variants={itemstyle}>
              <CartItem
                item={item}
                handleRemoveItemClick={handleRemoveItemClick}
                handleonClickShopping={memoizedhandleonClickShopping}
                handleDecreaseQtyClick={handleDecreaseQtyClick}
                handleIncreaseQtyClick={handleIncreaseQtyClick}
              />
            </motion.li>
          );
        })}
      </motion.ul>
      <div className="border border-gray-200 px-1 py-1 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${total.toFixed(2)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <a
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </a>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={memoizedhandleonClickShopping}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
