import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongoose";
import { Recipe } from "@/app/models/Recipe";

export async function POST(req: NextRequest) {
   try {
      const { title, description, allIngredients, imageURL } = await req.json();
      
      if (!title || !description || allIngredients.length === 0 || !imageURL) {
         return NextResponse.json({message: "some fields are empty"}, {status: 400});
      };

      await connectToDatabase();
      
      const newRecipe = await Recipe.create({
         title,
         description,
         allIngredients,
         imageURL,
      });

      return NextResponse.json({message: "recipe created", recipe: newRecipe}, {status: 201});
   } catch (error) {
      console.error("error creating recipe", error);
      return NextResponse.json({message: "error creating recipe"}, {status: 500});
   };
};

export async function GET() {
   try {
      await connectToDatabase();

      const recipes = await Recipe.find();

      return NextResponse.json({recipes}, {status: 200});
   } catch (error) {
      console.error("recipe error accured", error);
      return NextResponse.json({message: "failed to fetch recipes"}, {status: 500});
   }
};