import { getMockReq } from '@jest-mock/express';

const headerMock = () => {
  return jest.fn().mockImplementation((name: string) => {
    if (name === 'Authorization') return 'Bearer 01234';
  });
};

export const getGETMockReqWithToken = () => {
  return getMockReq({
    method: 'GET',
    header: headerMock(),
  });
};

export const getPOSTMockReqWithToken = (obj: any) => {
  return getMockReq({
    method: 'POST',
    body: obj,
    header: headerMock(),
  });
};

export const getPATCHMockReqWithToken = (obj: any) => {
  return getMockReq({
    method: 'PATCH',
    body: obj,
    header: headerMock(),
  });
};
