import React, {Suspense} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {HomeScreenProps} from '../types/home';

const ProductList = React.lazy(() => import('../components/ProductList'));

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <Suspense
      fallback={
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      }>
      <ProductList navigation={navigation} />
    </Suspense>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
