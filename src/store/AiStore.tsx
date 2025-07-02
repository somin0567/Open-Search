import { create } from "zustand";
import aiData from "../db/data.json";

export interface AiItem {
  id: number;
  name: string;
  category: string;
  image: string;
  price: string;
}

interface AiState {
  aiList: AiItem[];
  selectedAi: AiItem | null;
  setSelectedAi: (ai: AiItem | null) => void;
  getAiById: (id: number | string) => AiItem | undefined;
}

const useAiStore = create<AiState>((set, get) => ({
  aiList: aiData,
  selectedAi: null,
  setSelectedAi: (ai) => set({ selectedAi: ai }),
  getAiById: (id) =>
    get().aiList.find((item) => String(item.id) === String(id)),
}));

export default useAiStore;
