import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import store from './store/store';
import FavoritesScreen from './screen/Favourites';
import HomeScreen from './screen/HomeScreen';
import CartScreen from './screen/CartScreen';
import DetailScreen from './screen/DetailScreen';
import Toast from 'react-native-toast-message';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider} from 'react-redux';
import {RootStackParamList} from './types/navigation';
import {getTabBarVisibility} from './utils/tabBarVisibility';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {display: getTabBarVisibility(route) ? 'flex' : 'none'},
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Wishlist',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
     
    </Tab.Navigator>
  );
};

// Stack navigator for Home and Detail screens
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default App;
