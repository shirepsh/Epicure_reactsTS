export interface Dish {
  id: number;
  name: string;
  image: string;
  ingredients: string;
  price: number;
  sides: string[];
  changes: string[];
  quantity?: number; 
  selectedSide?: string; 
  selectedChanges?: string[]; 
  icon: string[];
}
