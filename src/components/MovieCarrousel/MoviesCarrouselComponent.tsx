import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { use, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import { useSharedValue } from 'react-native-reanimated'
import { movieStyles } from './Movie.styles'
import { GetPopularMovies } from '../../services/application/GetPopularMovies'
import { TMDBRepository } from '../../services/infrastructure/TMDBRepository'
import { Movie } from '../../services/domain/movie'
import MovieElement from '../Movie/components/MovieCard'
import CustomButton from '../atoms/Button/Button'
import { Genre } from '../../services/domain/Genre'
import { GetGenres } from '../../services/application/GetGenres'
import NavBar from '../NavBar/NavBar'
import LinearGradient from 'react-native-linear-gradient';
import { CustomText } from '../atoms/Text/Text'


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
        <View style={{ position: "relative" }}>
            <LinearGradient
                colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']}
                locations={[0, 0.5, 1]}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 105,
                    zIndex: 2
                }}
            />
            <Carousel
                ref={ref}
                width={width}
                height={430}
                data={popularMovies.slice(0, 5)}
                onProgressChange={progress}
                renderItem={({ index }) => {
                    const movie = popularMovies[index];
                    return (
                        <MovieElement
                            movie={movie}
                            width={width}
                            height={430}
                        />
                    )
                }}
            />
            <LinearGradient 
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']} 
                locations={[0, 0.24, 0.52, 1]} 
                style={{ marginTop: -120, height: 120, paddingVertical: 20, backgroundColor: '' }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 115, gap: 36 }}>
                    <CustomText variant='subtitle'>My list</CustomText>
                    <CustomText variant='subtitle'>Discover</CustomText>
                </View>
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
            </LinearGradient>
            <View style={{ backgroundColor: '#000', height: 1000 }}>

            </View>
        </View>
    )
}

export default MoviesCarrousel;