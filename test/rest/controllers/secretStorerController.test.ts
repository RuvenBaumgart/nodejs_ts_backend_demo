import { NextFunction, Request, request, Response, response } from 'express';

import { ValidationError } from '../../../src/backend/errors/ValidationError';
import { ISecretStorer } from '../../../src/backend/models/ISecretStorer';
import { SecretId } from '../../../src/backend/models/SecretId';
import { SecretStorerController } from '../../../src/backend/rest/controllers/SecretStorerController';

let next: NextFunction;
let req: Request;
let res: Response;

beforeAll( ()=>{
  next = jest.fn();
  req = expect.any(request);
  res = expect.any(response);
  res.status = jest.fn();
  res.json = jest.fn();
})

describe("Secret Storer Controller Test", ()=>{
  it("should throw an error when the body with the secret is not provided", async ()=>{
    const secretStorer: ISecretStorer = {
      storeSecret: jest.fn()
    }
    const secretStorerController = new SecretStorerController(secretStorer);
    await secretStorerController.storeSecret(req, res, next);
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new ValidationError("Request body not valid"));
  });

  it("should return a secretId when the secret is stored", async ()=>{

    req.body = {secret: "This is a Test Secret"};
    const secretStorer: ISecretStorer = {
      storeSecret: jest.fn().mockImplementation(()=>{
        return new SecretId("Test SecretId");
      })
    }
    const secretStorerController = new SecretStorerController(secretStorer);
    await secretStorerController.storeSecret(req, res, next);
    expect(next).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith("Test SecretId");

  })
})
