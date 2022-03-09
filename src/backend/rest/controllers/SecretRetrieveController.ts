import { NextFunction, Request, Response } from 'express';

import { ValidationError } from '../../errors/ValidationError';
import { ISecretRetriever } from '../../models/ISecretRetriever';
import { SecretId } from '../../models/SecretId';

 export class SecretRetrieveController {
  private secretRetriever: ISecretRetriever;

  constructor(secretRetriever: ISecretRetriever){
    this.secretRetriever = secretRetriever;
  }

  async retrieveSecretById (request: Request, response: Response, next: NextFunction) {
    try{
      console.log("here");
      this.validateRequest(request);
      const secretId = request.params.secretId;
      const result = await this.secretRetriever.retrieveSecret(new SecretId(secretId!))
      response.status(200)
      response.json(result);
    } catch(err: any){
     next(err)
    }
  };

   private validateRequest(request: Request) {
     if (!request.params?.secretId)
       throw new ValidationError("No SecretId");
   }

  public getSecretRetriever(): ISecretRetriever{
    return this.secretRetriever;
  }

}
