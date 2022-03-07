import { NextFunction, Request, Response } from 'express';

import { ValidationError } from '../../error/ValidationError';
import { ISecretStorer } from '../../models/ISecretStorer';

export class SecretStorerController {
  private secretStorer;

  constructor(secretRepository: ISecretStorer){
    this.secretStorer = secretRepository;
  }

  async storeSecret(req: Request, res: Response, next: NextFunction) {
    try{
      this.validateBody(req);
      const secretId = await this.secretStorer.storeSecret(req.body.secret);
      res.status(200);
      res.json(secretId.getSecretId());
    } catch(err){
      next(err);
    }
  }

  private validateBody(req: Request) {
    if (!req.body || !req.body.secret){
      throw new ValidationError("Request body not valid");
    }
  }

  getSecretRepository(): ISecretStorer{
    return this.secretStorer;
  }
}
