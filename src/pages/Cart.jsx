import React, { useContext } from "react";
import { CourseProvider } from "../context/CourseContext";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CourseProvider);

  const cartItems = cart || [];

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.cPrice),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Your Cart is Empty
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">My Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="mb-4 flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.cImg}
              alt={item.cName}
              className="h-20 w-20 object-contain"
            />

            <div>
              <h2 className="font-bold">{item.cName}</h2>
              <p className="text-sm text-gray-500">{item.cTrainer}</p>
              <p className="font-semibold text-green-600">₹{item.cPrice}</p>
            </div>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 flex justify-between border-t pt-4">
        <h2 className="text-xl font-bold">Total</h2>
        <h2 className="text-2xl font-bold text-blue-600">₹{total}</h2>
      </div>
    </div>
  );
};

export default Cart;