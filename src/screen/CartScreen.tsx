import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromCart} from '../store/cartSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CartProduct} from '../types/product';
import { RootState } from '../store/store';

function CartScreen(): React.JSX.Element {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const renderProductItem = ({item}: {item: CartProduct}) => (
    <View style={styles.cartItem}>
      <Image style={styles.productImage} source={{uri: item.thumbnail}} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>
          ${item.price ? item.price.toFixed(2) : '0.00'}
        </Text>
        <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
        {item.discountedPrice !== undefined && (
          <Text style={styles.discountText}>
            Discounted Price: $
            {item.discountedPrice ? item.discountedPrice.toFixed(2) : '0.00'}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          color={'#ff4d4d'}
          size={25}
        />
      </TouchableOpacity>
    </View>
  );

  const hasProducts = cartItems?.products?.length > 0;

  const calculateTotalAmount = (products: CartProduct[]) => {
    return products.reduce(
      (sum, item) => sum + (item.total ?? item.price * item.quantity),
      0,
    );
  };

  const totalAmount = hasProducts
    ? calculateTotalAmount(cartItems.products)
    : 0;

  const renderTotalAmount = () => (
    <View style={styles.cartTotalContainer}>
      <Text style={styles.cartTotalText}>Total: ${totalAmount.toFixed(2)}</Text>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.emptyMessage}>No items in cart</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {hasProducts ? (
        <>
          <FlatList
            data={cartItems.products}
            renderItem={renderProductItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cartList}
          />
          {renderTotalAmount()}
        </>
      ) : (
        renderEmptyCart()
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  cartList: {
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
  productQuantity: {
    fontSize: 12,
    color: '#666',
  },
  discountText: {
    fontSize: 12,
    color: 'red',
  },
  cartTotalContainer: {
    marginTop: 10,
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f1f1f1',
  },
  cartTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
});

export default CartScreen;
