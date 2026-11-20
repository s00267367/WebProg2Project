import { Request, Response } from 'express';
import { DishService } from '../services/dishes';

const dishService = new DishService();

export class DishController {

/**
 * @openapi
 * /dishes:
  get:
    summary: Retrieve dishes, optionally filtered by menu or special status
    tags:
      - dishes
    parameters:
      - in: query
        name: menu
        required: false
        schema:
          type: string
          enum: [breakfast, lunch, dinner, dessert]
      - in: query
        name: special
        required: false
        schema:
          type: boolean
    responses:
      200:
        description: Successfully retrieved dishes
      400:
        description: Invalid query parameters
      500:
        description: Internal server error
 */
  getDishes = async (req: Request, res: Response): Promise<void> => {
    const { menu, special } = req.query;

    const dishes = await dishService.getDishes(
      menu as string | undefined,
      special === undefined ? undefined : special === 'true'
    );

    res.status(200).json(dishes);
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
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const dish = await dishService.getDishById(id);
    res.status(200).json(dish);
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
    const newDish = await dishService.createDish(req.body);
    res.status(201).json(newDish);
 };

 /**
 * @openapi
 * /dishes/{id}:
 *   put:
 *     summary: Update a dish
 *     tags:
 *       - dishes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDishInput'
 *     responses:
 *       200:
 *         description: Successfully updated dish
 *       400:
 *         description: Bad request
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */
  updateDish = async (req: Request, res: Response): Promise<void> => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const updatedDish = await dishService.updateDish(id, req.body);
    res.status(200).json(updatedDish);
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
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const deletedDish = await dishService.deleteDish(id);
    res.status(200).json(deletedDish);
  };
}
