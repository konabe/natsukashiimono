import { Response } from 'express';
import {
  BaseRequest,
  ControllerAdaptor,
  ValidatedOptions,
} from '../src/controller/controllerAdaptor';

class RequestForStub extends BaseRequest {}

export class ControllerAdaptorStub extends ControllerAdaptor<RequestForStub> {
  allowed = ['admin', 'user'];
  createRequest(_: any): RequestForStub {
    return new RequestForStub();
  }
  validated(
    _: RequestForStub,
    res: Response<any, Record<string, any>>,
    __: ValidatedOptions,
  ): Promise<void> {
    res.status(200).json();
    return;
  }
}
