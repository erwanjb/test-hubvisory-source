import { Controller, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/create.user.dto';
import { UserService } from './user.service';
import { ValidationPipe } from '../config/validation.pipe';
import { User } from './user.entity';

interface RequestWithUser extends Request {
  user: User;
}

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
