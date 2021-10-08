import { Module } from '@nestjs/common';
import { TheMovieDBService } from './themoviedb.service';
import { UserModule } from '../user/user.module';
import { TheMovieDBController } from './themoviedb.controller';

@Module({
  imports: [UserModule],
  controllers: [TheMovieDBController],
  providers: [TheMovieDBService],
  exports: [TheMovieDBService],
})
export class TheMovieDBModule {}
