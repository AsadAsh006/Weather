// AutocompleteInput.js
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, FlatList, TouchableOpacity } from 'react-native';

const AutocompleteInput = ({ data, onSelect }) => {
  const [query, setQuery] = useState('');

  const handleSelectItem = (item) => {
    setQuery(item.name); // Update input field with selected city
    onSelect(item); // Pass selected city to parent component
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectItem(item)}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter City Name"
        onChangeText={text => setQuery(text)}
        value={query}
      />
      <FlatList
        style={styles.listContainer}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  input: {
    color:'red',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  listContainer: {
    backgroundColor:'red',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    maxHeight: 400,
  },
  itemText: {
    color:'blue',
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AutocompleteInput;
