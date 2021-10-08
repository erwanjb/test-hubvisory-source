import { Controller, Req, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { User } from '../user/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('verifytoken')
  async verifytoken(@Req() req: Request) {
    return this.authService.verifytoken(req.headers.authorization);
  }
}
