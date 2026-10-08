import { Request, Response } from 'express';

export class DishController {

  getDishes = async (_req: Request, res: Response): Promise<void> => {

    res.status(200).json({ success: true, 
      data: "this is just dummy for now a response to the get all dishes request" });
  };


  getDishById = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the get dish by id request with dish id ${req.params.id}` });
  };

  createDish = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the create dish request the data received in the request body is: ${JSON.stringify(req.body)}` });
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
