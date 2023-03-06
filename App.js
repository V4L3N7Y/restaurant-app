import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RestaurantApi from './components/RestaurantsApi';


export default function App() {
  return (
    
    <View style={styles.container}>     
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
