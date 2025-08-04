"use client"

import { addRecipe } from '@/store/recentlyViewedSlice';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

type Ingredient = {
   name: string;
   amount: string;
   unit: string;
};

type Recipe = {
   _id: string;
   title: string;
   description: string;
   allIngredients: Ingredient[];
   imageURL: string;
};

const RandomRecipe = () => {
   const [recipes, setRecipes] = useState<Recipe[]>([]);
   const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);
   const [loading, setLoading] = useState<boolean>(false);
   const dispatch = useDispatch();

   const fetchRecipes = async () => {
      setLoading(true);

      try{ 
         const res = await fetch("/api/recipes");
         const data = await res.json();

         setRecipes(data.recipes || []);
      } catch (error) {
         console.error("error fecthing recipes", error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchRecipes();
   }, []);

   const handleShowRandom = () => {
      if (recipes.length === 0) {
         return;
      }

      const randomIndex = Math.floor(Math.random() * recipes.length);
      const selectedRecipe = recipes[randomIndex];

      setRandomRecipe(selectedRecipe);

      dispatch(addRecipe(selectedRecipe));
   };

  return (
   <div className='flex flex-col items-center mt-10 min-h-[500px]'>
      <button 
      onClick={handleShowRandom} 
      className='bg-purple-400 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-500 transition mb-10' 
      disabled={loading || recipes.length === 0}
      >
         {loading? "Loading..." : "Get a Random Recipe"}
      </button>

      {randomRecipe && (
         <div className='w-full max-w-xl bg-white shadow-lg rounded-3xl p-6 border border-gray-100 text-center'>
            <h2 className='text-2xl font-bold mb-2'>
               {randomRecipe.title}
            </h2>
            {randomRecipe.imageURL && (
               <Image 
               width={600}
               height={400}
               src={randomRecipe.imageURL}
               alt={randomRecipe.title}
               className='w-full h-64 object-cover rounded-2xl mb-4'/>
            )}
            <p className='mb-4 text-gray-700 text-base'>
               {randomRecipe.description}
            </p>
            <h3 className='text-lg font-semibold mb-2'>
               Ingredients:
            </h3>
            <ul className='ext-left text-sm text-gray-600 list-disc pl-5'>
               {randomRecipe.allIngredients.map((ing, index) => (
                  <li key={index}>{ing.amount} {ing.unit} of {ing.name}</li>
               ))}
            </ul>
         </div>
      )}
   </div>
  )
};

export default RandomRecipe;