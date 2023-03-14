import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity, Linking } from 'react-native';


const API_KEY = 'AIzaSyAFyA9ta0evqTROKT8E63tUUBwhIrk6Uok';
const LATITUDE = 44.4379853; // example latitude
const LONGITUDE = 25.9545531; // example longitude
const RADIUS = 27000; // Romania radius in meters
const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    
  },
  restaurantBox: {
    width: CARD_WIDTH,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
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
    paddingHorizontal: 16,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    minWidth: '90%',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 8,
  },
});

export default function RestaurantsApi() {
  const [restaurants, setRestaurants] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  
  ///render the restaurants on screen
  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${LATITUDE},${LONGITUDE}&radius=${RADIUS}&type=restaurant&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data.results);
        setNextPageToken(data.next_page_token); 
        const promises = data.results.map((restaurant) => {
          return fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${restaurant.place_id}&fields=name,formatted_address,photo,rating,opening_hours,website,reviews&key=${API_KEY}`
          )
            .then((response) => response.json())
            .then((detailsData) => {
              // Add the reviews to the restaurant object
              restaurant.reviews = detailsData.result.reviews;
              console.log(restaurant.reviews)
              return restaurant;
            })
            .catch((error) => {
              console.error(error);
            });
        });
  
        // Wait for all API calls to finish and set the state with the updated restaurants
        Promise.all(promises).then((restaurantsWithReviews) => {
          setRestaurants(restaurantsWithReviews);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  ///show photos from the restaurants
  const getPhotoUrl = (photoRef) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${API_KEY}`;
  };


  /// open the maps 
  const openMaps = (places) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${places.geometry.location.lat},${places.geometry.location.lng}`;
    console.log('Maps URL:', url);
    Linking.openURL(url).then(() => {
      console.log('Opened Maps successfully', places.geometry.location);
    }).catch((err) => {
      console.error('Failed to open Maps:', err);
    });
  };

/// loading more restaurants 
  const loadMoreRestaurants = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${LATITUDE},${LONGITUDE}&radius=${RADIUS}&type=restaurant&key=${API_KEY}&pagetoken=${nextPageToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRestaurants((prevRestaurants) => [...prevRestaurants, ...data.results]); // add the new results to the existing array of restaurants
        setNextPageToken(data.next_page_token); // update the next page token
      })
      .catch((error) => {
        console.error(error);
      });
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
            {nextPageToken && (
      <TouchableOpacity title="Load more" onPress={() => loadMoreRestaurants} ></TouchableOpacity>
       )}
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantAddress}>{restaurant.vicinity}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              {restaurant.reviews && restaurant.reviews.map((review) => (
              <View key={review.time}>
              <Text>{review.rating} stars - {review.text}</Text>
               </View>
              ))}
              <Image
                source={require('../images/star.png')}
                style={{ width: 24, height: 24, marginRight: 4 }}
              />
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Rating: {restaurant.rating} out of 5</Text>
            </View>
            <TouchableOpacity onPress={() => openMaps(restaurant)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Go To!</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
    
  </View>
  );
}
