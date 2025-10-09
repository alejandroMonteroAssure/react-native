import axios, { AxiosError } from "axios";
import { TMDB_ACCESS_TOKEN, TMDB_API_KEY, TMDB_BASE_URL } from '@env';

export const getPopularMovies = async () => {
    try {
        const resposne = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
            headers: {
                Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            params: {
                language: 'es-ES',
                page: 1,
            }
        });
        return resposne.data.results;
    }
    catch (error) {
        if (error instanceof AxiosError) {
            console.error('TMDB API error:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
    }
}