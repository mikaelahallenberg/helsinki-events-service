import { APIGatewayProxyEvent } from "aws-lambda";
import { EventsPathService } from "./services/path-service";
import superagent from "superagent";

const eventsPathService = new EventsPathService();

const dispatchResponse = (response): any => {
  function isError(res): any {
    return !res.body || Object.keys(res.body).length === 0;
  };

  if (isError(response)) {
    return {
      statusCode: response.statusCode && response.statusCode !== 200 ? response.statusCode : 500,
      body: JSON.stringify({
        status: 'Error',
        message: response.message || 'Something went wrong'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify(response.body),
      headers: {
        'Cache-Control': 'max-age=3600',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    };
  }
};

export const locationCodeHandler = async (
  event: APIGatewayProxyEvent
): Promise<any> => {
  try {
    const locationCode = event.pathParameters.locationCode;
    const url = eventsPathService.getFullPath(locationCode);

    if (!url) {
      return dispatchResponse({ statusCode: 400, message: 'Location code is invalid' });
    }

    return await superagent.get(url)
      .then(response => {
        return dispatchResponse(response);
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    return dispatchResponse(err);
  }
};

