import { Schema, model } from 'mongoose';
import {z} from 'zod';

interface IIngredient {
  name: string;
  quantity: string;
}

interface IAllergen {
  name: string;
  ingredients: string[];
}

interface IAvailability {
  menu: string;
  special: boolean;
}

export interface IDish {
  name: string;
  price: number;
  ingredients: IIngredient[];
  allergens: IAllergen[];
  availability: IAvailability;
}


export const createDishZSchema= z.object({
  name: z.string().max(100),
  price: z.number().min(0),
  ingredients: z.array(z.object({
    name: z.string().max(100),
    quantity: z.string().max(100)
  })),
  allergens: z.array(z.object({
    name: z.string().max(100),
    ingredients: z.array(z.string().max(100))
    })).optional(),
  availability: z.object({
    menu: z.enum(['breakfast', 'lunch', 'dinner', 'dessert']),
    special: z.boolean()
  })  
});

export const updateDishZSchema= z.object({
  name: z.string().max(100),
  price: z.number().min(0),
  ingredients: z.array(z.object({
    name: z.string().max(100),
    quantity: z.string().max(100)
  })),
  allergens: z.array(z.object({
    name: z.string().max(100),
    ingredients: z.array(z.string().max(100))
    })).optional(),
  availability: z.object({
    menu: z.enum(['breakfast', 'lunch', 'dinner', 'dessert']),
    special: z.boolean()
  })  
});

const dishSchema = new Schema<IDish>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: [{ type: Object, required: true }],
    allergens: [{ type: Object, required: true }],
    availability: { type: Object, required: true }
  },
  { timestamps: true }
);

export const DishModel = model<IDish>('Dish', dishSchema);
