import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';

const CharacterScreen = ({ route, navigation }) => {

  const [ name, setName ] = useState('Character');
  const [ health, setHealth ] = useState('00');
  const [ armour, setArmour ] = useState('00');

  useEffect(() => { 
    const getHealthData = async () => {
      try {

        const healthData = await AsyncStorage.getItem('Health')
        if (healthData != null) {
          setHealth(healthData)
        }
        
        const nameData = await AsyncStorage.getItem('Name')
        if (nameData != null) {
          setName(nameData)
        }

        const armourData = await AsyncStorage.getItem('Armour')
        if (armourData != null) {
          setArmour(armourData)
        }

      } catch (e) {
        Alert.alert("Failed to get health data from storage")
      }
    }
    getHealthData();
  }, []);

  const setNameStorage = async () => {
    try {
      await AsyncStorage.setItem('Name', name)
    } catch (e) {
      console.log('Error:',e)
    }
  }

  const setHealthStorage = async () => {
    try {
      await AsyncStorage.setItem('Health', health)
    } catch (e) {
      console.log('Error:',e)
    }
  }

  const setArmourStorage = async () => {
    try {
      await AsyncStorage.setItem('Armour', armour)
      console.log(armour)
    } catch (e) {
      console.log('Error:',e)
    }
  }

    return (
      <View style={styles.container}>
        <View style={styles.name}>
          <TextInput
            color={colors.Brown}
            fontSize={50}
            cursorColor={colors.Brown}
            autoCapitalize="none"
            keyboardType="default"
            keyboardAppearance="dark"
            value={name}
            onChangeText={(text) => setName(text)}
            width={'100%'}
            onEndEditing={() => {setNameStorage()}}
            textAlign={'center'}
          />
        </View>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.healthArmour}>
            <View style={styles.health}>
              <Text style={styles.hpText}>HP</Text>
              <TextInput
                color={colors.Brown}
                fontSize={80}
                cursorColor={colors.Brown}
                autoCapitalize="none"
                keyboardType="phone-pad"
                keyboardAppearance="dark"
                value={health}
                onChangeText={(text) => setHealth(text)}
                width={150}
                onEndEditing={() => {setHealthStorage()}}
                textAlign={'center'}
              />
            </View>
            <View style={styles.armour}>
              <Text style={styles.hpText}>AR</Text>
              <TextInput
                  color={colors.Brown}
                  fontSize={80}
                  cursorColor={colors.Brown}
                  autoCapitalize="none"
                  keyboardType="phone-pad"
                  keyboardAppearance="dark"
                  value={armour}
                  onChangeText={(text) => setArmour(text)}
                  width={150}
                  onEndEditing={() => {setArmourStorage()}}
                  textAlign={'center'}
                />
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
      </View>
    );
}

export default CharacterScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: colors.Blue
  },
  ScrollView: {
    width: '100%',
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
    marginBottom: 20
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