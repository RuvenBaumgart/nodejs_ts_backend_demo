import { NextFunction, request, response, Request, Response} from 'express';

import { ValidationError } from '../../../src/backend/error/ValidationError';
import { SecretController } from '../../../src/backend/rest/controllers/SecretController';
import { ISecretRetriever } from '../../../src/backend/models/ISecretRetriever';
import { DataBaseError } from '../../../src/backend/error/DataBaseError';
import { Secret } from '../../../src/backend/models/Secret';

describe("SecretsController Test", ()=>{
  it("Should throw an exception when url is missing an secretid", ()=>{
    const next: NextFunction = jest.fn();
    const secretRetriever: ISecretRetriever = {
      retrieveSecret: jest.fn()
    }
    const secretController = new SecretController(secretRetriever);
    secretController.retrieveSecretById(request, response, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new ValidationError("Unknown SecretId"));
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

      const secretController = new SecretController(secretRetriever);
      expect( await secretController.retrieveSecretById(req, response, next)).toThrowError;
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

    const secretController = new SecretController(secretRetriever);
    await secretController.retrieveSecretById(req, res, next);
    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledWith(200);
  })
})
