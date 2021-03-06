import { NextFunction, Request, Response } from 'express';

import { ValidationError } from '../../errors/ValidationError';
import { ISecretStorer } from '../../models/ISecretStorer';
import { Secret } from '../../models/Secret';

export class SecretStorerController {
  private secretStorer: ISecretStorer;

  constructor(secretStorer: ISecretStorer){
    this.secretStorer = secretStorer;
  }

  public async storeSecret(request: Request, response: Response, next: NextFunction) {

    try{
      this.validateBody(request);
      const secretId = await this.secretStorer.storeSecret(new Secret(request.body.secret));
      response.status(200);
      response.json(secretId.getSecretId());

    } catch(err){
      next(err);
    }
  }

  private validateBody(req: Request): void{
    if (!req.body || !req.body.secret){
      throw new ValidationError(`Request Body: ${req.body}, is not valid`);
    }
  }

  public getSecretRepository(): ISecretStorer{
    return this.secretStorer;
  }
}
