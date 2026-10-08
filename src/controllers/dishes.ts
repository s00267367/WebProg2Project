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
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the update dish by id request with dish id ${req.params.id}` }); 
  };

  deleteDish = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the delete dish by id request with dish id ${_req.params.id}` }); 
  };
}
