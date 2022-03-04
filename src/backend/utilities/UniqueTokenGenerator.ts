import uniqid from 'uniqid';

import { ITokenGenerator } from '../services/ITokenGenerator';

export class UniqueTokenGenerator implements ITokenGenerator{
  generate(): string {
    return uniqid();
  }
}
