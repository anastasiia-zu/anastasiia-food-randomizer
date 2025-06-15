"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react'

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

      setRandomRecipe(recipes[randomIndex]);
   };

  return (
   <div className='max-w-xl mx-auto mt-10 text-center'>
      <button 
      onClick={handleShowRandom} 
      className='mx-auto mt-6 bg-purple-300 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-400 transition duration-300 disabled:opacity-50' 
      disabled={loading || recipes.length === 0}
      >
         {loading? "Loading..." : "Get a Random Recipe"}
      </button>

      {randomRecipe && (
         <div className='bg-yellow-500 shadow-md rounded p-4 border'>
            <h2 className='text-2xl font-bold mb-2'>
               {randomRecipe.title}
            </h2>
            {randomRecipe.imageURL && (
               <Image 
               width={500}
               height={300}
               src={randomRecipe.imageURL}
               alt={randomRecipe.title}
               className='w-full h-64 object-cover rounded mb-4'/>
            )}
            <p className='mb-3 text-gray-700'>
               {randomRecipe.description}
            </p>
            <h3 className='text-lg font-semibold mb-2'>
               Ingredients:
            </h3>
            <ul className='list-disc pl-5 text-left'>
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