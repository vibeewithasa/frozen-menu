import { create } from "zustand";

interface FlavorState {
  /** sabor seleccionado para el preview (id) */
  activeFlavor: string | null;
  /** categoría filtrada; null = todas */
  category: string | null;
  /** texto de búsqueda */
  query: string;
  setActiveFlavor: (id: string | null) => void;
  setCategory: (id: string | null) => void;
  setQuery: (q: string) => void;
}

export const useFlavorStore = create<FlavorState>((set) => ({
  activeFlavor: null,
  category: null,
  query: "",
  setActiveFlavor: (id) => set({ activeFlavor: id }),
  setCategory: (id) => set({ category: id }),
  setQuery: (q) => set({ query: q }),
}));
