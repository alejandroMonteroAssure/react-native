import { Movie } from "./movie";

export interface IMovieRepository {
    getPopularMovies(page: number): Promise<Movie[]>;
}