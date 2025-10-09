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


const width = Dimensions.get("window").width;

const MoviesCarrousel = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    const movieRepository = new TMDBRepository();
    const getPopularMovies = new GetPopularMovies(movieRepository);

    const fetchMovies = async () => {
        const data = await getPopularMovies.execute(1);
        setPopularMovies(data);
        console.log(data);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <SafeAreaView style={movieStyles.container}>
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