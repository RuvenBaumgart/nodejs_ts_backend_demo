import { Secret } from '../../src/backend/models/Secret';
import { SecretId } from '../../src/backend/models/SecretId';
import { ISecretRepository } from '../../src/backend/repositories/ISecretRepository';
import { SecretRetriever } from '../../src/backend/services/SecretRetriever';

describe("Secret Retriever Test", () =>{
  it("should retrieve a secret", () =>{
    const secretId = new SecretId("asdfghjklöä ");
    //no implementation needed for unit test

    const secretReposiotry: ISecretRepository = {
      getSecretBySecretId: jest.fn().mockResolvedValue(new Secret("someSecret")),
      removeSecretBySecretId: jest.fn(),
      storeSecret: jest.fn(),
    };

    const secretRetriever = new SecretRetriever(secretReposiotry);
    expect(secretRetriever.retrieveSecret(secretId)).resolves.toEqual(new Secret("someSecret"));
  });
});
