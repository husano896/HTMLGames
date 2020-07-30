import * as functions from 'firebase-functions';

// const CollectionName = 'CatchOrangeJam';
export const CatchOrangeJam = functions.https.onRequest((request: functions.Request, response: functions.Response) => {
  const method = request.query?.method as string;
  switch (method) {
    case 'test':
      TestRequest(request, response, method);
      break;
    default:
      invalidRequest(request, response, method);
      break;
  }
});

function TestRequest(request: functions.Request, response: functions.Response, method: string) {
  response.send({ method, message: 'hello' });
}

function invalidRequest(request: functions.Request, response: functions.Response, method: string) {
  response.status(400).send({ method, message: 'invalid request' });
}