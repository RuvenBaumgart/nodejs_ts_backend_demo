import mongoose from 'mongoose';

import { NoDataBaseConnection } from '../errors/NoDataBaseConnection';
import { Secret } from '../models/Secret';
import { SecretId } from '../models/SecretId';
import { SecretModel } from '../models/SecretModel';
import { ISecretRepository } from './ISecretRepository';

export class SecretRepository implements ISecretRepository{

  constructor(){}

  async getSecretBySecretId(secretId: SecretId): Promise<Secret> {
   const doc = await SecretModel.findOne({secretId: secretId.getSecretId()});
   return new Secret(doc?.secret);
  }

  async removeSecretBySecretId(secretId: SecretId): Promise<void> {
    const res = await SecretModel.remove({secretId: secretId.getSecretId()});
    return res.acknowledged;
  }


  async storeSecret(secret: Secret, secretId: SecretId): Promise<SecretId> {
      const res =  await SecretModel.create({secretId: secretId.getSecretId(), secret: secret.getSecret()});
      if(res !== null){
        return new SecretId(res?.secretId);
      }
      console.log("Error during storing a new secret")
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
