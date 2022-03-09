import { Application } from 'express';

export interface IRoute{
  mount(application: Application): void;
}
