import { SecretId } from '../../src/backend/models/SecretId';

describe('SecretId Test', ()=>{
  it('should create a instance of the SecretIdclass', ()=>{
    expect(new SecretId("123testSecretId")).toBeInstanceOf(SecretId);
  })
})
