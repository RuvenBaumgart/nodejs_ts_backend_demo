import mongoose from 'mongoose';

interface ISecretModel extends mongoose.Document{
  secretId: string,
  secret: string
}

const secretSchema = new mongoose.Schema({
  secretId: String,
  secret: String
})


export const SecretModel = mongoose.model<ISecretModel>("SecretModel", secretSchema);
