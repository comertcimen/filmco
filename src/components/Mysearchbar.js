import React from 'react';
import {TextInput, View} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';

const Mysearchbar = ({searchQuery, handleSearch, handleSearchClean}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextInput
        autoFocus={true}
        placeholder="Search..."
        placeholderTextColor="rgba(255,255,255,0.5)"
        value={searchQuery}
        style={{
          color: '#fff',
          width: 250,
          maxWidth: 250,
        }}
        onChangeText={handleSearch}
      />
      {searchQuery.length ? (
        <IconButton
          icon="close"
          color={Colors.white}
          onPress={handleSearchClean}
        />
      ) : null}
    </View>
  );
};

export default Mysearchbar;
