import { DishModel, IDish } from '../models/dishes'
import { HydratedDocument } from 'mongoose';

export class DishService {

  async getAllDishes(): Promise<IDish[]> {
    return await DishModel.find().lean(); 
  }

  async getDishById(id: string): Promise<IDish | null> {
    return await DishModel.findById(id).lean();
  }

  async getDishesByMenu(menu: string): Promise<IDish[]> {
    return await DishModel.find({ 'availability.menu': menu }).lean();
  }

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

  async updateDish(id: string, dishData: Partial<IDish>): Promise<IDish | null> {
    return await DishModel.findByIdAndUpdate(id, dishData, { returnDocument: 'after' }).lean();
  }

  async deleteDish(id: string): Promise<IDish | null> {
    return await DishModel.findByIdAndDelete(id).lean();
  }
  
}
