import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PASSWORD_SALT } from '../config/secrets';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userInfos: CreateUserDto) {
    const userAlreadyExist = await this.findOne({ email: userInfos.email });
    if (userAlreadyExist) {
      throw new ConflictException(
        `Un utilisateur avec le même email existe déjà dans la base de donnée`,
      );
    }

    const password = await bcrypt.hash(userInfos.password, PASSWORD_SALT);

    const user = {
      email: userInfos.email,
      name: userInfos.name,
      password,
    };

    await this.save(user);
    return 'utilisateur créé';
  }

  async setHighScoreUser(userId, highScore) {
    await this.update(userId, { highScore });
  }
}
