import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import MoviesCarrousel from './src/components/MovieCarrousel/MoviesCarrouselComponent';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        
        <MoviesCarrousel />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}


export default App;
