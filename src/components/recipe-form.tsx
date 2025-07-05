"use client"

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Ingredient = {
   name: string;
   amount: string;
   unit: string;
}

const RecipeForm = () => {

   const [title, setTitle] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [ingredient, setIngredient] = useState<string>('');
   const [proportions, setProportions] = useState<string>('');
   const [measure, setMeasure] = useState<string>('spoons');

   const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);

   const [image, setImage] = useState<File | null>(null);
   const [previewImage, setPreviewImage] = useState<string | null>(null);

   const [loading, setLoading] = useState<boolean>(false);

   const {status} = useSession();
   const router = useRouter();

   function addIngredient() {
      console.log(`${measure}, ${ingredient}, ${proportions}`)

      if (!ingredient || !proportions || !measure) {
         return;
      }

      const newIngredient: Ingredient = {
         name: ingredient,
         amount: proportions,
         unit: measure,
      };

      setAllIngredients(prev => [...prev, newIngredient]);

      setIngredient('');
      setProportions('');
      setMeasure('spoons');
   }

   const hangleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setImage(file);
         setPreviewImage(URL.createObjectURL(file));
      }
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!image) {
         // change in future to react hot tost 
         alert("please, select an image");
         return;
      }

      const formData = new FormData();
      formData.append("file", image);

      try {
         const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
         });

         const data = await res.json();

         if (!res.ok) {
            throw new Error(data.error || "uploading failed");
         };

         console.log("upload image url:", data.url);

         setLoading(true);

         const recipe = await fetch("/api/recipes", {
            method: "POST",
            body: JSON.stringify({
               title, 
               description, 
               allIngredients, 
               imageURL: data.url,
            }),
         });

         if (recipe.ok) {
         setLoading(false);
         router.push("/");
         };
      } catch (error) {
         setLoading(false);
         console.error("failed to add recipe", error);
      };
   };

   if (status === 'unauthenticated') {
      router.push('/log-in');
   }

  return (
   <form 
   className='bg-white max-w-2xl w-full mx-auto mt-10 p-8 rounded-3xl shadow-md flex flex-col gap-6'
   onSubmit={handleSubmit}
   >
      <div className='flex flex-col'>
         <label className="text-sm font-semibold mb-1">Recipe Title</label>
         <input
         className='border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm'
         type='text'
         value={title}
         onChange={e => setTitle(e.target.value)}
         placeholder="Enter recipe title"
         />
      </div>

      <div className='flex flex-col'> 
         <label className="text-sm font-semibold mb-1">Description</label>
         <input
         className='border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm resize-none'
         type='text'
         value={description}
         onChange={e => setDescription(e.target.value)}
         placeholder="Enter recipe description"
         />
      </div>

      <div className="flex flex-col">
      <label className="text-sm font-semibold mb-2">Upload Image</label>
      <input
         id="image-upload"
         type="file"
         accept="image/*"
         onChange={hangleImageChange}
         className="hidden"
      />
      <label
         htmlFor="image-upload"
         className="inline-block w-fit cursor-pointer bg-purple-300 text-white font-medium px-4 py-2 rounded-full hover:bg-purple-400 transition text-sm"
      >
         Choose Image
      </label>
      {previewImage && (
         <Image
            src={previewImage}
            alt="preview"
            width={48}
            height={48}
            className="mt-4 w-48 h-48 object-cover rounded-xl border"
         />
      )}
      </div>

      <div className='flex flex-wrap items-end gap-4'>
         <div className='flex flex-col flex-1 min-w-[200px]'> 
            <label className="text-sm font-semibold mb-1">Ingredient</label>
            <input
            className='border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300'
            type='text'
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Ingredient name"
            />
         </div>
         <div className='flex flex-col w-[110px]'>
            <label className="text-sm font-semibold mb-1">Proportions</label>
            <input
            className='border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300'
            type='text'
            value={proportions}
            onChange={(e) => setProportions(e.target.value)}
            placeholder="Proportion"
            />
         </div>
         <div className='flex flex-col w-[130px]'> 
            <label className="text-sm font-semibold mb-1">Measure</label>
            <select 
            className='border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300' 
            onChange={e => setMeasure(e.target.value)}
            >
               <option value={'spoons'}>
                  spoons
               </option>
               <option value={'milliliters'}>
                  milliliters
               </option>
               <option value={'grams'}>
                  grams
               </option>
               <option value={'pieces'}>
                  pieces
               </option>
            </select>
         </div>

         <button 
         className='bg-purple-300 hover:bg-purple-400 transition text-white px-4 py-2 rounded-full text-sm' 
         type='button' 
         onClick={addIngredient}
         >
            Add ingredient
         </button>
      </div>

      <div className='flex flex-col gap-2'>
         <h3 className='text-xl font-semibold'>
         Ingredients list:
         </h3>
         <ul className='flex flex-col gap-1 text-sm list-disc pl-5 text-gray-700'>
            {allIngredients.map((item, index) => (
               <li key={index}>{item.amount} {item.unit} of {item.name}</li>
            ))}
         </ul>
      </div>

         <button 
         className='w-full bg-purple-300 text-white py-3 rounded-full font-medium hover:bg-purple-400 transition disabled:opacity-50' 
         type='submit' 
         disabled={loading}
         >
            {loading? "Loading..." : "Submit Recipe"}
         </button>
   </form>
  )
}

export default RecipeForm;