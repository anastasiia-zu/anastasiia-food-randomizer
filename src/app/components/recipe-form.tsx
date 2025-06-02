"use client"

import React, { useState } from 'react'

const RecipeForm = () => {

   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [ingredient, setIngredient] = useState('');
   const [proportions, setProportions] = useState('');
   const [allIngredients, setAllIngredients] = useState([]);
   const [measure, setMeasure] = useState('');

   function addIngredient() {
      console.log(`${measure}, ${ingredient}, ${proportions}`)
   }

  return (
   <form>
      <div>
         <label>Title</label>
         <input
         className='border-black'
         type='text'
         value={title}
         onChange={e => setTitle(e.target.value)}
         />
      </div>

      <input
      type='text'
      value={description}
      onChange={e => setDescription(e.target.value)}
      />
      
      <div>
         <input
         type='text'
         value={ingredient}
         onChange={e => setIngredient(e.target.value)}
         />
         <input
         type='text'
         value={proportions}
         onChange={e => setProportions(e.target.value)}
         />
         <select onChange={e => setMeasure(e.target.value)}>
            <option value={'spoons'}>
               spoons
            </option>
            <option value={'milliliters'}>
               milliliters
            </option>
             <option value={'grams'}>
               grams
            </option>
         </select>

         <button type='button' onClick={addIngredient}>Add ingredient</button>
      </div>
   </form>
  )
}

export default RecipeForm;