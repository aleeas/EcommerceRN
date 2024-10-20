import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {Icon} from 'react-native-elements';
import RnvIcon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavorite} from '../store/favoritesSlice';
import Toast from 'react-native-toast-message';
import {addToCart, setToCart} from '../store/cartSlice';
import {Product} from '../types/product';
import {HomeScreenProps} from '../types/home';
import {ADD_TO_CART_URL, API_URL} from '../constant/common';
import {RootState} from '../store/store';
import SearchBar from './SearchBar';

const ProductList: React.FC<HomeScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const cartItemCount = useSelector(
    (state: RootState) => state.cart.totalProducts || 0,
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchInput, setSearchInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [noProductsFound, setNoProductsFound] = useState<boolean>(false);

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

  useEffect(() => {
    SplashScreen.hide();
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    const userId = 1;
    const requestBody = {
      userId: userId,
      products: [{id: product.id, quantity: 1}],
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

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Use trim to check if searchInput is not just whitespace
      const url =
        searchInput.trim() !== ''
          ? `${API_URL}/search?q=${searchInput}`
          : API_URL;
      console.log(url);
      const response = await axios.get<{products: Product[]}>(url);
      setProducts(response.data.products);

      const uniqueCategories = [
        'ALL',
        ...new Set(response.data.products.map(product => product.category)),
      ].sort((a, b) => a.localeCompare(b));
      if(response.data.products.length === 0){
        setNoProductsFound(true);
      }else{
        setNoProductsFound(false);
      }
      
      setCategories(uniqueCategories);
      setSelectedCategory('ALL');
      setErrorMessage(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorMessage('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchProducts();
  };

  const filterProducts = (selectedCategory: string) => {
    if (selectedCategory === 'ALL') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  };

  const displayedProducts = filterProducts(selectedCategory);

  const renderProductItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={[
        styles.productItem,
        {backgroundColor: isDarkMode ? '#333' : '#fff'},
      ]} // Update background based on theme
      onPress={() => navigation.navigate('Detail', {product: item})}>
      <Image style={styles.productImage} source={{uri: item.thumbnail}} />
      <View style={styles.addtoCart}>
        <Icon name="add" color={'#fff'} onPress={() => handleAddToCart(item)} />
      </View>
      <View style={styles.productDetailsContainer}>
        <Text
          style={[styles.productTitle, {color: isDarkMode ? '#fff' : '#000'}]}>
          {item.title}
        </Text>
        <View style={styles.productPriceContainer}>
          <Text
            style={[
              styles.productPrice,
              {color: isDarkMode ? '#fff' : '#000'},
            ]}>
            ${item.price}
          </Text>
          <TouchableOpacity onPress={() => handleToggleFavourite(item)}>
            <RnvIcon
              name={isFavourite(item.id) ? 'heart' : 'heart-o'}
              size={18}
              color={isFavourite(item.id) ? 'red' : 'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryButton = ({item}: {item: string}) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedCategoryButton,
      ]}
      onPress={() => setSelectedCategory(item)}
      accessibilityLabel={`Select category ${item}`}>
      <Text
        style={
          selectedCategory === item
            ? styles.categoryButtonTextActive
            : styles.categoryButtonText
        }>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryButton}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      );
    }

    if (noProductsFound) {
      return (
        <View style={styles.noProductsContainer}>
          <Text style={styles.noProductsText}>No products found</Text>
        </View>
      );
    } else
      return (
        <FlatList
          data={displayedProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.productList}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
          numColumns={2}
        />
      );
  };

  console.log(products);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#fff'},
      ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        cartItemCount={cartItemCount}
        navigation={navigation}
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingGif: {
    width: 100,
    height: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  categoryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ddd',
    margin: 5,
  },
  selectedCategoryButton: {
    backgroundColor: '#0056b3',
  },
  categoryButtonText: {
    color: '#888',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  categoryButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
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
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  searchInput: {
    width: '60%',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  productList: {
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
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsText: {
    fontSize: 18,
    color: '#888',
  },
});

export default ProductList;
