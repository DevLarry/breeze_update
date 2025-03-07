/* eslint-disable prettier/prettier */
import { Controller, Get, Next, Redirect, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { NextFunction, Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("*")
  getHello(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction){
    if(req.url.startsWith("/api"))
      next()
    res.render("index")
  }
  
}
