import * as express from 'express';

export const authUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authorizationHeaderValue = req.header('Authorization');
  if (authorizationHeaderValue === undefined) {
    res.status(403).send();
    return;
  }
  const token = authorizationHeaderValue.replace('Bearer ', '');
  if (token === 'ABCDEF1234567890' || token === '1234567890ABCDEF') {
    next();
    return;
  }
  if (token === 'ADMINADMINADMIN') {
    next();
    return;
  }
  res.status(403).send();
  return;
};

export const authAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authorizationHeaderValue = req.header('Authorization');
  if (authorizationHeaderValue === undefined) {
    res.status(403).send();
    return;
  }
  const token = authorizationHeaderValue.replace('Bearer ', '');
  if (token === 'ADMINADMINADMIN') {
    next();
    return;
  }
  res.status(403).send();
  return;
};
