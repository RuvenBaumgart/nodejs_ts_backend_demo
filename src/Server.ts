import { Application } from './Application';
import { SecretRepository } from './backend/repositories/SecretRepository';
import { SecretRetrieveController } from './backend/rest/controllers/SecretRetrieveController';
import { SecretStorerController } from './backend/rest/controllers/SecretStorerController';
import { IRoute } from './backend/rest/routes/IRoute';
import { SecretRetrieverRoute } from './backend/rest/routes/SecretRetrieverRoute';
import { SecretStorerRoute } from './backend/rest/routes/SecretStorerRoute';
import { SecretRetriever } from './backend/services/SecretRetriever';
import { SecretStorer } from './backend/services/SecretStorer';
import { UniqueTokenGenerator } from './backend/utilities/UniqueTokenGenerator';

const secretRepository = new SecretRepository();
const secretRetriever = new SecretRetriever(secretRepository);
const secretRetrieverController = new SecretRetrieveController(secretRetriever);
const secretRetrieverRoute = new SecretRetrieverRoute(secretRetrieverController);

const tokenGenerator = new UniqueTokenGenerator();
const secretStorer = new SecretStorer(secretRepository, tokenGenerator);
const secretStorerController = new SecretStorerController(secretStorer);
const secretStorerRoute = new SecretStorerRoute(secretStorerController);

const routes: IRoute[] = [];
routes.push(secretStorerRoute);
routes.push(secretRetrieverRoute);

const application = new Application(routes);
application.startApplication((parseInt(process.argv[1]!)) || 3000);
