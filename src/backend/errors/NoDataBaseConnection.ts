export class NoDataBaseConnection extends Error{
  constructor(message: string){
    super(message);
    this.name = "NoDataBaseConnection";
  }
}
