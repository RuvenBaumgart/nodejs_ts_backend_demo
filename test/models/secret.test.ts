
import { Secret } from '../../src/backend/models/Secret';

describe('Secret Test', ()=>{
  it('should create a instance of the Secret class', ()=>{
    expect(new Secret("123testSecret")).toBeInstanceOf(Secret);
  })

})
