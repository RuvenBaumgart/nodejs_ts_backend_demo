import { Secret } from './Secret';
import { SecretId } from './SecretId';

export interface ISecretRetriever{
  retrieveSecret(secretId: SecretId): Promise<Secret>

}
