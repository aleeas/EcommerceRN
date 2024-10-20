// SearchBar.tsx
import React from 'react';
import {View, TextInput, StyleSheet, Alert, useColorScheme} from 'react-native';
import IconMenu from '../components/IconMenu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchBarProps} from '../types/searchBar';

const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  setSearchInput,
  handleSearch,
  cartItemCount,
  navigation,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.searchWrapper}>
      <TextInput
        placeholder="Search for products..."
        value={searchInput}
        onChangeText={setSearchInput}
        onSubmitEditing={handleSearch}
        style={styles.searchInput}
        accessibilityLabel="Product search input"
      />
      <IconMenu
        icon={
          <MaterialCommunityIcons
            name="message"
            size={25}
            color={isDarkMode ? 'lightgray' : 'gray'}
          />
        }
        cartItemCount={2}
      />
      <IconMenu
        icon={
          <MaterialCommunityIcons
            name="bell"
            size={25}
            color={isDarkMode ? 'lightgray' : 'gray'}
          />
        }
        onPress={() => Alert.alert('Bell Pressed!')}
      />
      <IconMenu
        icon={
          <MaterialCommunityIcons
            name="cart"
            size={25}
            color={isDarkMode ? 'lightgray' : 'gray'}
          />
        }
        cartItemCount={cartItemCount}
        onPress={() => navigation.navigate('Cart')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default SearchBar;
