import { Request, Response } from 'express';
import { DishService } from '../services/dishes';

const dishService = new DishService();

export class DishController {

  getDishes = async (_req: Request, res: Response): Promise<void> => {

   try {
      const dishes = await dishService.getAllDishes();
      res.status(200).json(dishes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dishes', error });
    }

  };


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
