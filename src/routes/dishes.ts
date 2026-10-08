import { Router } from 'express';
import { DishController } from '../controllers/dishes';

const router = Router();
const dishController = new DishController();

router.get('/', dishController.getDishes);

router.get('/:id', dishController.getDishById);
router.post('/', dishController.createDish);
router.put('/:id', dishController.updateDish);
router.delete('/:id', dishController.deleteDish);

export default router;
