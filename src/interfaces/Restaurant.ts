export interface Restaurant {
  id: number;
  name: string;
  image: string;
  chef: string;
  openingHours: ({ day: number; open: string | null; close: string | null } | null)[];
  openingDay: string;
  dishes: {
      breakfast: {
          id: number; 
          name: string;
          ingredients: string;
          image: string;
          price: number;
          sides: string[];
          changes: string[];
          icon: string[];
      }[];
      lunch: {
          id: number; 
          name: string;
          ingredients: string;
          image: string;
          price: number;
          sides: string[];
          changes: string[];
          icon: string[];
      }[];
      dinner: {
          id: number; 
          name: string;
          ingredients: string;
          image: string;
          price: number;
          sides: string[];
          changes: string[];
          icon: string[];
      }[];
  };
  rating: number;
  address: string | { address: string; branch: string }[];
}
