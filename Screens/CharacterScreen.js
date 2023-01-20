import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';

const CharacterScreen = () => {
    const [ name, setName ] = useState('');

    return (
      <View style={styles.container}>
         <Text>{name}</Text>
          <TouchableOpacity
            style={styles.button}
          >
            <Text style={styles.textColor}>Edit Character</Text>
          </TouchableOpacity>
      </View>
    );
}

export default CharacterScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 40,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    backgroundColor: colors.Brown,
    marginTop: 10,
    width: '90%',
    shadowOffset: {
      width: 0,
      height: 4,
      },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  textColor: {
    color: colors.Navy,
    fontSize: 50
  },
})