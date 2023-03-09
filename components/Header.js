import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ title }) => {
  const [isMenuVisible, setMenuVisibility] = useState(false);

  const handleMenuPress = () => {
    setMenuVisibility(!isMenuVisible);
  };

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../images/logo.png')} />
      </View>
      <View></View>
      <Text>Hello User</Text>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleMenuPress}>
        <Ionicons name="md-menu" size={30} color="#333" />
      </TouchableOpacity>    

      {isMenuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuOption} onPress={() => console.log('Login pressed')}>
            <Text style={styles.menuOptionText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption} onPress={() => console.log('City pressed')}>
            <Text style={styles.menuOptionText}>City</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption} onPress={() => console.log('About pressed')}>
            <Text style={styles.menuOptionText}>About</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#8ACADE',
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
  },
  logoContainer: {
    width: 40,
    height: 40,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menu: {
    backgroundColor: '#f8f8f8',
    position: 'absolute',
    left: 0, // Step 3: Add left and bottom properties
    bottom: 0,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    zIndex: 1,
  },
  menuOption: {
    paddingVertical: 5,
    
  },
  menuOptionText: {
    fontSize: 16,
    color: '#333',
  },
  
});

export default Header;