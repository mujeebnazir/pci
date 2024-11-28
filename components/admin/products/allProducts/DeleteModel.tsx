// components/DeleteModal.tsx
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
import { FiTrash2 } from 'react-icons/fi';

interface DeleteModalProps {
  isOpen: boolean;
  productToDelete: string | null; // Product ID or product data to delete
  deletingProductId: string | null;
  onClose: () => void;
  handleDeleteProduct: (productId: string) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  productToDelete,
  deletingProductId,
  onClose,
  handleDeleteProduct,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The product will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteProduct(productToDelete as string)}
            variant="destructive"
            disabled={deletingProductId === productToDelete}
          >
            {deletingProductId === productToDelete ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
