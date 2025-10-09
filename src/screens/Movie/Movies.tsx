import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { movieStyles } from "./Movie.styles";
import { useEffect } from "react";
import { getPopularMovies } from "../../services/MDBservices";

const Movies = () => {

    useEffect(() => {
        getPopularMovies().then(response => {console.log(response)});
    }, []);

    return (
        <SafeAreaView style={movieStyles.container}>
            <Text>Movies Screen</Text>
        </SafeAreaView>
    );
};

export default Movies;
