import React from "react";
import {
  FaGift,
  FaRegStar,
  FaPaintBrush,
  FaRulerCombined,
  FaRegLightbulb,
} from "react-icons/fa";

const ProductDetailsKashmiri: React.FC = () => {
  const productData = {
    name: "Kashmiri Hand Embroidery",
    description:
      "Crafted from the finest Merino wool, this exquisite shawl offers a soft, luxurious feel that drapes elegantly over any outfit. Perfect for chilly evenings or as a statement piece for special occasions.",
    price: 5999.99,
    dimensions: { length: "200 cm", breadth: "100 cm" },
    embroideryType: "Tilla Embroidery",
    colorOptions: ["Black", "Maroon", "Ivory"],
    occasions: ["Weddings", "Festivals", "Casual Wear"],
  };

  const {
    name,
    description,
    price,
    dimensions,
    embroideryType,
    colorOptions,
    occasions,
  } = productData;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white  rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{name}</h2>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Details */}
        <div className="space-y-4">
          <div className="flex items-center text-gray-600">
            <FaRegStar size={20} className="mr-2" />
            <span>Embroidery Type: {embroideryType}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaRulerCombined size={20} className="mr-2" />
            <span>
              Dimensions: {dimensions.length} x {dimensions.breadth}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaPaintBrush size={20} className="mr-2" />
            <span>Color Options: {colorOptions.join(", ")}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaRegLightbulb size={20} className="mr-2" />
            <span>Occasions: {occasions.join(", ")}</span>
          </div>
        </div>
      </div>

      {/* Additional Features */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Why Choose This Product?
        </h3>
        <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600">
          <li>
            <FaGift size={20} className="inline-block mr-2 text-green-500" />{" "}
            Ideal gift for loved ones
          </li>
          <li>
            <FaRegStar
              size={20}
              className="inline-block mr-2 text-yellow-500"
            />{" "}
            Handcrafted with intricate designs
          </li>
          <li>
            <FaPaintBrush
              size={20}
              className="inline-block mr-2 text-indigo-500"
            />{" "}
            Available in vibrant colors
          </li>
          <li>
            <FaRulerCombined
              size={20}
              className="inline-block mr-2 text-gray-500"
            />{" "}
            Comfortable dimensions for wearability
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailsKashmiri;
