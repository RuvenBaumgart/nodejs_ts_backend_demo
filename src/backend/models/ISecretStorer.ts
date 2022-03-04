import { Secret } from '../models/Secret';
import { SecretId } from './SecretId';

export interface ISecretStorer {
  storeSecret(secret: Secret): Promise<SecretId>
}
