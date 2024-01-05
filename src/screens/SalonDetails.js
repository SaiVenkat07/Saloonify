import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable, ScrollView, useWindowDimensions } from 'react-native';

import FormModal from '../components/FormModal';

export default function SalonDetails({ route }) {
  const { salonData } = route.params;
  const { width } = useWindowDimensions();

  const dynamicFontSize = width < 380 ? 12 : 18;
  
  const [categoryList, setCategoryList] = useState(salonData.category.map(item => ({ ...item, showAdd: true })));
  const [itemsAdded, setItemsAdded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  
  const handleAdd = (itemId) => {
    const updatedList = categoryList.map(item => {
      if (item.id === itemId) {
        return { ...item, showAdd: false };
      }
      return item;
    });
    setCategoryList(updatedList);
    setItemsAdded(true);
  };
  
  const handleDelete = (itemId) => {
    const updatedList = categoryList.map(item => {
      if (item.id === itemId) {
        return { ...item, showAdd: true };
      }
      return item;
    });
    setCategoryList(updatedList);
    const anyItemAdded = updatedList.some(item => !item.showAdd);
    setItemsAdded(anyItemAdded);
  };
  
  const handleBookNow = () => {
    if (!itemsAdded) {
      alert('Please add at least one category item.');
      return;
    }
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={{margin: 16}}>
        <Image source={{ uri: salonData.backgroundImage }} style={styles.image} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[styles.address, { fontSize: dynamicFontSize }]}>{salonData.address}</Text>
            <Text style={[styles.phone, { fontSize: dynamicFontSize }]}>Call: {salonData.phone}</Text>
          </View>
        </View>
        <Text style={styles.categoryTitle}>Services</Text>
        <ScrollView style={{ margin: 16}}>
        <FlatList
        data={categoryList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryCard}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.categoryPrice}>Price: ₹{item.price}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              {item.showAdd ? (
                <Pressable style={styles.add} onPress={() => handleAdd(item.id)}>
                  <Text style={{fontSize: 18, color: '#272c36'}}>Add</Text>
                </Pressable>
              ) : (
                <Pressable style={styles.add} onPress={() => handleDelete(item.id)}>
                  <Text style={{fontSize: 18, color: '#272c36'}}>Remove</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
      />
      </ScrollView>
    <Pressable android_ripple={{color: '#ccc'}} style={styles.bookNowButton} onPress={handleBookNow}>
      <Text style={styles.bookNowText}>Book Now</Text>
    </Pressable>
    <FormModal isVisible={isModalVisible} closeModal={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  address: {
    fontSize: 18,
    marginBottom: 10,
    color: '#272c36',
    fontWeight: 'bold'
  },
  phone: {
    fontSize: 18,
    color: '#272c36',
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    elevation: 3,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#272c36',
  },
  categoryPrice: {
    fontSize: 14,
    color: '#828385',
  },
  bookNowButton: {
    backgroundColor: '#072657',
    padding: 16,
  },
  bookNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  add: {
    flexDirection: 'row', 
    borderColor: '#ccc', 
    borderWidth: 1, 
    padding: 10, 
    borderRadius: 10,
  }
});

