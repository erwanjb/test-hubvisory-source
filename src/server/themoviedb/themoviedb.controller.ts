import { Controller, Get, Post, Body, Req, UseGuards, Session } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TheMovieDBService } from './themoviedb.service';
import { ValidationPipe } from '../config/validation.pipe';
import { VerifyThemovieDBDto } from './dto/verify.themoviedb.dto';
import { Request } from 'express';
import { User } from '../user/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

@Controller('/api/theMovieDB')
export class TheMovieDBController {
  constructor(private theMovieDBService: TheMovieDBService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/getActorAndMovieRandom')
  async getActorAndMovieRandom() {
    return this.theMovieDBService.getActorAndMovieRandom();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/verifyResponse')
  async verifyResponse(@Session() session: Record<string, any>, @Body(new ValidationPipe()) verifyDto: VerifyThemovieDBDto, @Req() req: RequestWithUser) {
    return this.theMovieDBService.verifyResponse(verifyDto, session, req.user.id);
  }
}