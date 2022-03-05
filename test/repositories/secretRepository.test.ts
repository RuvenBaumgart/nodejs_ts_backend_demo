import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { SecretRepository } from '../../src/backend/repositories/SecretRepository'
import { Secret } from '../../src/backend/models/Secret';
import { SecretId } from '../../src/backend/models/SecretId';

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
  it("should store a secret", ()=>{
    expect(secretRepository.storeSecret(secret, secretId)).resolves.toEqual(secretId);
  })

  it("should retrieve a previous stored secret", async () =>{
    secretRepository.storeSecret(secret, secretId);
    await expect(secretRepository.getSecretBySecretId(secretId)).resolves.toEqual(secret);
  })
})

