import mongoose from 'mongoose';

import { DataBaseError } from '../error/DataBaseError';
import { NoDataBaseConnection } from '../error/NoDataBaseConnection';
import { Secret } from '../models/Secret';
import { SecretId } from '../models/SecretId';
import { SecretModel } from '../models/SecretModel';
import { ISecretRepository } from './ISecretRepository';

export class SecretRepository implements ISecretRepository{

  constructor(){}

  async getSecretBySecretId(secretId: SecretId): Promise<Secret> {
    var secret = new Secret("");
    await SecretModel.findOne({secreetId: secretId.getSecretId}, (err: Error, result: string) =>{
      if(err){
        throw new DataBaseError(err.message);
      } else {
       secret = new Secret(result);
      }
    });
    return secret;
  }

  removeSecretBySecretId(SecretId: SecretId): Promise<void> {
    throw new Error('Method not implemented.');
  }


  async storeSecret(secret: Secret, secretId: SecretId): Promise<SecretId> {
      const res =  await SecretModel.updateOne({secretId: secretId.getSecretId, secret: secret.getSecret});
      if(res.acknowledged === true){
        return secretId;
      } else {
        console.log("Error during storing a new secret")
        throw new NoDataBaseConnection("No Database connection established");
      }
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
