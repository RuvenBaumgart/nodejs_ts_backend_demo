import { ISecretRetriever } from '../models/ISecretRetriever';
import { Secret } from '../models/Secret';
import { SecretId } from '../models/SecretId';
import { ISecretRepository } from '../repositories/ISecretRepository';

export class SecretRetriever implements ISecretRetriever{
  private secretRepository: ISecretRepository;

  constructor(secretRepository:ISecretRepository){
    this.secretRepository = secretRepository;
  }
  async retrieveSecret(SecretId: SecretId): Promise<Secret> {
    const secret = await this.secretRepository.getSecretBySecretId(SecretId);
    await this.secretRepository.removeSecretBySecretId(SecretId);
    return secret;
  }

  getSecretRepository(): ISecretRepository{
    return this.secretRepository;
  }

}
