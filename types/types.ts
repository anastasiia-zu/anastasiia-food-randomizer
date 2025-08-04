export interface UserTypes {
   _id?: string;
   id?: string;
   name: string;
   email: string;
   password: string;
   isAdmin?: boolean;
   imageUrl?: string;
};

export interface IngredientTypes {
   name: string;
   amount: string;
   unit: string;
};

export interface RecipeTypes {
   _id?: string;
   title: string;
   description: string;
   allIngredients: IngredientTypes[];
   imageURL: string;
};

export interface RecentlyViewedTypes {
   recipes: RecipeTypes[];
};