import { NextFunction, Request, Response } from 'express';

import { DataBaseError } from '../errors/DataBaseError';
import { ValidationError } from '../errors/ValidationError';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction)  {

  if(error instanceof ValidationError){
    res.status(400); //Bad Request
    res.json({
      title: error.name,
      message: error.message
    })
  } else if(error instanceof DataBaseError) {
    res.status(404); // Not Found
    res.json({
      title: error.name,
      message: error.message
    })
  } else {
    res.status(500); //Internal Server Error
    res.json({
      title: error.name,
      message: error.message
    });
  }
}
