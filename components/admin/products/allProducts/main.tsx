import React, { useState, useMemo, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useProducts from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductService from "@/lib/product";
import { toast } from "react-hot-toast";
import DeleteModal from "./DeleteModel";
import UpdateModal from "./UpdateModel";

const AllProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null
  );
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productToUpdate, setProductToUpdate] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch products using the custom hook
  const { products, loadingProducts, error, setProducts, totalProducts } =
    useProducts({ currentPage, pageSize });

  // Calculate total pages based on total products and page size
  const totalPages = useMemo(
    () => Math.ceil(totalProducts / pageSize),
    [totalProducts, pageSize]
  );

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    setDeletingProductId(productToDelete);
    try {
      await ProductService.deleteProduct(productToDelete);
      toast.success("Product deleted successfully");
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productToDelete)
      );
    } catch {
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setDeletingProductId(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!productToUpdate) {
      toast.error("No product selected for update.");
      return;
    }

    try {
      // Validate sizesAvailable
      const allowedSizes = ["L", "XL", "M", "SM", "XXL"];
      const sanitizedSizes = productToUpdate.sizesAvailable.filter(
        (size: any) => allowedSizes.includes(size.toUpperCase())
      );

      if (sanitizedSizes.length !== productToUpdate.sizesAvailable.length) {
        toast.error(
          `Invalid sizes detected. Allowed sizes are: ${allowedSizes.join(
            ", "
          )}.`
        );
        return;
      }

      productToUpdate.sizesAvailable = sanitizedSizes.map((size: any) =>
        size.toUpperCase()
      );

      const updatedProduct = await ProductService.updateProduct(
        productToUpdate.id,
        productToUpdate
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );

      toast.success("Product updated successfully!");
      setIsUpdateModalOpen(false);
    } catch {
      toast.error("Failed to update product. Please try again.");
    }
  };

  const handlePageChange = (direction: "prev" | "next") => {
    setCurrentPage((prevPage) =>
      direction === "prev"
        ? Math.max(prevPage - 1, 1)
        : Math.min(prevPage + 1, totalPages)
    );
  };

  return (
    <div className="bg-gray-100 text-black py-5">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            <span className="bg-gradient-to-r from-gray-400 to-gray-950 text-transparent bg-clip-text">
              Manage Your Products
            </span>
          </h1>
          <p className="mt-2 text-sm sm:text-lg text-gray-600">
            Keep your inventory updated and organized.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search by name or category"
            className="w-full px-4 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-y-auto hide-scrollbar h-[50vh]">
          <Table className="min-w-full border border-gray-300 p-4">
            <TableCaption>
              A list of all products in your inventory.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Sizes</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingProducts ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    <p className="text-gray-500 font-medium text-lg">
                      Loading products...
                    </p>
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    <p className="text-gray-500 font-medium text-lg">
                      No products found.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>
                      {product.sizesAvailable?.join(", ") || "N/A"}
                    </TableCell>
                    <TableCell>{product.itemsCount}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex space-x-2 justify-end">
                        <Button
                          onClick={() => {
                            setProductToUpdate(product);
                            setIsUpdateModalOpen(true);
                          }}
                          variant="outline"
                        >
                          <FiEdit className="mr-1" /> Update
                        </Button>
                        <Button
                          onClick={() => {
                            setProductToDelete(product.id);
                            setIsDeleteModalOpen(true);
                          }}
                          variant="destructive"
                          disabled={deletingProductId === product.id}
                        >
                          {deletingProductId === product.id ? (
                            "Deleting..."
                          ) : (
                            <>
                              <FiTrash2 className="mr-1" /> Delete
                            </>
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 gap-2">
          <Button
            onClick={() => handlePageChange("prev")}
            variant="outline"
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange("next")}
            variant="outline"
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modals */}
      <UpdateModal
        isOpen={isUpdateModalOpen}
        product={productToUpdate}
        onClose={() => setIsUpdateModalOpen(false)}
        onUpdate={handleUpdateProduct}
        setProduct={setProductToUpdate}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        productToDelete={productToDelete}
        deletingProductId={deletingProductId}
        onClose={() => setIsDeleteModalOpen(false)}
        handleDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default AllProducts;
