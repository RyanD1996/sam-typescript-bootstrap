import { APIGatewayProxyResult } from 'aws-lambda';

const handler = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'OK' }),
  };
};

export default handler;
