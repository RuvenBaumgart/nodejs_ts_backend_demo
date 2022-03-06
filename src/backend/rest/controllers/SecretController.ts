import { NextFunction, Request, Response } from 'express';

import { ValidationError } from '../../error/ValidationError';
import { ISecretRetriever } from '../../models/ISecretRetriever';
import { SecretId } from '../../models/SecretId';


 export class SecretController {
  private secretRetriever: ISecretRetriever;

  constructor(secretRetriever: ISecretRetriever){
    this.secretRetriever = secretRetriever;
  }
  
  async retrieveSecretById (request: Request, response: Response, next: NextFunction) {
      try{
        if(!request.params?.secretId) 
          throw new ValidationError("Unknown SecretId");
        const secretId = request.params.secretId;
        const secret = await this.secretRetriever.retrieveSecret(new SecretId(secretId));
        response.status(200)
        response.json(secret);
      } catch(err){
        next(err);
      }
  }

  public getSecretRetriever(): ISecretRetriever{
    return this.secretRetriever;
  }

}
