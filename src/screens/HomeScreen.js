import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, Pressable, useWindowDimensions } from 'react-native'
import { SvgXml } from "react-native-svg";
import { useNavigation } from '@react-navigation/native';

import salonsData from '../utils/SalonsData';
import star from '../../assets/star';


function SalonItem({ item }) {
  const { width } = useWindowDimensions();
  const ratingArray = Array.from(new Array(Math.floor(item.rating)));
  const navigation = useNavigation();

  const dynamicFontSize = width < 380 ? 12 : 18;

  const handleSalonPress = () => {
    navigation.navigate('SalonDetails',  { salonData: item });
  };


    return (
      <Pressable 
        android_ripple={{color: '#ccc'}} 
        style={styles.salonContainer}
        onPress={handleSalonPress}
        >
        <View style={styles.cardContainer}>
        <View>
            <Text style={[styles.name, { fontSize: dynamicFontSize }]}>{item.name}</Text>
            <Text style={[styles.address, { fontSize: dynamicFontSize }]}>{item.address}</Text>
            <Text style={[styles.phone, { fontSize: dynamicFontSize }]}>Phone No: {item.phone}</Text>
        </View>
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.foregroundImage }} style={styles.salonImage} resizeMode="cover" />
        </View>
        </View>
        <View style={styles.container}>
            <Text style={styles.status}>{item.open ? 'Open' : 'Closed'}</Text>
            <Text>{ratingArray.map(() => (
              <SvgXml xml={star} width={20} height={20} />
            ))}
            </Text>
        </View>
      </Pressable>
    );
  }

export default function HomeScreen() {
  return (
    <FlatList
      data={salonsData}
      renderItem={({ item }) => <SalonItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
    salonContainer: {
      margin: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      elevation: 7,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    name: {
        fontSize: '1.6rem',
        fontWeight: 'bold',
        color: '#272c36',
    },
    address: {
        fontSize: '1.2rem',
        fontWeight: '700',
        color: '#828385',
    },
    phone: {
        color: '#828385',
        fontSize: '0.5rem',
        paddingTop: 5,
        fontWeight: 'bold'
    },
    imageContainer: {
      width: 100, 
      height: 100, 
      borderRadius: 10,
      overflow: 'hidden', 
    },
    salonImage: {
      width: '100%',
      height: '100%',
    },
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 10,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    },
    status: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#072657', 
    },
  });