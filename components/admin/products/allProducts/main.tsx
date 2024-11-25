import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AllProducts = () => {
  const { products, loadingProducts, error, setProducts } = useProducts({});
  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null
  );
  const [isUpdateModelOpen, setIsUpdateModelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  if (error) {
    return (
      <p className="text-center text-red-500 font-medium">
        Failed to load products. Please try again later.
      </p>
    );
  }

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    setDeletingProductId(productToDelete);
    try {
      await ProductService.deleteProduct(productToDelete);
      toast.success("Product deleted successfully");
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productToDelete)
      );
    } catch (err) {
      console.error("Failed to delete product:", err);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setDeletingProductId(null);
      setIsModalOpen(false);
    }
  };

  const openModal = (productId: string) => {
    setProductToDelete(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };
  const openUpdateModel = () => {
    setIsUpdateModelOpen(true);
  };
  const closeUpdateModel = () => {
    setIsUpdateModelOpen(false);
  };
  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || product.category === filterCategory;
    return matchesSearchQuery && matchesCategory;
  });

  return (
    <div className="bg-gray-100 text-black py-5 ">
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

        {/* Search Bar and Filter */}
        <div className="mb-4 flex justify-between items-center space-x-4">
          <div className="w-full sm:w-2/3">
            <Input
              type="text"
              placeholder="Search by name or category"
              className="w-full px-4 py-2 "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-1/3">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="apple">Category 1</SelectItem>
                  <SelectItem value="banana">Category 2</SelectItem>
                  <SelectItem value="blueberry">Category 3</SelectItem>
                  <SelectItem value="grapes">Category 4</SelectItem>
                  <SelectItem value="pineapple">Category 5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-full border border-gray-300 p-4">
            <TableCaption>
              A list of all products in your inventory.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm sm:text-base">Name</TableHead>
                <TableHead className="text-sm sm:text-base">Price</TableHead>
                <TableHead className="text-sm sm:text-base">Sizes</TableHead>
                <TableHead className="text-sm sm:text-base">Category</TableHead>
                <TableHead className="text-sm sm:text-base">Quantity</TableHead>
                <TableHead className="text-sm sm:text-base text-right">
                  Actions
                </TableHead>
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
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium text-sm sm:text-base">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-sm sm:text-base">
                      ₹{product.price}
                    </TableCell>
                    <TableCell className="text-sm sm:text-base">
                      {product.sizesAvailable.join(", ")}
                    </TableCell>
                    <TableCell className="text-sm sm:text-base">
                      {product.category}
                    </TableCell>
                    <TableCell className="text-sm sm:text-base">
                      {product.itemsCount}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex space-x-2 justify-end">
                        <Button
                          onClick={() => openUpdateModel()}
                          variant="outline"
                          className=" bg-black text-white flex items-center justify-center text-xs sm:text-sm transition-all duration-300"
                        >
                          <FiEdit className="mr-1 sm:mr-2" /> Update
                        </Button>
                        <Button
                          onClick={() => openModal(product.id)}
                          variant="destructive"
                          disabled={deletingProductId === product.id}
                          className=" text-black hover:bg-white flex items-center justify-center text-xs sm:text-sm transition-all duration-300"
                        >
                          {deletingProductId === product.id ? (
                            "Deleting..."
                          ) : (
                            <>
                              <FiTrash2 className="mr-1 sm:mr-2" /> Delete
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
      </div>

      {/* Dialog for Confirm Deletion */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogTrigger asChild />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              product and remove it from your inventory.
            </DialogDescription>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={closeModal}
                variant="outline"
                className="text-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteProduct}
                variant="destructive"
                className="text-black"
              >
                Delete
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Dialog for updation */}
      <Dialog open={isUpdateModelOpen} onOpenChange={closeUpdateModel}>
        <DialogTrigger asChild />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              product and remove it from your inventory.
            </DialogDescription>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={closeUpdateModel}
                variant="outline"
                className="text-gray-700"
              >
                Cancel
              </Button>
              <Button variant="ghost" className="text-black">
                Upadte Product
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProducts;
