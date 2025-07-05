import { models, model, Schema } from "mongoose";

const IngredientsSchema = new Schema({
   name: {type: String},
   amount: {type: String},
   unit: {type: String},
});

const RecipeSchema = new Schema({
   title: {type: String, required: true, unique: true},
   description:{type: String, required: true},
   allIngredients: [IngredientsSchema],
   imageURL:{type: String, required: true},
}, {timestamps: true});

export const Recipe = models?.Recipe || model('Recipe', RecipeSchema);