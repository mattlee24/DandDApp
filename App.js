import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from './colors';
import CharacterScreen from './Screens/CharacterScreen';

export default function App() {

  const [ name, setName ] = useState('');

  return (
    <View style={styles.container}>
      <CharacterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
    alignItems: 'center',
  },
});
