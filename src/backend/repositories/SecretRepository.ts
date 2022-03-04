import mongoose from 'mongoose';

import { NoDataBaseConnection } from '../error/NoDataBaseConnection';
import { Secret } from '../models/Secret';
import { SecretId } from '../models/SecretId';
import { SecretModel } from '../models/SecretModel';
import { ISecretRepository } from './ISecretRepository';

export class SecretRepository implements ISecretRepository{

  constructor(){}

  async getSecretBySecretId(secretId: SecretId): Promise<Secret> {
   const secret = await SecretModel.findOne(secretId);
   return secret;
  }

  removeSecretBySecretId(SecretId: SecretId): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async storeSecret(secret: Secret, secretId: SecretId): Promise<SecretId> {

      const res =  await SecretModel.updateOne({secretId: secretId}, {secret: secret});
      if(res.acknowledged === true){
        return secretId;
      } else {
        console.log("Error during storing a new secret")
      }

    throw new NoDataBaseConnection("No Database connection established");
  }

  private async establishConnection(url: string): Promise<any>{
     return await mongoose.connect('mongodb://localhost:27017/test');
  }

 public connectToDb(url: string): void{
    this.establishConnection(url)
    .then( (val) =>{
      console.log("Connection to MongoDb is set");
    })
    .catch( (err) => {
      console.log(err);
    });
  };
}
