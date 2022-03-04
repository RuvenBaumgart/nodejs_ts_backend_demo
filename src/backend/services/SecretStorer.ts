import { ISecretStorer } from '../models/ISecretStorer';
import { Secret } from '../models/Secret';
import { SecretId } from '../models/SecretId';
import { ISecretRepository } from '../repositories/ISecretRepository';
import { ITokenGenerator } from './ITokenGenerator';

export class SecretStorer implements ISecretStorer{
  private secretRepository: ISecretRepository;
  private tokenGenerator: ITokenGenerator;

  constructor(secretRepository: ISecretRepository, tokenGenerator: ITokenGenerator){
    this.secretRepository = secretRepository;
    this.tokenGenerator = tokenGenerator;
  }
  async storeSecret(secret: Secret): Promise<SecretId> {
    const token = this.tokenGenerator.generate();
    const secretId = new SecretId(token);
    await this.secretRepository.storeSecret(secret, secretId);
    return secretId;
  }

  getSecretRepository(): ISecretRepository{
    return this.secretRepository;
  }

  getTokenGenerator(): ITokenGenerator{
    return this.tokenGenerator;
  }

}
