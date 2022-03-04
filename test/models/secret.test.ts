import { SecretToShortError } from '../../src/backend/error/SecretToShortError';
import { Secret } from '../../src/backend/models/Secret';

describe('Secret Test', ()=>{
  it('should create a instance of the Secret class', ()=>{
    expect(new Secret("123testSecret")).toBeInstanceOf(Secret);
  })

  // expect needs to get a function and below is the workaround
  it('should throw an error if the secret has less than 3 characters', ()=>{
    expect(() => new Secret("123")).toThrow(SecretToShortError);
  })

})
