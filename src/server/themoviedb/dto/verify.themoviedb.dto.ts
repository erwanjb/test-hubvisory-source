import { IsBoolean } from 'class-validator';

export class VerifyThemovieDBDto {
  @IsBoolean()
  response: boolean;
}
