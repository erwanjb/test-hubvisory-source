import { IsString, Length } from 'class-validator';
import { ConstantUser } from '../../../constants/user';

export class CreateUserDto {
  
  @Length(1, ConstantUser.MAXEMAIL)
  @IsString()
  email: string;

  @IsString()
  password: string;

  @Length(1, ConstantUser.MAXNAME)
  @IsString()
  name: string;
}