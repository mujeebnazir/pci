import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModelProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;

  children: React.ReactNode;
  title: string;
  discription: string;
}
const Model: React.FC<ModelProps> = ({
  isOpen,
  onChange,
  title,
  discription,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange} defaultOpen={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-100/90 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content className="z-50 fixed drop-shadow-md border border-neutral-300 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-[25px] focus:outline-none">
          <Dialog.Title className="text-xl text-center font-bold mb-4 text-gray-900">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-sm leading-normal text-center mb-5 text-gray-600">
            {discription}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button className="text-gray-500 hover:text-gray-800 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none">
              <IoMdClose size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Model;
