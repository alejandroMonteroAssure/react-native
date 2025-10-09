import { Genre } from "./Genre";
import { Movie } from "./movie";

export interface IMovieRepository {
    getPopularMovies(page: number): Promise<Movie[]>;
    getGenres(): Promise<Genre[]>; 
}