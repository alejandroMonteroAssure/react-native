import { Text, View } from "react-native";
import { Genre } from "../../services/domain/Genre";

type NavBarProps = {
    genres: Genre[];
}

export default function NavBar({genres}: NavBarProps) {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 10 }}>
            {genres.map((genre) => (
                <View key={genre.id} style={{ margin: 5, padding: 10, backgroundColor: '#eee', borderRadius: 20 }}>
                    <Text>{genre.name}</Text>
                </View>
            ))}           
        </View>
    )
}