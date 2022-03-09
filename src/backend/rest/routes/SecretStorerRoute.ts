import { Application } from 'express';

import { SecretStorerController } from '../controllers/SecretStorerController';
import { IRoute } from './IRoute';

export class SecretStorerRoute implements IRoute{
  private secretStorerController: SecretStorerController;

  constructor(secretStorerController: SecretStorerController){
    this.secretStorerController = secretStorerController;
  }
  mount(application: Application): void {
    application.route("/api/secret")
      .post(this.secretStorerController.storeSecret.bind(this.secretStorerController));
  }

}
