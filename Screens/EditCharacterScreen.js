import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';

const EditCharacterScreen = () => {
  const [ name, setName ] = useState('');

    return (
      <View style={styles.container}>
         <TextInput
            color={colors.Navy}
            placeholderTextColor={colors.Blue}
            placeholder="Name"
            cursorColor={colors.navy}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TouchableOpacity
            style={styles.button}
          >
            <Text style={styles.textColor}>Update Character</Text>
          </TouchableOpacity>
      </View>
    );
}

export default EditCharacterScreen

const styles = StyleSheet.create({})