import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RestaurantApi from './components/RestaurantsApi';
import Header from './components/Header';

export default function App() {
  return (
    
    <View style={styles.container}>  
        <Header/>   
         <RestaurantApi/>     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
