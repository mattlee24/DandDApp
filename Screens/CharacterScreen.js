import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Alert, Touchable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';

const CharacterScreen = () => {

  const [ name, setName ] = useState('Character');
  const [ health, setHealth ] = useState('00');
  const [ armour, setArmour ] = useState('00');
  const [ positiveTrait, setPositiveTrait ] = useState('Positive');
  const [ negativeTrait, setNegativeTrait ] = useState('Negative');
  const [ skillsData, setSkillsData ] = useState({
    "1" :{
      "name": "Strength",
      "number": "+2",
      "id": "1"
    },
  })

  useEffect(() => { 

    const getCharacterData = async () => {
      let values;
      try {
        values = await AsyncStorage.multiGet(['Name', 'Health', 'Armour', 'Positive', 'Negative']) 

        if (values[0][1] != null) {
          setName(values[0][1])
        }

        if (values[1][1] != null ) {
          setHealth(values[1][1])
        }

        if (values[2][1] != null ) {
          setArmour(values[2][1])
        }

        if (values[3][1] != null ) {
          setPositiveTrait(values[3][1])
        }

        if (values[4][1] != null ) {
          setNegativeTrait(values[4][1])
        }

      } catch (e) {
        Alert.alert("Failed to get character data from storage")
      }
    }
    getCharacterData();
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
    } catch (e) {
      console.log('Error:',e)
    }
  }

  const setPositiveStorage = async () => {
    try {
      await AsyncStorage.setItem('Positive', positiveTrait)
    } catch (e) {
      console.log('Error:',e)
    }
  }

  const setNegativeStorage = async () => {
    try {
      await AsyncStorage.setItem('Negative', negativeTrait)
    } catch (e) {
      console.log('Error:',e)
    }
  }

  const editSkillData = (id, text) => {
    skillsData[id].name = text
    console.log(skillsData)
  }

  const addSkillsData = () => {
    const skillsDataEdited = skillsData;
    id = Object.keys(skillsDataEdited).length;
    id = id + 1;
    skillsDataEdited[id] =  {
        id: id,
        name: "test",
        number: "+1",
    }
    setSkillsData(skillsDataEdited);
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
              <View style={styles.positiveAndNegative}>
                <Text style={styles.traitsContenttextColor}>Positive: </Text>
                <TextInput
                  style={styles.traitsStyle}
                  color={colors.Brown}
                  fontSize={25}
                  cursorColor={colors.Brown}
                  autoCapitalize="none"
                  keyboardType="ascii-capable"
                  keyboardAppearance="dark"
                  value={positiveTrait}
                  onChangeText={(text) => setPositiveTrait(text)}
                  onEndEditing={() => {setPositiveStorage()}}
                  textAlign={'left'}
                />
              </View>
              <View style={styles.positiveAndNegative}>
                <Text style={styles.traitsContenttextColor}>Negative: </Text>
                <TextInput
                  style={styles.traitsStyle}
                  color={colors.Brown}
                  fontSize={25}
                  cursorColor={colors.Brown}
                  autoCapitalize="none"
                  keyboardType="ascii-capable"
                  keyboardAppearance="dark"
                  value={negativeTrait}
                  onChangeText={(text) => setNegativeTrait(text)}
                  onEndEditing={() => {setNegativeStorage()}}
                  textAlign={'left'}
                />
              </View>
            </View>
          </View>
          <View style={styles.skillBonus}>
            <View style={styles.traitsTitle}>
              <Text style={styles.textColor}>Skill Bonus</Text>
              <TouchableOpacity style={styles.addSkillButton} onPress={() => {addSkillsData()}}>
                <Text style={styles.addButton}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.skillContent}>
              {Object.values(skillsData).map(index => {
                return (
                <View
                  key={index.id}
                  style={styles.singleSkillView}
                >
                  <View style={styles.skillAmount}>
                    <Text style={styles.skillAmountText}>{index.number}</Text>
                  </View>
                  <TextInput
                    style={styles.skillName}
                    color={colors.Brown}
                    fontSize={40}
                    cursorColor={colors.Brown}
                    autoCapitalize="none"
                    keyboardType="ascii-capable"
                    keyboardAppearance="dark"
                    value={index.name}
                    onChangeText={(text) => editSkillData(index.id, text)}
                    // onEndEditing={() => {setNegativeStorage()}}
                    textAlign={'left'}
                  />
                </View>
                )
              })}
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
    marginBottom: 20
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
  traitsStyle: {
    borderWidth: 3,
    borderRadius: 25,
    borderColor: colors.Navy,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 20,
    marginLeft: 10,
    maxWidth: '54%'
  },
  positiveAndNegative: {
    flexDirection: 'row',
  },  
  traitsContent: {
    width: '100%',
    paddingLeft: 10,
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
  skillContent: {
    width: '100%',
    paddingLeft: 10,
  },
  addSkillButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 10,
    marginTop: 5,
    backgroundColor: colors.Brown,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  addButton: {
    fontSize: 40
  },
  singleSkillView: {
    width: '100%',
    flexDirection: 'row',
    height: 'auto',
    marginVertical: 20,
    justifyContent: 'center'
  },
  skillAmount: {
    borderWidth: 3,
    borderRadius: 15,
    borderColor: colors.Navy,
    padding: 10
  },
  skillName: {
    borderWidth: 3,
    borderRadius: 15,
    marginLeft: 20,
    borderColor: colors.Navy,
    padding: 10
  },
  skillAmountText: {
    fontSize: 40,
    color: colors.Brown
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
    marginBottom: 600
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
    fontSize: 50,
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
    marginTop: 20,
    width: '40%',
  }
})