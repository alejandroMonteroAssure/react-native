import axios, { AxiosError } from "axios";
import { IMovieRepository } from "../domain/IMovieRepository";
import { Movie } from "../domain/movie";
import { TMDB_ACCESS_TOKEN, TMDB_API_KEY, TMDB_BASE_URL } from '@env';
import { mapToDomain } from "./Mappers";


export class TMDBRepository implements IMovieRepository {
    async getPopularMovies(page: number): Promise<Movie[]> {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}/3/movie/popular`, {
                headers: {
                    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    language: 'es-ES',
                    page: page,
                }
            });
            return response.data.results.map(mapToDomain);
        }
        catch (error) {
            if (error instanceof AxiosError) {
                console.error('TMDB API error:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            return [];
        }
    }

}