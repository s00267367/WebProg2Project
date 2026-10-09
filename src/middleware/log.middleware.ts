import { Request, Response, NextFunction } from 'express';

export const logURL = async (req : Request, _res : Response, next : NextFunction): Promise<void> => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
};