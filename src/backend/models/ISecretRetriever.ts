import { Secret } from './Secret';
import { SecretId } from './SecretId';

export interface ISecretRetriever{
  retrieveSecret(urlid: SecretId): Promise<Secret>

}
