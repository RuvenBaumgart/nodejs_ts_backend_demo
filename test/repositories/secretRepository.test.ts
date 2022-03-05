import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { Secret } from '../../src/backend/models/Secret';
import { SecretId } from '../../src/backend/models/SecretId';
import { SecretRepository } from '../../src/backend/repositories/SecretRepository';

let mongod: MongoMemoryServer;
let secretRepository: SecretRepository;
let secret: Secret;
let secretId: SecretId;

const mongoOps: mongoose.ConnectOptions = {
  autoIndex: true
}

beforeAll(async ()=>{
  mongod = await MongoMemoryServer.create();
  secretRepository = new SecretRepository();
  secretId = new SecretId("asdf23Wasdf");
  secret = new Secret("This is a test secret");

  const uri = mongod.getUri();
  await mongoose.connect(uri, mongoOps);
})

afterAll(async()=>{
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
})


describe("Secret Repository test", ()=>{
  it("should have conneted to in memory database",()=>{
    expect(mongoose.connection.readyState).toEqual(1);
  });

  it("should store a secret", async ()=>{
    const storeSecretSpy = jest.spyOn(secretRepository, 'storeSecret');
    await expect(secretRepository.storeSecret(secret, secretId)).resolves.toEqual(secretId);
    expect(storeSecretSpy).toBeCalledTimes(1);

  });

  it("should retrieve a previous stored secret", async () =>{
   await expect(secretRepository.getSecretBySecretId(secretId)).resolves.toEqual(secret);
  })
})
