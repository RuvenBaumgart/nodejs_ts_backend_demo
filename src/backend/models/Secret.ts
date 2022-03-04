import { SecretToShortError } from '../error/SecretToShortError';

export class Secret{
  private secret: string
  constructor(secret: string){
    if(secret.length <= 3) throw new SecretToShortError("The provided Secret is to short");
    this.secret = secret;
  };

  getSecret(): string{
    return this.secret;
  }
}
