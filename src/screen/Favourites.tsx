import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {Product} from '../types/product';
import {RootState} from '../store/store';

const FavoritesScreen = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const renderProductItem = ({item}: {item: Product}) => (
    <View style={styles.productItem}>
      <Image style={styles.productImage} source={{uri: item.thumbnail}} />
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.noFavoritesText}>No favorites added yet!</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.productList}
          columnWrapperStyle={styles.columnWrapper}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavoritesText: {
    fontSize: 18,
    color: 'gray',
  },
  addtoCart: {
    position: 'absolute',
    right: 20,
    bottom: 75,
    backgroundColor: 'orange',
    borderRadius: 100,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  productList: {
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productItem: {
    width: '48%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  productPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    flex: 1,
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;
