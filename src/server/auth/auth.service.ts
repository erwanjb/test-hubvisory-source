import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findUserById(id: string) {
    const user = await this.userService.getUserById(id);
    return user;
  }
}
