import { Application } from 'express';

import { SecretRetrieveController } from '../controllers/SecretRetrieveController';
import { IRoute } from './IRoute';

export class SecretRetrieverRoute implements IRoute{
  private secretRetrieverController: SecretRetrieveController;

  constructor(secretRetrieverController: SecretRetrieveController){
    this.secretRetrieverController = secretRetrieverController
  }
  mount(application: Application): void {
    application.route("/api/secret/:secretId")
     .get(this.secretRetrieverController.retrieveSecretById.bind(this.secretRetrieverController));
  }

}
