import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Product} from './product';


export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Detail: {product: Product};
};

export type DetailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Detail'>;
  route: RouteProp<RootStackParamList, 'Detail'>;
};
