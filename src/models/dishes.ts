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

/**
 * 
 * @openapi
 * components:
 *   schemas:
 *     CreateDishInput:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - ingredients
 *         - allergens
 *         - availability
 *       properties:
 *         name:
 *           type: string
 *           example: Chicken Curry
 *         price:
 *           type: number
 *           example: 14.50
 *         ingredients:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: string
 *           example:
 *             - name: Chicken
 *               quantity: 200g
 *             - name: Cream
 *               quantity: 100ml
 *             - name: Rice
 *               quantity: 150g
 *         allergens:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - name
 *               - ingredients
 *             properties:
 *               name:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *           example:
 *             - name: Dairy
 *               ingredients:
 *                 - Cream
 *         availability:
 *           type: object
 *           required:
 *             - menu
 *             - special
 *           properties:
 *             menu:
 *               type: string
 *               example: dinner
 *             special:
 *               type: boolean
 *               example: false
 */

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
