import { NextFunction, Request, Response } from 'express';

import { ValidationError } from '../../error/ValidationError';

 export class SecretController {
  retrieveSecretById(request: Request, response: Response, next: NextFunction) {
      try{
        if(!request.params?.secretId) throw new ValidationError("Unknown SecretId");
      } catch(err){
        next(err);
      }
  }

}
