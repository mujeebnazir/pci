import React from "react";
import { useCartStore } from "../../zustand/cart";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
type CartItemData = {
  id: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
};

type CartItemProps = {
  item: CartItemData;
  onRemove: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  const removeCartItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.onIncrease);
  const decreaseQuantity = useCartStore((state) => state.onDecrease);

  return (
    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-md">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1 px-4">
        <h4 className="text-lg font-semibold">{item.name}</h4>
        <p className="text-sm text-gray-500">Size: {item.size}</p>
        <p className="text-sm text-gray-500">Color: {item.color}</p>
        <p className="text-md font-semibold">${item.price}</p>
      </div>
      <div className="flex items-center space-x-2 bg-slate-400 rounded-2xl shadow px-4 py-2">
        <button
          onClick={() => decreaseQuantity(item.id)}
          className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-400 transition"
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => increaseQuantity(item.id)}
          className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-400 transition"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeCartItem(item.id)}
        className="text-red-500 ml-4 hover:text-red-800 transition"
      >
        <MdOutlineRemoveShoppingCart size={24} />
      </button>
    </div>
  );
};

export default CartItem;
