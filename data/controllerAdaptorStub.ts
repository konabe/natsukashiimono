import { Response } from 'express';
import {
  BaseRequest,
  BaseResponse,
  ControllerAdaptor,
  ValidatedOptions,
} from '../src/controller/controllerAdaptor';

class RequestForStub extends BaseRequest {}
class ResponseForStub extends BaseResponse {}

export class ControllerAdaptorStub extends ControllerAdaptor<
  RequestForStub,
  ResponseForStub
> {
  allowed = ['admin', 'user'];
  createRequest(_: any): RequestForStub {
    return new RequestForStub();
  }
  async validated(_: RequestForStub, __: ValidatedOptions): Promise<void> {
    this.returnWithSuccess(new ResponseForStub());
    await new Promise((resolve) => setTimeout(resolve, 0));
    return;
  }
}
