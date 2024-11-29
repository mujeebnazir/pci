import { create } from "zustand";

interface QuickModelStore {
  id: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}

const useQuickModel = create<QuickModelStore>((set) => ({
  id: "",
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false }),
}));

export default useQuickModel;
