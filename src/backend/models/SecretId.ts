export class SecretId{
  private urlid: string;

  constructor(urlid: string){
    this.urlid = urlid;
  }

  getUrlId(){
    return this.urlid;
  }
}
