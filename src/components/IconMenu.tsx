import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Badge from './Badge';
import {IconMenuProps} from '../types/iconMenu';

const IconMenu: React.FC<IconMenuProps> = ({icon, cartItemCount = 0, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        {icon}
        {cartItemCount > 0 && <Badge label={cartItemCount.toString()} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
  },
});

export default IconMenu;
