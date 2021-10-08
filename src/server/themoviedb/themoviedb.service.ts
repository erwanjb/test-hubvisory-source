import { Injectable, ConflictException } from '@nestjs/common';
import axios from 'axios';
import { THEMOVIEDB_API_KEY } from '../config/secrets';
import { VerifyThemovieDBDto } from './dto/verify.themoviedb.dto';
import { UserService } from '../user/user.service';

const baseUrl = 'https://api.themoviedb.org/3/';

@Injectable()
export class TheMovieDBService {
  constructor(private userService: UserService) {}

  async getAPopularActor(getAMovieOfThisActor: boolean) {
    const page: number = Math.round(Math.random() * 10) + 1;
    const getData = await axios.get(
      `${baseUrl}person/popular?page=${page}&api_key=${THEMOVIEDB_API_KEY}`,
    );
    const actors = (getData.data as any).results;
    const actor = actors[Math.floor(Math.random() * actors.length)];
    const { id, name, profile_path, known_for } = actor;
    if (getAMovieOfThisActor) {
      const index = Math.floor(Math.random() * known_for.length);
      const movie = known_for[index];
      const { id: idMovie, title, poster_path } = movie;
      return {
        id,
        name,
        picture: profile_path,
        movie: {
          id: idMovie,
          title,
          picture: poster_path,
        },
      };
    }
    return {
      id,
      name,
      picture: profile_path,
    };
  }

  async getAPopularMovieWithoutThisActor(actorId: number) {
    const getDataActor = await axios.get(
      `${baseUrl}person/${actorId}/movie_credits?api_key=${THEMOVIEDB_API_KEY}`,
    );
    const moviesIdOfActor = (getDataActor.data as any).cast.map(
      (movie) => movie.id,
    );

    let movie = null;
    while (!movie) {
      const page: number = Math.round(Math.random() * 10) + 1;
      const getDataMovie = await axios.get(
        `${baseUrl}movie/popular?page=${page}&api_key=${THEMOVIEDB_API_KEY}`,
      );
      const movies = (getDataMovie.data as any).results;

      for (const newMovie of movies) {
        const found = moviesIdOfActor.find((m) => m === newMovie.id);
        if (!found) {
          movie = {
            id: newMovie.id,
            title: newMovie.title,
            picture: newMovie.poster_path,
          };
          break;
        }
      }
    }
    return movie;
  }

  async getActorAndMovieRandom(session: any, userId: string) {
    if (!session[userId]) {
      session[userId] = {
        points: 0,
        actor: null,
        movie: null,
        response: null,
        highScore: null,
      };
    }

    if (!session[userId].actor || !session[userId].movie) {
      const isActorInMovie: boolean = !!Math.round(Math.random());
      if (isActorInMovie) {
        const getActor = await this.getAPopularActor(true);
        const actor = {
          id: getActor.id,
          name: getActor.name,
          picture: getActor.picture,
        };
        const movie = getActor.movie;

        session[userId].actor = actor;
        session[userId].movie = movie;
        session[userId].response = true;
        return {
          actor,
          movie,
          points: session[userId].points,
        };
      }
      const actor = await this.getAPopularActor(false);
      const movie = await this.getAPopularMovieWithoutThisActor(actor.id);
      session[userId].actor = actor;
      session[userId].movie = movie;
      session[userId].response = false;
      return {
        actor,
        movie,
        points: session[userId].points,
      };
    }
    return {
      actor: session[userId].actor,
      movie: session[userId].movie,
      points: session[userId].points,
    };
  }

  async verifyResponse(
    verifyDto: VerifyThemovieDBDto,
    session: any,
    userId: string,
  ) {
    const response = verifyDto.response;

    if (
      !(
        session[userId] &&
        session[userId].actor &&
        session[userId].movie &&
        session[userId].response != null
      )
    ) {
      throw new ConflictException('Session non existante');
    }

    const found = session[userId].response;

    if ((response && found) || (!response && !found)) {
      session[userId].points = session[userId].points + 1;
      session[userId].actor = null;
      session[userId].movie = null;
      session[userId].response = null;
      return { response: true, points: session[userId] };
    }
    const user = await this.userService.getUserById(userId);
    const sessionUser = session[userId];

    const points = sessionUser.points;

    session[userId].points = 0;
    session[userId].actor = null;
    session[userId].movie = null;
    session[userId].response = null;

    if (!session[userId].highScore || session[userId].highScore < points) {
      session[userId].highScore = points;
    }

    const highScore = user.highScore;
    if (highScore < points) {
      this.userService.setHighScoreUser(userId, points);
    }
    return { response: false, points, highScore: session[userId].highScore };
  }
}
