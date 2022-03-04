import mongoose from 'mongoose';

const secretScheme = new mongoose.Schema({
  secretId: String,
  secret: String
})


export const SecretModel = mongoose.model("SecretModel", secretScheme);
