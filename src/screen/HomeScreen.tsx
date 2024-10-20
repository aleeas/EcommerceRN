import React, {Suspense} from 'react';
import {ActivityIndicator} from 'react-native';
import {HomeScreenProps} from '../types/home';

const ProductList = React.lazy(() => import('../components/ProductList'));

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
      <ProductList navigation={navigation} />
    </Suspense>
  );
};

export default HomeScreen;
