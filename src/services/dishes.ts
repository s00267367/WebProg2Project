import { DishModel, IDish } from '../models/dishes'
import { HydratedDocument } from 'mongoose';

export class DishService {

  async getAllDishes(): Promise<IDish[]> {
    return await DishModel.find().lean(); 
  }

  async getDishById(id: string): Promise<IDish | null> {
    return await DishModel.findById(id).lean();
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
