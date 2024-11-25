"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CategoryService from "@/lib/category";
import { IconTrash } from "@tabler/icons-react";
import { toast } from "react-hot-toast";

const CreateCategory = () => {
  const [name, setName] = React.useState("");
  const [categories, setCategories] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingCategories, setLoadingCategories] = React.useState(true);

  /**
   * @param e
   * Creation of Category
   */
  const handleCategoryCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await CategoryService.createCategory(name);
      toast.success("Category created successfully");
      setCategories((prevCategories) => [...prevCategories, response]);
      setName("");
    } catch (error: any) {
      toast.error("Failed to create category");
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @param categoryId
   * Deletes a Category
   */
  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await CategoryService.deleteCategory(categoryId);
      toast.success("Category deleted successfully");
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete category");
      console.error("Error deleting category:", error);
    }
  };

  /**
   * Fetchs All Categories
   */
  useEffect(() => {
    const getCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await CategoryService.getCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="p-9 max-w-6xl bg-white shadow-lg rounded-lg overflow-y-auto max-h-[100vh]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Create New Category
      </h2>
      <form onSubmit={handleCategoryCreation} className="mb-4">
        <Label htmlFor="categoryName">Category Name</Label>
        <Input
          id="categoryName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
        />
        <Button type="submit" className="mt-4 w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Category"}
        </Button>
      </form>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Existing Categories
      </h3>
      <div className="">
        {loadingCategories ? (
          <div className="text-gray-500 text-center py-2">
            Loading categories...
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.$id + "category"}
              className="flex justify-between items-center py-2"
            >
              <span>{category.name}</span>
              <Button
                onClick={() => handleDeleteCategory(category.$id)}
                className="text-red-500"
              >
                <IconTrash />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CreateCategory;
