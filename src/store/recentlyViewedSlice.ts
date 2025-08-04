import { RecentlyViewedTypes, RecipeTypes } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const saveToLocalStorage = (recipes: RecipeTypes[]) => { 
   localStorage.setItem('recentlyViewedRecipes', JSON.stringify(recipes))
};

const loadFromLocalStorage = (): RecipeTypes[] => {
   if (typeof window === 'undefined') return [];

   const data = localStorage.getItem('recentlyViewedRecipes');

   return data ? JSON.parse(data) : [];
};

const initialState: RecentlyViewedTypes = {
   recipes: loadFromLocalStorage(),
}

const recentlyViewedSlice = createSlice({
   name: 'recentlyViewed',
   initialState,
   reducers: {
      addRecipe: (state, action: PayloadAction<RecipeTypes>) => {
         const newRecipe = action.payload;
         const existingIndex = state.recipes.findIndex(recipe => recipe._id === newRecipe._id);
         let newRecipes = [...state.recipes];

         if (existingIndex !== -1) {
            newRecipes.slice(existingIndex, 1)
         }

         newRecipes = [newRecipe, ...newRecipes];
         newRecipes = newRecipes.slice(0, 15);
         state.recipes = newRecipes;

         saveToLocalStorage(newRecipes);
      }
   }
})

export const { addRecipe } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;