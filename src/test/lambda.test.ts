import * as lambda from '../lambda';
import superagent from 'superagent';
import { APIGatewayProxyEvent } from 'aws-lambda';
import testData from '../mocks/mock-data.json'

const generateMockData = () => {
  let mockData: APIGatewayProxyEvent =  {
    body: null,
    headers: {},
    httpMethod: null,
    isBase64Encoded: null,
    path: null,
    pathParameters: {},
    queryStringParameters: {},
    stageVariables: null,
    requestContext: null,
    resource: null,
    multiValueHeaders: null,
    multiValueQueryStringParameters: null
  }
  return mockData;
}

jest.mock('superagent');

describe('successfully return correct data', () => {
  beforeEach(() => {
    superagent.get.mockResolvedValue({ body: testData });
  });

  it('locationCodeHandler should return data', async () => {
    const testProxy = generateMockData();
    testProxy.pathParameters['locationCode'] = 'VAL';
    const response = await lambda.locationCodeHandler(testProxy);
    expect(response.body.length > 0).toBe(true);
  });
});


describe('unsuccessful return data', () => {
  beforeEach(() => {
    superagent.get.mockRejectedValue(new Error('Error'));
  });

  it('locationCodeHandler should throw error if locationCode is missing', async () => {
    const testProxy = generateMockData();
    testProxy.pathParameters['locationCode'] = '';
    const response = await lambda.locationCodeHandler(testProxy);
    expect(JSON.parse(response.body).status).toBe('Error');
  });

});

