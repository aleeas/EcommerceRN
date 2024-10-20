import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';

type RouteType = RouteProp<RootStackParamList, keyof RootStackParamList>;

export const getTabBarVisibility = (route: RouteType) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  if (routeName === 'Detail') {
    return false;
  }

  return true;
};
