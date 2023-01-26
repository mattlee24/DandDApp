import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Alert, Touchable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';
import { Ionicons } from '@expo/vector-icons';

const CharacterScreen = () => {

  const [ name, setName ] = useState('Character');
  const [ health, setHealth ] = useState('00');
  const [ armour, setArmour ] = useState('00');
  const [ positiveTrait, setPositiveTrait ] = useState('Positive');
  const [ negativeTrait, setNegativeTrait ] = useState('Negative');
  const [ skillsData, setSkillsData ] = useState({});
  const [ attacksData, setAttacksData ] = useState({});

  useEffect(() => { 

    const getCharacterData = async () => {
      let values;
      try {
        values = await AsyncStorage.multiGet(['Name', 'Health', 'Armour', 'Positive', 'Negative', 'Skills', 'Attacks']) 

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

        if (values[5][1] != null ) {
          setSkillsData(JSON.parse(values[5][1]))
        }

        if (values[6][1] != null ) {
          setAttacksData(JSON.parse(values[6][1]))
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

  const updateSkillDataStorage = async () => {
    try {
      await AsyncStorage.setItem('Skills', JSON.stringify(skillsData))
    } catch (e) {
      console.log('Error:',e)
    }
  }

  const addSkillsData = () => {
    let id = Object.keys(skillsData).length;
    id = id + 1;
    setSkillsData({...skillsData,
      [id] :{
        "name": "Edit",
        "number": "+0",
        "id": id
      }
    })
  }

  const deleteItemFromSkillStorage = async (id) => {
    let editData = skillsData;
    delete editData[id]
    setSkillsData({...editData})
    await AsyncStorage.setItem('Skills', JSON.stringify(skillsData))
  }

  const addAttacksData = () => {
    let id = Object.keys(attacksData).length;
    id = id + 1;
    setAttacksData({...attacksData,
      [id] :{
        "attack": "Edit",
        "id": id
      }
    })
  }

  const updateAttacksDataStorage = async () => {
    try {
      await AsyncStorage.setItem('Attacks', JSON.stringify(attacksData))
    } catch (e) {
      console.log('Error:',e)
    }
  }

  const deleteItemFromAttacksStorage = async (id) => {
    let editData = attacksData;
    delete editData[id]
    setAttacksData({...editData})
    await AsyncStorage.setItem('Attacks', JSON.stringify(attacksData))
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
            <View style={styles.skillsTitle}>
              <Text style={styles.textColor}>Skill Bonus</Text>
              <TouchableOpacity style={styles.addSkillButton} onPress={() => {addSkillsData()}}>
                <Ionicons style={styles.addButton} name="add-circle"></Ionicons>
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
                    <TextInput
                      color={colors.Brown}
                      fontSize={40}
                      cursorColor={colors.Brown}
                      autoCapitalize="none"
                      keyboardType="phone-pad"
                      keyboardAppearance="dark"
                      value={skillsData[index.id].number}
                      onChangeText={(text) => setSkillsData({...skillsData,
                        [index.id] :{
                          "name": index.name,
                          "number": text,
                          "id": index.id
                        }
                      })}
                      onEndEditing={() => updateSkillDataStorage()}
                      textAlign={'left'}
                    />
                  </View>
                  <View style={styles.skillNameView}>
                    <TextInput
                      color={colors.Brown}
                      fontSize={30}
                      cursorColor={colors.Brown}
                      autoCapitalize="none"
                      keyboardType="ascii-capable"
                      keyboardAppearance="dark"
                      value={skillsData[index.id].name}
                        onChangeText={(text) => setSkillsData({...skillsData,
                          [index.id] :{
                            "name": text,
                            "number": index.number,
                            "id": index.id
                          }
                        })}
                      onEndEditing={() => updateSkillDataStorage()}
                      textAlign={'left'}
                    />
                  </View>
                  <TouchableOpacity style={styles.skillDeleteBtnView} onPress={() => deleteItemFromSkillStorage(index.id)}>
                    <Ionicons style={styles.skillDeleteBtn} name="trash-bin"></Ionicons>
                  </TouchableOpacity>
                </View>
                )
              })}
            </View>
          </View>
          <View style={styles.skillBonus}>
          <View style={styles.skillsTitle}>
              <Text style={styles.textColor}>Attacks</Text>
              <TouchableOpacity style={styles.addSkillButton} onPress={() => {addAttacksData()}}>
                <Ionicons style={styles.addButton} name="add-circle"></Ionicons>
              </TouchableOpacity>
            </View>
            <View style={styles.attacksContent}>
                {Object.values(attacksData).map(index => {
                  return (
                    <View key={index.id} style={styles.attackPoint}>
                      <TouchableOpacity onPress={() => deleteItemFromAttacksStorage(index.id)}>
                        <Ionicons style={styles.attackPointText} name="remove-circle"></Ionicons>
                      </TouchableOpacity>
                      <TextInput
                        style={styles.attackPointTextInput}
                        color={colors.Brown}
                        fontSize={25}
                        cursorColor={colors.Brown}
                        autoCapitalize="none"
                        keyboardType="ascii-capable"
                        keyboardAppearance="dark"
                        value={attacksData[index.id].attack}
                        width={'90%'}
                        multiline={true}
                        onChangeText={(text) => setAttacksData({...attacksData,
                          [index.id] :{
                            "attack": text,
                            "id": index.id
                          }
                        })}
                        onEndEditing={() => updateAttacksDataStorage()}
                      />
                    </View>
                  )
                })}
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
    borderColor: colors.Navy
  },
  traitsStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.Navy,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 20,
    marginLeft: 10,
    width: '50%'
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
    minHeight: 100,
    borderColor: colors.Navy
  },
  skillsTitle: {
    backgroundColor: colors.Navy,
    color: colors.Brown,
    width: '100%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10
  },
  skillContent: {
    width: '100%',
    paddingHorizontal: 20
  },
  addSkillButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 5,
    marginTop: 16,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  addButton: {
    fontSize: 40,
    color: colors.Brown,
  },
  singleSkillView: {
    width: '100%',
    flexDirection: 'row',
    height: 'auto',
    marginBottom: 20,
    justifyContent: 'center',
  },
  skillAmount: {
    borderWidth: 3,
    borderRadius: 15,
    borderColor: colors.Navy,
    padding: 5,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  skillNameView: {
    borderWidth: 3,
    borderRadius: 15,
    borderColor: colors.Navy,
    padding: 5,
    width: '50%',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  skillDeleteBtnView: {
    justifyContent: 'center',
    marginLeft: 10,
    borderWidth: 3,
    padding: 10,
    borderRadius: 25,
    borderColor: colors.Navy
  },  
  skillDeleteBtn: {
    fontSize: 40,
    color: colors.Red
  },
  attacksContent: {
    width: '100%',
    paddingBottom: 30,
    paddingRight: 20
  },
  attackPoint: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginLeft: 20,
    maxWidth: '90%',
  },
  attackPointText: {
    color: colors.Brown,
    fontSize: 25,
    marginRight: 20,
  },  
  attackPointTextInput: {
    alignSelf: 'center',
    marginTop: -5
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
    marginBottom: 600,
    borderColor: colors.Navy
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