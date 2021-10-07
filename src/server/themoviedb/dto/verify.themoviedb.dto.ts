import { IsString, IsBoolean } from 'class-validator';

export class VerifyThemovieDBDto {
  @IsString()
  movieId: number;

  @IsString()
  actorId: number;

  @IsBoolean()
  response: boolean;
}
