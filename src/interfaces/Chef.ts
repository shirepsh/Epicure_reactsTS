export interface Chef {
    experience: any;
    rating: any;
    id: number;
    name: string;
    private: string;
    image: string;
    description: string;
    restaurants: ChefRestaurant[];
  }
  
export interface ChefRestaurant {
    name: string;
    image: string;
  }
  