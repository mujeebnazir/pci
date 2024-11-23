"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductService from "@/lib/product";
import CreateCategory from "../category/main";
import useCategories from "@/hooks/useCategories";
import { toast } from "react-hot-toast";

enum Size {
  SM = "SM",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  sizesAvailable: Size[];
  itemsCount: number;
  category: string;
  images: string[];
  createdAt?: string;
}

const CreateProduct = () => {
  const [productData, setProductData] = useState<
    Omit<Product, "id" | "createdAt" | "images">
  >({
    name: "",
    description: "",
    price: 0,
    category: "",
    itemsCount: 0,
    sizesAvailable: [],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [sizeInput, setSizeInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { categories } = useCategories();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "itemsCount" ? Number(value) : value,
    }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizeInput(e.target.value.toUpperCase());
  };

  const addSize = () => {
    if (
      sizeInput in Size &&
      !productData.sizesAvailable.includes(sizeInput as Size)
    ) {
      setProductData((prev) => ({
        ...prev,
        sizesAvailable: [...prev.sizesAvailable, sizeInput as Size],
      }));
      setSizeInput("");
    } else {
      toast.error(
        "Invalid size! Please enter a valid size (SM, M, L, XL, XXL)"
      );
    }
  };

  const removeSize = (size: Size) => {
    setProductData((prev) => ({
      ...prev,
      sizesAvailable: prev.sizesAvailable.filter((s) => s !== size),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, description, price, category, sizesAvailable } = productData;
    const itemsCount = productData.itemsCount;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      itemsCount <= 0 ||
      sizesAvailable.length === 0
    ) {
      toast.error(
        "All fields are required, and at least one size must be added."
      );
      return;
    }

    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    const productDataWithItemsCount = {
      name,
      description,
      price,
      category,
      itemsCount,
      sizesAvailable,
    };
    setLoading(true);
    try {
      const response = await ProductService.postProduct(
        productDataWithItemsCount,
        imageFiles
      );
      toast.success("Product created successfully!");
      console.log(response);

      setProductData({
        name: "",
        description: "",
        price: 0,
        category: "",
        itemsCount: 0,
        sizesAvailable: [],
      });
      setImageFiles([]);
      setLoading(false);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-200 to-slate-300 min-h-screen flex items-center justify-center p-3 rounded-lg ">
      <div className="bg-white shadow-xl rounded-lg flex flex-col lg:flex-row w-full  overflow-hidden">
        {/* Product Form */}
        <div className="flex flex-col lg:w-2/3 p-6 md:p-10 border-r border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create Your Product
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </div>
            <div>
              <Label htmlFor="description">Product Description</Label>
              <Textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  name="price"
                  type="number"
                  value={productData.price || ""}
                  onChange={handleChange}
                  placeholder="Enter price"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value: any) =>
                    handleChange({ target: { name: "category", value } } as any)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories && categories.length > 0 ? (
                        categories.map((category) => (
                          <SelectItem key={category.$id} value={category.$id}>
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="loading" disabled>
                          Loading categories...
                        </SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="itemsCount">Item Count</Label>
              <Input
                name="itemsCount"
                type="number"
                value={productData.itemsCount || ""}
                onChange={handleChange}
                placeholder="Enter item count"
              />
            </div>
            <div>
              <Label htmlFor="sizesAvailable">Sizes Available</Label>
              <div className="flex gap-2">
                <Input
                  value={sizeInput}
                  onChange={handleSizeChange}
                  placeholder="Enter size (e.g., SM, M, L)"
                />
                <Button type="button" onClick={addSize}>
                  Add Size
                </Button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {productData.sizesAvailable.map((size, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-1"
                  >
                    {size}
                    <button
                      type="button"
                      onClick={() => removeSize(size)}
                      className="text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="image">Product Image</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full  text-white py-3 rounded-md shadow-md"
            >
              {loading ? "Creating..." : "Live Your Product"}
            </Button>
          </form>
        </div>

        {/* Category Form */}
        <div className="flex flex-col lg:w-1/3 p-3 bg-gray-100">
          <CreateCategory />
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
