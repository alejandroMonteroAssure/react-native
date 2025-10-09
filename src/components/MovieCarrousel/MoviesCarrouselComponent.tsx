import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { use, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import { useSharedValue } from 'react-native-reanimated'
import { movieStyles } from './Movie.styles'
import { GetPopularMovies } from '../../services/application/GetPopularMovies'
import { TMDBRepository } from '../../services/infrastructure/TMDBRepository'
import { Movie } from '../../services/domain/movie'
import MovieElement from '../Movie/Movie'
import CustomButton from '../Button/Button'
import { Genre } from '../../services/domain/Genre'
import { GetGenres } from '../../services/application/GetGenres'
import NavBar from '../NavBar/NavBar'


const width = Dimensions.get("window").width;

const MoviesCarrousel = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);

    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    const movieRepository = new TMDBRepository();
    const getPopularMovies = new GetPopularMovies(movieRepository);
    const getGenres = new GetGenres(movieRepository);

    const fetchGenres = async () => {
        const data = await getGenres.execute();
        setGenres(data);
        console.log(data);
    };

    const fetchMovies = async () => {
        const data = await getPopularMovies.execute(1);
        setPopularMovies(data);
        console.log(data);
    };

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);

    return (
        <SafeAreaView style={movieStyles.container}>
            <NavBar
                genres={genres.slice(0, 5)}
            />
            <View>
                <Carousel
                    ref={ref}
                    width={width}
                    height={width}
                    data={popularMovies.slice(0, 5)}
                    onProgressChange={progress}
                    renderItem={({ index }) => {
                        const movie = popularMovies[index];
                        return (
                            <MovieElement
                                movie={movie}
                                width={width}
                            />
                        )
                    }}
                />

                <View
                    style={movieStyles.buttonsContainer}
                >
                    <CustomButton
                        text="+ Wishlist"
                        type="secondary"
                    />
                    <CustomButton
                        text="Details"
                        type="primary"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MoviesCarrousel;