import Image from "next/image";
import Link from "next/link";
import { RecipeTypes } from "../../types/types";

interface RecipeCardProps {
  recipe: RecipeTypes,
};

export default function RecipeCard({recipe}: RecipeCardProps) {
   return (
      <div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      >
         {recipe.imageURL && (
         <div
         className="h-48 relative"
         >
            <Image 
            src={recipe.imageURL}
            alt={recipe.title}
            fill
            className="object-cover"
            />
         </div>)}
         <div className="p-4">
            <h2>
               {recipe.title}
            </h2>
            <p>
               {recipe.description}
            </p>
            <div className="mb-4">
               <h3>
                  Ingredients:
               </h3>
               <ul>
                  {recipe.allIngredients.slice(0, 3).map((ing, index) => (
                  <li
                  key={index}
                  >
                     {ing.amount} {ing.unit} of {ing.name}
                  </li>))}
                  {recipe.allIngredients.length > 3 && (<li>...and {recipe.allIngredients.length - 3} more</li>)}
               </ul>
            </div>
            <Link 
            className="text-purple-500 hover:text-purple-700 font-medium"
            href={`/recipes/${recipe._id}`}
            > 
              View recipe
            </Link>
         </div>
      </div>
   );
};