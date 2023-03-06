import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';

const API_KEY = 'secret';
const LATITUDE = 44.449468; // example latitude
const LONGITUDE = 26.160961; // example longitude
const RADIUS = 117000; // Romania radius in meters
const { width } = Dimensions.get('screen');
const CARD_WIDTH = (width - 32) / 2;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  restaurantBox: {
    width: CARD_WIDTH,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantImage: {
    width: CARD_WIDTH - 32,
    height: CARD_WIDTH / 2,
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  restaurantAddress: {
    fontSize: 16,
    color: '#999',
  },
  restaurantColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
});

export default function RestaurantsApi() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${LATITUDE},${LONGITUDE}&radius=${RADIUS}&type=restaurant&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getPhotoUrl = (photoRef) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${API_KEY}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.restaurantColumn}>
          {restaurants.map((restaurant, index) => (
            <View key={index} style={styles.restaurantBox}>
              {restaurant.photos && restaurant.photos[0] && (
                <Image
                  style={styles.restaurantImage}
                  source={{
                    uri: getPhotoUrl(restaurant.photos[0].photo_reference),
                  }}
                />
              )}
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantAddress}>
                {restaurant.vicinity}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
