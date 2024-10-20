import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {DetailScreenProps} from '../types/detailScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RnvIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {Product} from '../types/product';
import {toggleFavorite} from '../store/favoritesSlice';
import Toast from 'react-native-toast-message';
import RatingAndReviews from '../components/ReviewRating';
import {addToCart, setToCart} from '../store/cartSlice';
import axios from 'axios';
import {ADD_TO_CART_URL} from '../constant/common';
import { RootState } from '../store/store';

const DetailScreen: React.FC<DetailScreenProps> = ({route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {product} = route.params;
  const dispatch = useDispatch();

  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  const isFavourite = (id: number) =>
    favorites.some((product: {id: number}) => product.id === id);

  const handleToggleFavourite = (item: Product) => {
    dispatch(toggleFavorite(item));

    const message = isFavourite(item.id)
      ? 'Removed from favorites'
      : 'Added to favorites';
    Toast.show({
      text1: message,
      position: 'bottom',
      type: 'success',
      autoHide: true,
      visibilityTime: 2000,
    });
  };

  const renderProductDetails = () => (
    <View>
      <Image style={styles.image} source={{uri: product.thumbnail}} />
      <View style={styles.discountWrapper}>
        <Text style={styles.discountText}>
          {product.discountPercentage}% OFF
        </Text>
      </View>

      <View style={styles.detailWrapperTitle}>
        <View style={styles.productPriceContainer}>
          <Text style={styles.titleProduct}>{product.title}</Text>
          <TouchableOpacity onPress={() => handleToggleFavourite(product)}>
            <RnvIcon
              name={isFavourite(product.id) ? 'heart' : 'heart-o'}
              size={18}
              color={isFavourite(product.id) ? 'red' : 'black'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.priceAndRating}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          <Text style={styles.rating}>
            <MaterialCommunityIcons
              name="star-circle"
              size={20}
              color="#ffa534"
            />
            {product.rating} ({product.reviews.length})
          </Text>
        </View>
      </View>

      <View style={styles.detailProductWrapper}>
        <Text style={styles.detailProduct}>Detail Produk</Text>
        <View style={styles.wrapper}>
          <Text style={styles.detailProductKey}>Stock</Text>
          <Text style={styles.detailProductValue}>{product.stock}</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.detailProductKey}>Brand</Text>
          <Text style={styles.detailProductValue}>{product.brand}</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.detailProductKey}>Category</Text>
          <Text style={styles.detailProductValue}>{product.category}</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.detailProductKey}>Shipping</Text>
          <Text style={styles.detailProductValue}>
            {product.shippingInformation}
          </Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.detailProductKey}>SKU</Text>
          <Text style={styles.detailProductValue}>{product.sku}</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.detailProductKey}>Return Policy</Text>
          <Text style={styles.detailProductValue}>{product.returnPolicy}</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.detailProductKey}>Min Order</Text>
          <Text style={styles.detailProductValue}>
            {product.minimumOrderQuantity}
          </Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.detailProductKey}>Warranty</Text>
          <Text style={styles.detailProductValue}>
            {product.warrantyInformation}
          </Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.detailProductKey}>Weight</Text>
          <Text style={styles.detailProductValue}>{product.weight} KG</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.detailProduct}>Description</Text>
          <Text style={styles.subTitle}>{product.description}</Text>
        </View>
      </View>
      <View style={styles.paddingContainer}>
        <Text style={styles.detailProduct}>Customer Review</Text>
      </View>
    </View>
  );

  const handleAddToCart = async (product: Product) => {
    const userId = 1;
    const requestBody = {
      userId: userId,
      products: [
        {
          id: product.id,
          quantity: 1,
        },
      ],
    };

    try {
      dispatch(
        addToCart({
          ...product,
          quantity: 1,
          total: 0,
          discountPercentage: 0,
          discountedPrice: 0,
        }),
      );

      const response = await axios.post(ADD_TO_CART_URL, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      dispatch(setToCart(response.data));

      Toast.show({
        text1: 'Added to Cart',
        position: 'bottom',
        type: 'success',
        autoHide: true,
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      Toast.show({
        text1: 'Failed to add to Cart',
        position: 'bottom',
        type: 'error',
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        ListHeaderComponent={renderProductDetails}
        data={product.reviews}
        renderItem={({item}) => <RatingAndReviews reviews={[item]} />}
        keyExtractor={(item, index) => index.toString()}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.flatListContent}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleAddToCart(product);
          }}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buyNowButton]}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  productPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailWrapperTitle: {
    padding: 16,
  },
  priceAndRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rating: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#bbb',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  detailProductWrapper: {
    borderBottomWidth: 8,
    borderTopWidth: 8,
    borderColor: '#f5f5f5',
    padding: 16,
  },
  detailProductKey: {
    width: '40%',
  },
  detailProductValue: {
    width: '60%',
    fontWeight: 'bold',
  },
  wrapper: {
    borderBottomWidth: 1,
    borderColor: '#bbb',
    paddingVertical: 10,
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 10,
  },
  detailProduct: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  paddingContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  description: {
    marginVertical: 10,
  },
  titleProduct: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  discountWrapper: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 6,
    padding: 6,
  },
  discountText: {
    fontSize: 14,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buyNowButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 14,
    paddingVertical: 5,
  },
});

export default DetailScreen;
