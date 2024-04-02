import { create } from "zustand";
import { GetItems } from "./item-actions";

export type Item = {
    type: string;
    latitude: number;
    longitude: number;
    id: number;
}

type ItemStore = {
  items: Item[];
  loadItems: () => Promise<void>;
   
};

export const useItemsStore = create<ItemStore>()((set) => ({
  items: [],
 
  loadItems: async () => {
      //await new Promise((resolve) => setTimeout(resolve, 1000));
    const fetchedItems =  await GetItems()
    set((state) => ({ items:fetchedItems.data   }));
  },
 
}));