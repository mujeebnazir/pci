import React from "react";
import { useCartStore } from "../../zustand/cart";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import toast from "react-hot-toast";

interface Product {
  $id: string; // Unique identifier for the product
  id: string; // Unique identifier for the product
  name: string; // Name of the product
  description: string; // Product description
  images: string[]; // Array of image identifiers
  price: number; // Price of the product
  category: string; // Product category
  sizesAvailable: string[]; // Array of available sizes
}

interface CartItem {
  id?: string;
  cartId?: string; 
  product: Product; 
  quantity: number; 
}

type CartItemProps = {
  item: CartItem;
  onRemove: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}) => {
  const handleRemoveItem = async () => {
    console.log("item", item.id);

    onRemove(item.id as string);
    toast.success("Product removed from cart");
  };
  return (
    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-md">
      <img
        src={item.product.images[0]}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1 px-4">
        <h4 className="text-lg font-semibold">{item.product.name}</h4>
        <p className="text-sm text-gray-500">Size: {""}</p>
        <p className="text-sm text-gray-500">Color: {"item.color"}</p>
        <p className="text-md font-semibold">${item.product.price}</p>
      </div>
      <div className="flex items-center space-x-2 bg-slate-400 rounded-2xl shadow px-4 py-2">
        <button
          onClick={() => onDecrease(item.id || "")}
          className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-400 transition"
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => onIncrease(item.id || "")}
          className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-400 transition"
        >
          +
        </button>
      </div>
      <button
        onClick={(event) => onRemove(item.id || "")}
        className="text-red-500 ml-4 hover:text-red-800 transition"
      >
        <MdOutlineRemoveShoppingCart size={24} />
      </button>
    </div>
  );
};

export default CartItem;
