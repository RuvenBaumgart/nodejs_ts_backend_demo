
export class Secret{
  private secret: string

  constructor(secret?: string){
    this.secret = secret || "";
  };

  getSecret(): string{
    return this.secret;
  }
}
