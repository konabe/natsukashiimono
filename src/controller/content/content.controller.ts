import { Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ContentService } from '../../service/content.service';
import { Request, Response } from 'express';
import { Content } from '../../infrastructure/database/content/content.entity';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const contents = await this.contentService.findAll();
    res.status(HttpStatus.OK).json(contents);
  }

  @Post()
  save(@Req() req: Request, @Res() res: Response) {
    const { name, description, imageUrl } = req.body;
    if (
      name === undefined ||
      description === undefined ||
      imageUrl === undefined
    ) {
      res.status(HttpStatus.BAD_REQUEST).json();
      return;
    }
    const content = new Content();
    content.name = name;
    content.description = description;
    content.imageUrl = imageUrl;
    this.contentService.save(content);
    res.status(HttpStatus.OK).json();
  }
}
