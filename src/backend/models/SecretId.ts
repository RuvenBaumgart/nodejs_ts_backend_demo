export class SecretId{
  private secretId: string;

  constructor(secretId: string){
    this.secretId = secretId;
  }

  getSecretId(){
    return this.secretId;
  }
}
