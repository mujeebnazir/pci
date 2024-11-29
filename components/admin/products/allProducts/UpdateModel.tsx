import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UpdateModalProps {
  isOpen: boolean;
  product: any;
  onClose: () => void;
  onUpdate: (updatedProduct: any) => void;
  setProduct: (product: any) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, product, onClose, onUpdate, setProduct }) => {
  const handleUpdate = () => {
    onUpdate(product);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>Edit the product details below:</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Label>Product Name</Label>
          <Input
            placeholder="Product Name"
            value={product?.name || ""}
            readOnly
            className="cursor-not-allowed bg-gray-100"
          />
          <Label>Price</Label>
          <Input
            placeholder="Price"
            type="number"
            value={product?.price || ""}
            onChange={(e) =>
              setProduct({
                ...product,
                price: parseFloat(e.target.value) || 0,
              })
            }
          />
          <Label>Sizes : Allowed sizes: L, XL, M, SM, XXL</Label>
          <Input
            placeholder="Sizes Available (comma-separated)"
            value={product?.sizesAvailable?.join(", ") || ""}
            onChange={(e) => {
              const sizes = e.target.value
                .split(",")
                .map((size) => size.trim().toUpperCase());
              setProduct({
                ...product,
                sizesAvailable: sizes,
              });
            }}
          />
          <Label>Quantity</Label>
          <Input
            placeholder="Quantity"
            type="number"
            value={product?.itemsCount || ""}
            onChange={(e) =>
              setProduct({
                ...product,
                itemsCount: parseInt(e.target.value) || 0,
              })
            }
          />
          <div className="flex justify-end space-x-4">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
