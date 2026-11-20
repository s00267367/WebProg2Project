import { Router } from 'express';
import { DishController } from '../controllers/dishes';
import { validate } from '../middleware/validate.middleware';
import { createDishZSchema, dishParamsSchema, dishQuerySchema, updateDishZSchema } from '../models/dishes';


const router = Router();
const dishController = new DishController();

router.get('/', validate(dishQuerySchema), dishController.getDishes);
router.get('/:id', validate(dishParamsSchema), dishController.getDishById);
router.post('/', validate(createDishZSchema), dishController.createDish);
router.put('/:id', validate(updateDishZSchema), dishController.updateDish);
router.delete('/:id', validate(dishParamsSchema), dishController.deleteDish);

export default router;
