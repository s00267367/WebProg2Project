import { Request, Response } from 'express';
import { DishService } from '../services/dishes';

const dishService = new DishService();

export class DishController {

   /**
 * @openapi
 * /dishes:
 *   get:
 *     summary: Retrieve all dishes
 *     tags:
 *       - dishes
 *     responses:
 *       200:
 *         description: Successfully retrieved dishes
 *       500:
 *         description: Internal server error
 */
  getDishes = async (_req: Request, res: Response): Promise<void> => {

   try {
      const dishes = await dishService.getAllDishes();
      res.status(200).json(dishes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dishes', error });
    }

  };

  /**
* @openapi
* /dishes/{id}:
*   get:
*     summary: Get a dish by ID
*     tags:
*       - dishes
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Dish found
*       404:
*         description: Dish not found
*       500:
*         description: Internal server error
*/
  getDishById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const dish = await  dishService.getDishById(id);
      if (!dish) {
        res.status(404).json({ message: 'Dish not found' });
        return;
      }
      res.status(200).json(dish);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dish', error });
    }
};
/**
 * @openapi
 * /dishes:
 *   post:
 *     summary: Create a new dish
 *     tags:
 *       - dishes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDishInput'
 *     responses:
 *       201:
 *         description: Successfully created dish
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

  createDish = async (req: Request, res: Response): Promise<void> => {
    try {
      const newDish = await dishService.createDish(req.body);
      res.status(201).json(newDish);
    } catch (error) {
      res.status(500).json({ message: 'Error inserting into MongoDB', error });
    }
 };

  updateDish = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updatedDish = await dishService.updateDish(id, req.body);
      if (!updatedDish) {
        res.status(404).json({ message: 'Dish not found' });
        return;
      }
      res.status(200).json(updatedDish);
    } catch (error) {
      res.status(500).json({ message: 'Error updating dish', error });
    }
};
/**
* @openapi
* /dishes/{id}:
*   delete:
*     summary: Delete a dish by ID
*     tags:
*       - dishes
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Dish deleted successfully
*       404:
*         description: Dish not found
*       500:
*         description: Internal server error
*/

  deleteDish = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deletedDish = await dishService.deleteDish(id);
      if (!deletedDish) {
        res.status(404).json({ message: 'Dish not found' });
        return;
      }
      res.status(200).json(deletedDish);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting dish', error });
    }
  };
}
