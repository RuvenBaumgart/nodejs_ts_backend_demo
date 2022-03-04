import { Secret } from '../../src/backend/models/Secret';
import { SecretId } from '../../src/backend/models/SecretId';
import { ISecretRepository } from '../../src/backend/repositories/ISecretRepository';
import { ITokenGenerator } from '../../src/backend/services/ITokenGenerator';
import { SecretStorer } from '../../src/backend/services/SecretStorer';

 describe("Secret Storer Test", ()=>{
   it("should store a secret and return the url", ()=>{
      const secretId = new SecretId("asdfghklöää");

      const tokenGenerator: ITokenGenerator = {
        generate: jest.fn().mockReturnValue("asdfghklöää")
      }

      const secretRepository: ISecretRepository = {
        getSecretBySecretId: jest.fn(),
        removeSecretBySecretId: jest.fn(),
        storeSecret: jest.fn(),
      };

      const secretStorer = new SecretStorer(secretRepository, tokenGenerator);
      expect(secretStorer.storeSecret(new Secret("12345"))).resolves.toEqual(secretId);
   });
 });
