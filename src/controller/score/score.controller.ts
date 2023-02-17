import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ScoreService } from '../../service/score.service';
import { Request, Response } from 'express';

@Controller('score')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  @Post()
  create(@Req() req: Request, @Res() res: Response) {
    const { contentId, userId } = req.body;
    if (contentId === undefined || userId === undefined) {
      res.status(HttpStatus.BAD_REQUEST).json();
      return;
    }
    this.scoreService.save(contentId, userId);
    res.status(HttpStatus.OK).json();
  }
}
