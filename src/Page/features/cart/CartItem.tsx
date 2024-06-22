import React from "react";
import CartType from "src/interfaces/CartType";

type CartItemProps = {
  item: CartType;
  handleonClickShopping: () => void;
  handleRemoveItemClick: (id: number) => void;
  handleDecreaseQtyClick: (id: number) => void;
  handleIncreaseQtyClick: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  handleonClickShopping,
  handleRemoveItemClick,
  handleDecreaseQtyClick,
  handleIncreaseQtyClick,
}) => {
  return (
    <main className="flex items-center justify-center mt-2 ">
      <section className="flex flex-col sm:flex-row flex-wrap gap-2  w-full rounded-xl">
        <span className="lg:w-1/3 h-full sm:w-1/4 h-1/4  md:w-1/5 h-1/5  p-2">
          <img src={item.image} alt="cartItemimage" className="w-full h-full" />
        </span>
        <span className="grow mt-4 p-1">
          <div>
            <h3 className="text-start font-semibold text:l mt-4">
              {item.title}
            </h3>
            <p className="text-start font-semibold text:l mt-4">
              ${item.price}
            </p>
            <p className="text-gray-500 mt-4 text-start">
              Quantity: {item.quantity}
            </p>
          </div>
          <section className="flex gap-2 items-center justify-between px-3 m-2 mt-4">
            <button
              className="hover:cursor-pointer hover:bg-indigo-100 px-2 font-large text-4xl text-indigo-600 rounded flex items-center justify-center"
              onClick={() => handleDecreaseQtyClick(item.id)}
            >
              -
            </button>
            <button
              className="hover:cursor-pointer hover:bg-indigo-100 text-indigo-600 text-4xl px-2 rounded flex items-center justify-center"
              onClick={() => handleIncreaseQtyClick(item.id)}
            >
              +
            </button>
          </section>
          <div className="flex justify-center mt-4 self-end">
            <button
              type="button"
              className="font-medium text-red-300 bg-red-200 w-full rounded-l hover:text-red-600 p-1 "
              onClick={() => handleRemoveItemClick(item.id)}
            >
              Remove
            </button>
          </div>
        </span>
      </section>
    </main>
  );
};

export default CartItem;
