export class SecretToShortError extends Error{
  constructor(message: string){
    super(message);
    this.name = "SecretToShortError";
  }
}
