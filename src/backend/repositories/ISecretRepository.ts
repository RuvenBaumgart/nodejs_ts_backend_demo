import { Secret } from '../models/Secret';
import { SecretId } from '../models/SecretId';

export interface ISecretRepository{
  getSecretBySecretId(SecretId: SecretId): Promise<Secret>;
  removeSecretBySecretId(SecretId: SecretId): Promise<void>;
  storeSecret(secret: Secret, secretId: SecretId): Promise<SecretId>;
}
