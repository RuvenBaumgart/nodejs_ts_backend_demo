import express from 'express';

import { IRoute } from './backend/rest/routes/IRoute';
import { errorHandler } from './backend/services/ErrorHandler';

export class Application{
  private app: express.Application = express();

  constructor(routes: IRoute[]){
    this.config();
    routes.forEach(route =>{
      route.mount(this.app);
    })
    this.app.use(errorHandler);
  }

  private config():void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended:true}));
  }

  public startApplication(port: number): void{
    this.app.listen(port, ()=> {
      console.log(`Application is running and listening on port ${port}`);
    })
  }
}
