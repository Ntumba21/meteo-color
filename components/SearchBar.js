import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Favoris from './FavorisButton';
import { isCityInFavorites } from '../firebaseFunctions/favorisFunctions';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const handleSearch = () => {
    // Vérifier si le terme de recherche n'est pas vide avant d'appeler la fonction de recherche
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm);
      isFavorite = isCityInFavorites(searchTerm)
      setIsSearchPerformed(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher une ville..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button style={{backgroundColor:"red"}} title="Rechercher" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position:"absolute",
    top:70,
    margin: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    width: "20%"
  },
});

export default SearchBar;
