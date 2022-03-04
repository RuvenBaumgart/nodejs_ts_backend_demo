import { NextFunction, request, response } from 'express';

import { ValidationError } from '../../../src/backend/error/ValidationError';
import { SecretRepository } from '../../../src/backend/repositories/SecretRepository';
import { SecretController } from '../../../src/backend/rest/controllers/SecretController';
import { SecretRetriever } from '../../../src/backend/services/SecretRetriever';

describe("SecretsController Test", ()=>{
  it("Should throw an exception when sending an invalid route", ()=>{
    const next: NextFunction = jest.fn();
    const secretController = new SecretController();
    secretController.retrieveSecretById(request, response, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new ValidationError("Unknown SecretId"));
  })

  it("Should throw an error when secretId is not found", ()=> {
    const secretRepository = new SecretRepository();
    const secretRetriever = new SecretRetriever(secretRepository);

  })


})
