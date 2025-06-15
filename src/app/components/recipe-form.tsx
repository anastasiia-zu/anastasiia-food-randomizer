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
   <form className='flex flex-col gap-4 max-w-3xl mx-auto py-8' onSubmit={handleSubmit}>
      <div className='flex flex-col'>
         <label>Title</label>
         <input
         className='border border-black p-2'
         type='text'
         value={title}
         onChange={e => setTitle(e.target.value)}
         />
      </div>

      <div className='flex flex-col'> 
         <label>Description</label>
         <input
         className='border border-black p-2'
         type='text'
         value={description}
         onChange={e => setDescription(e.target.value)}
         />
      </div>

      <div className='flex flex-col'>
         <label>Upload image</label>
         <input
         type='file'
         accept='image/*'
         onChange={hangleImageChange}
         />
         {previewImage && (<Image src={previewImage} alt='preview' width={48} height={48} className='mt-2 w-48 h-48 object-cover border'/>)}
      </div>

      <div className='flex items-end gap-4'>
         <div className='flex flex-col'> 
            <label>Ingredient</label>
            <input
            className='border border-black p-2'
            type='text'
            value={ingredient}
            onChange={e => setIngredient(e.target.value)}
            />
         </div>
         <div className='flex flex-col'>
            <label>Proportions</label>
            <input
            className='border border-black p-2'
            type='text'
            value={proportions}
            onChange={e => setProportions(e.target.value)}
            />
         </div>
         <div className='flex flex-col'> 
            <label>Measure</label>
            <select className='border border-black p-2' onChange={e => setMeasure(e.target.value)}>
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

         <button className='bg-green-400 text-white px-4 py-2' type='button' onClick={addIngredient}>Add ingredient</button>
      </div>

      <div className='flex flex-col gap-2'>
         <h3 className='text-xl font-semibold'>
         Ingredients list:
         </h3>
         <ul className='flex flex-col gap-4'>
            {allIngredients.map((item, index) => (
               <li key={index}>{item.amount} {item.unit} of {item.name}</li>
            ))}
         </ul>
      </div>

         <button 
         className='bg-green-400 text-white px-4 py-2' 
         type='submit' 
         disabled={loading}
         >
            {loading? "Loading..." : "Submit"}
         </button>
   </form>
  )
}

export default RecipeForm;