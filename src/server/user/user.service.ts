import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async createUser(userInfos: CreateUserDto) {
    return this.userRepository.createUser(userInfos);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne(id);
    return user;
  }
}
