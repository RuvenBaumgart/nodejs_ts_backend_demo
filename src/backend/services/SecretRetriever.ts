import { ISecretRetriever } from '../models/ISecretRetriever';
import { Secret } from '../models/Secret';
import { SecretId } from '../models/SecretId';
import { ISecretRepository } from '../repositories/ISecretRepository';
import { DataBaseError } from '../error/DataBaseError'

export class SecretRetriever implements ISecretRetriever{
  private secretRepository: ISecretRepository;

  constructor(secretRepository: ISecretRepository){
    this.secretRepository = secretRepository;
  }
  
  async retrieveSecret(secretId: SecretId): Promise<Secret> {
    const secret = await this.secretRepository.getSecretBySecretId(secretId);
    if(secret === null){
      throw new DataBaseError(`No Secret for the SecretId ${secretId.getSecretId} found`);
    }
    return secret;
  }

  getSecretRepository(): ISecretRepository{
    return this.secretRepository;
  }

}
