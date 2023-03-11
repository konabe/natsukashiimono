import * as express from 'express';

export class StubPostSigninController {
  async invoke(req: express.Request, res: express.Response): Promise<void> {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
      res.status(400).send();
      return;
    }

    if (email === 'user1@example.com' && password === 'pass') {
      res.status(200).json({
        token: 'ABCDEF1234567890',
      });
      return;
    }
    if (email === 'user2@example.com' && password === 'pass') {
      res.status(200).json({
        token: '1234567890ABCDEF',
      });
      return;
    }
    if (email === 'admin@example.com' && password === 'pass') {
      res.status(200).json({
        token: 'ADMINADMINADMIN',
      });
      return;
    }
    res.status(401).send();
  }
}
