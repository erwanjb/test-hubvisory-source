import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { THEMOVIEDB_API_KEY } from '../config/secrets';
import { VerifyThemovieDBDto } from './dto/verify.themoviedb.dto';
import { UserService } from '../user/user.service';

const baseUrl = 'https://api.themoviedb.org/3/';

@Injectable()
export class TheMovieDBService {
  constructor(
    private userService: UserService,
  ) {}

  async getAPopularActor (getAMovieOfThisActor: boolean) {
    const page: number = Math.round(Math.random() * 10) + 1;
    const getData = await axios.get(`${baseUrl}person/popular?page=${page}&api_key=${THEMOVIEDB_API_KEY}`);
    const actors = (getData.data as any).results;
    const actor = actors[Math.round(Math.random() * actors.length)];
    const {id, name, profile_path, known_for} = actor;
    if (getAMovieOfThisActor) {
        const movie = known_for[Math.round(Math.random() * known_for.length)];
        const {id: idMovie, title, poster_path} = movie;
        return {
            id,
            name,
            picture: profile_path,
            movie: {
                id: idMovie,
                title,
                picture: poster_path
            }
        }
    }
    return {
        id,
        name,
        picture: profile_path
    }
  }

  async getAPopularMovieWithoutThisActor(actorId: number) {

    const getDataActor = await axios.get(`${baseUrl}person/${actorId}/movie_credits?api_key=${THEMOVIEDB_API_KEY}`);
    const moviesIdOfActor = (getDataActor.data as any).cast.map(movie => movie.id);

    let movie = null;
    while (!movie) {
        const page: number = Math.round(Math.random() * 10) + 1;
        const getDataMovie = await axios.get(`${baseUrl}movie/popular?page=${page}&api_key=${THEMOVIEDB_API_KEY}`);
        const movies = (getDataMovie.data as any).results;

        for (const newMovie of movies) {
            const found = moviesIdOfActor.find(m => m === newMovie.id);
            if (!found) {
                movie = {
                    id: newMovie.id,
                    title: newMovie.title,
                    picture: newMovie.poster_path
                };
                break;
            }
        }
    }
    return movie;
  }

  async getActorAndMovieRandom() {
    const isActorInMovie: boolean = !!Math.round(Math.random());

    if (isActorInMovie) {
        const getActor = await this.getAPopularActor(true);
        const actor = {
            id: getActor.id,
            name: getActor.name,
            picture: getActor.picture
        };
        const movie = getActor.movie;
        return {
            actor,
            movie
        }
    }
    const actor = await this.getAPopularActor(false);
    const movie = await this.getAPopularMovieWithoutThisActor(actor.id);
    return {
        actor,
        movie
    }
  }

  async verifyResponse(verifyDto: VerifyThemovieDBDto, session: any, userId: string) {
      const actorId = verifyDto.actorId;
      const movieId = verifyDto.movieId;
      const response = verifyDto.response;

      const getDataActor = await axios.get(`${baseUrl}person/${actorId}/movie_credits?api_key=${THEMOVIEDB_API_KEY}`);
      const moviesIdOfActor = (getDataActor.data as any).cast.map(movie => movie.id);

      const found = moviesIdOfActor.find(m => m === movieId);
      if ((response && found) || (!response && !found)) {
        session[userId] = session[userId] + 1;
        return { response: true, points: session[userId] };
      }
      const user = await this.userService.getUserById(userId);
      const points = session[userId];
      const highScore = user.highScore;
      if (highScore < points) {
        this.userService.setHighScoreUser(userId, points);
      }
      return { response: false, points };
  }
}
