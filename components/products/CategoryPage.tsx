import React from "react";
import FiltersSidebar from "./FiltersSidesbar";
import Products from "../Products";

type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  discountedPrice: number;
  rating: number;
  size?: string;
  color?: string;
  quantity?: number;
  isOnSale: boolean;
  category?: string;
  subcategory?: string;
};

type CategoryPageProps = {
  filters?: {
    price: number;
    color: string;
    size: string;
  };
  applyFilter?: () => void;
  products: Product[];
};

const CategoryPage: React.FC<CategoryPageProps> = ({
  filters,
  applyFilter,
  products,
}) => (
  <div className="flex flex-col  gap-6 p-6">
    <FiltersSidebar filters={filters} applyFilter={applyFilter} />
    <Products products={products} />
  </div>
);

export default CategoryPage;
