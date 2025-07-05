import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Recipe } from "@/models/Recipe";

export async function POST(req: Request) {
   try {
      const {ingredients} = await req.json();

      if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
         return NextResponse.json({message: "ingredients array is required"},{status: 400});
      }

      await connectToDatabase();

      const recipes = await Recipe.find({
         'allIngredients.name' : {
            $in: ingredients.map(ing => new RegExp(ing, 'i')),
         }
      });

      return NextResponse.json({recipes});
   }
   catch (err) {
      console.error('search error', err);
      return NextResponse.json({message: "internal server error"},{status: 500});
   };
};