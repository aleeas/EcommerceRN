import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BadgeProps} from '../types/badge';

const Badge: React.FC<BadgeProps> = ({label, style}) => {
  return (
    <View style={[styles.badgeContainer, style]}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    right: -10,
  },
  badgeText: {
    color: 'white',
    fontSize:12,
    fontWeight: 'bold',
  },
});

export default Badge;
