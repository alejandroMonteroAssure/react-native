import { Image, View } from "react-native";
import type { Movie } from "../../services/domain/movie";

type MovieProps = {
    movie: Movie;
    width: number;
}

const MovieElement = ({movie, width}: MovieProps) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdropPath}` }}
                style={{
                    width: width,
                    height: width,
                    resizeMode: "cover",
                }}
            />
        </View>
    )
}

export default MovieElement;