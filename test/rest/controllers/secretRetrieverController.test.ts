import { NextFunction, request, Request, response, Response } from 'express';

import { DataBaseError } from '../../../src/backend/errors/DataBaseError';
import { ValidationError } from '../../../src/backend/errors/ValidationError';
import { ISecretRetriever } from '../../../src/backend/models/ISecretRetriever';
import { Secret } from '../../../src/backend/models/Secret';
import { SecretRetrieveController } from '../../../src/backend/rest/controllers/SecretRetrieveController';

describe("SecretsController Test", ()=>{
  it("Should throw an exception when url is missing an secretid", ()=>{
    const next: NextFunction = jest.fn();
    const secretRetriever: ISecretRetriever = {
      retrieveSecret: jest.fn()
    }
    const secretRetrieveController = new SecretRetrieveController(secretRetriever);
    secretRetrieveController.retrieveSecretById(request, response, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new ValidationError("No SecretId"));
  })

  it("Should throw an error when secret is not found", async ()=> {
      const next: NextFunction = jest.fn();
      const req: Request = expect.any(request);
      req.params = {secretId: "someSecretId"};

      const secretRetriever: ISecretRetriever = {
        retrieveSecret: jest.fn().mockImplementation( async () =>{
          throw new DataBaseError("Secret not found in database");
        })
      }

      const secretRetrieveController = new SecretRetrieveController(secretRetriever);
      expect( await secretRetrieveController.retrieveSecretById(req, response, next)).toThrowError;
  })

  it("Should return a secret when found in database", async ()=>{
    const next: NextFunction = jest.fn();
    const req: Request = expect.any(request);
    req.params = {secretId: "someSecretId"};
    const res: Response = expect.any(response);
    res.status = jest.fn();
    res.json = jest.fn();

    const secretRetriever: ISecretRetriever = {
      retrieveSecret: jest.fn().mockImplementation(()=>{
        return new Secret("test Secret");
      })
    }

    const secretRetrieveController = new SecretRetrieveController(secretRetriever);
    await secretRetrieveController.retrieveSecretById(req, res, next);
    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledWith(200);
  })

})
