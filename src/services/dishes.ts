import { DishModel, IDish } from '../models/dishes'
import { HydratedDocument } from 'mongoose';
import { NotFoundError } from '../utils/app-error';

export class DishService {

  async getDishes(menu?:string, special? :boolean): Promise<IDish[]> {
    const filter: Record<string, unknown> = {};

    

    if (menu !== undefined) {
      filter['availability.menu'] = menu;
    }

    if (special !== undefined) {
      filter['availability.special'] = special;
    }

    return await DishModel.find(filter);
  }

  async getDishById(id: string): Promise<IDish> {
    const dish = await DishModel.findById(id).lean();
    if(!dish) throw new NotFoundError('Dish');
    return dish;
  }

  async getDishesByMenu(menu: string): Promise<IDish[]> {
    const dishes = await DishModel.find({ 'availability.menu': menu }).lean();
    if(!dishes) throw new NotFoundError('Dishes');
    return dishes;
  }

  //Note: validate in middleware
  async getDishesBySpecial(special: string): Promise<IDish[]> {
    if(special !== 'true' && special !== 'false'){
      throw new Error('Invalid special value. Must be "true" or "false".');
    }
    let boolSpecial:boolean;
    if(special === 'true'){
      boolSpecial = true;
    }
    else{
      boolSpecial = false;
    }
    return await DishModel.find({ 'availability.special': boolSpecial }).lean();
  }

  async createDish(dishData: IDish): Promise<HydratedDocument<IDish>> {
    const dish = new DishModel(dishData);
    return await dish.save();
  }

  async updateDish(id: string, dishData: Partial<IDish>): Promise<IDish> {
    const dish = await DishModel.findByIdAndUpdate(id, dishData, { returnDocument: 'after' }).lean();
    if(!dish) throw new NotFoundError('Dish');
    return dish;
  }

  async deleteDish(id: string): Promise<IDish> {
    const dish = await DishModel.findByIdAndDelete(id).lean();
    if(!dish) throw new NotFoundError('Dish');
    return dish
  }
  
}
