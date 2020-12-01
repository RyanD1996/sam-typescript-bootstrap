import { expect } from 'chai';
import handler from '../TestFunction/TestFunction';

describe('TestFunction', () => {
  it('should return 200', async () => {
    //@ts-ignore
    let result = await handler();
    expect(result).to.deep.equal({
      statusCode: 200,
      body: JSON.stringify({ message: 'OK' }),
    });
  });
});
