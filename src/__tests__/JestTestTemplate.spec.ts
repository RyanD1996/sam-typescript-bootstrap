import expect from 'jest';
import handler from '../TestFunction/TestFunction';

test('handler returns 200', async () => {
  const result = await handler();
  expect(result).toMatchObject({
    statusCode: 200,
    body: JSON.stringify({ message: 'OK' }),
  });
});
