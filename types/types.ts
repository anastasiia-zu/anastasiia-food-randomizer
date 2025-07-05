export interface UserTypes {
   _id?: string;
   id?: string;
   name: string;
   email: string;
   password: string;
   isAdmin?: boolean;
   imageUrl?: string;
};

export interface RecipeTypes {
   _id?: string;
   title: string;
   description: string;
   allIngredients: {
      name: string;
      amount: string;
      unit: string;
   }[];
   imageURL: string;
};