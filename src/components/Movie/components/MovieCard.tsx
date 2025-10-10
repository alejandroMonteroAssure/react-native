import { Image, View } from "react-native";
import type { Movie } from "../../../services/domain/movie";
import { TMDB_IMAGE_BASE_URL } from '@env';

type MovieProps = {
    movie: Movie;
    width: number;
    height?: number;
}

const MovieElement = ({ movie, width, height }: MovieProps) => {
    return (

        <Image
            source={{ uri: `${TMDB_IMAGE_BASE_URL}/original${movie.backdropPath}` }}
            style={{
                width: width,
                height: height || width,
                resizeMode: "cover",
            }}
        />
    )
}

export default MovieElement;