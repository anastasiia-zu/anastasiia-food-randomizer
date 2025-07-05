"use client"

import React, { useState } from 'react'
import { RecipeTypes } from '../../types/types'
import RecipeCard from './recipe-card';

export default function SearchRecipes() {

   const [searchInput, setSearchInput] = useState<string>('');
   const [ingredients, setIngredients] = useState<string[]>([]);
   const [recipes, setRecipes] = useState<RecipeTypes[]>([]);
   const [loading, setLoading] = useState<boolean>(false);

   const handleAddIngredient = () => {
      if (searchInput.trim() && !ingredients.includes(searchInput.trim().toLocaleLowerCase())) {
         setIngredients([...ingredients, searchInput.trim().toLocaleLowerCase()]);
         setSearchInput('');
      }
   };

   const handleRemoveIngredient = (ingredientToRemove: string) => {
      setIngredients(ingredients.filter(ing => ing !== ingredientToRemove))
   };

   const handleSearch = async () => {
      if (ingredients.length === 0) {
         return;
      };

      setLoading(true);
      try {
         const response = await fetch('/api/recipes/search', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ingredients}),
         })

         if (response.ok) {
            const data = await response.json();
            setRecipes(data.recipes)
         }
      } 
      catch (err) {
         console.error('search error', err);
      } 
      finally {
         setLoading(false);
      };
   };

  return (
    <div className='max-w-4xl p-4 mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>
         Search recipes by ingredients
      </h1>
      <div className=''>
         <div className='flex gap-2 mb-2'>
            <input 
            type='text' 
            value={searchInput} 
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder='Enter ingredient'
            className='border border-gray-300 rounded-full px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-300'
            />
            <button
            className='bg-purple-300 hover:bg-purple-400 text-white px-4 py-2 rounded-full'
            onClick={handleAddIngredient}
            >
               Add
            </button>
         </div>
         {ingredients.length > 0 && (
            <div className='flex flex-wrap gap-2 mb-4'>
               {ingredients.map((ingredient, index) => (
                  <div 
                  key={index}
                  className='flex items-center bg-gray-100 rounded-full px-3 py-1'
                  >
                    <span>{ingredient}</span>
                    <button 
                    className='ml-2 text-gray-500 hover:text-gray-700'
                    onClick={() => handleRemoveIngredient(ingredient)}
                     >
                     x
                    </button>
                  </div>
               ))}
            </div>
               )}
            <button
               className='bg-purple-300 hover:bg-purple-400 text-white px-4 py-2 rounded-full disabled:opacity-50'
               onClick={handleSearch}
               disabled={ingredients.length === 0 || loading}
               >
                  {loading ? 'Searching...' : 'Search recipes'}
            </button>
      </div>
               {recipes.length > 0 ? (
                  <div
                  className='grid grid-cols-1 md:grid-cols-2 gap-6'
                  > 
                     {recipes.map(recipe => (
                        <RecipeCard 
                        key={recipe._id}
                        recipe={recipe}
                        />
                     ))}
                  </div>
               ) : (<p className='text-gray-500'>
                     {loading ? 'Loading...' : 'No recipes found, try adding some ingredients'}
               </p>)}
    </div>
  )
};
