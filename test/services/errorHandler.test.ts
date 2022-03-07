import { NextFunction, request, Request, response, Response } from 'express';

import { ValidationError } from '../../src/backend/errors/ValidationError';
import { errorHandler } from '../../src/backend/services/ErrorHandler';

describe("Errorhandler Test", ()=>{
  it("should throw an uncontrolled error with status code 500", ()=>{
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();
    res.status = jest.fn();
    res.json = jest.fn();

    const error = new Error("Internal Server Error");
    errorHandler(error, req, res, next);

   expect(res.status).toBeCalledWith(500);
   expect(res.json).toBeCalledWith({title: "Error", message: "Internal Server Error"});
  })

  it("should throw an custom, controlled error", ()=>{
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();
    res.status = jest.fn();
    res.json = jest.fn();

    const error = new ValidationError("Validation Error");
    errorHandler(error, req, res, next);

   expect(res.status).toBeCalledWith(400);
   expect(res.json).toBeCalledWith({title: "ValidationError", message: "Validation Error"});
  })
})
