import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';

const CharacterScreen = ({ route, navigation }) => {

  const [ name, setName ] = useState('');

  useEffect(() => { 
    const getCharacterData = async () => {
      try {
        const name = await AsyncStorage.getItem(NAME)
        if (name != null) {
          setName(name)
        }
      } catch (e) {
        Alert.alert("Failed to get data from storage")
      }
    }
    getCharacterData();
  }, []);

    return (
      <View style={styles.container}>
        <View style={styles.name}>
          <Text style={styles.textColor}>Character</Text>
        </View>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.healthArmour}>
            <View style={styles.health}>
              <Text style={styles.hpText}>HP</Text>
              <Text style={styles.healthText}>80</Text>
            </View>
            <View style={styles.armour}>
            <Text style={styles.hpText}>AR</Text>
              <Text style={styles.armourText}>16</Text>
            </View>
          </View>
          <View style={styles.traits}>
            <View style={styles.traitsTitle}>
              <Text style={styles.textColor}>Traits</Text>
            </View>
            <View style={styles.traitsContent}>
              <Text style={styles.traitsContenttextColor}>Positive: </Text>
              <Text style={styles.traitsContenttextColor}>Negative: </Text>
            </View>
          </View>
          <View style={styles.skillBonus}>
            <View style={styles.traitsTitle}>
              <Text style={styles.textColor}>Skill Bonus</Text>
            </View>
            <View style={styles.traitsContent}>
            </View>
          </View>
          <View style={styles.skillBonus}>
            <View style={styles.traitsTitle}>
              <Text style={styles.textColor}>Attacks</Text>
            </View>
            <View style={styles.traitsContent}>
            </View>
          </View>
          <View style={styles.skillBonus}>
            <View style={styles.traitsTitle}>
              <Text style={styles.textColor}>Specials</Text>
            </View>
            <View style={styles.traitsContent}>
            </View>
          </View>
          <View style={styles.inventory}>
            <View style={styles.traitsTitle}>
              <Text style={styles.textColor}>Inventory</Text>
            </View>
            <View style={styles.traitsContent}>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textColor}>Edit Character</Text>
        </TouchableOpacity>
      </View>
    );
}

export default CharacterScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  ScrollView: {
    width: '100%',
    marginBottom: 120,
    marginTop: 20,
  },
  name: {
    marginTop: 60,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: colors.Navy,
    width: '90%',
    shadowOffset: {
      width: 0,
      height: 4,
      },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  healthArmour: {
    alignSelf: 'center', 
    width: '90%',
    height: 'auto',
    flexDirection: 'row',
    marginBottom: 20
  },
  health: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: colors.Navy,
    width: '48%',
    marginRight: 15
  },
  armour: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: colors.Navy,
    width: '48%',
  },
  traits: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    width: '90%',
    borderWidth: 1,
    height: 'auto',
    paddingBottom: 20,
  },
  traitsContent: {
    width: '100%',
    marginLeft: 30,
  },
  skillBonus: {
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    width: '90%',
    borderWidth: 1,
    height: 'auto',
    minHeight: 100
  },
  inventory: {
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    width: '90%',
    borderWidth: 1,
    height: 'auto',
    minHeight: 100,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: colors.Navy,
    marginBottom: 30,
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
    color: colors.Brown,
    fontSize: 50
  },
  healthText: {
    color: colors.Brown,
    fontSize: 80
  },
  hpText: {
    position: 'absolute',
    right: 0,
    marginRight: 15,
    marginTop: 5,
    color: colors.Brown,
    fontSize: 20
  },
  armourText: {
    color: colors.Brown,
    fontSize: 80
  },
  traitsTitle: {
    backgroundColor: colors.Navy,
    color: colors.Brown,
    width: '100%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: 'center'
  },
  traitsContenttextColor: {
    color: colors.Navy,
    fontSize: 40,
    marginTop: 20
  }
})