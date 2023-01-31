import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Alert, Touchable, TouchableOpacity, Platform, ImageBackground, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useFonts } from 'expo-font';

const CharacterScreen = () => {

  const [ name, setName ] = useState('Character');
  const [ health, setHealth ] = useState('00');
  const [ armour, setArmour ] = useState('00');
  const [ positiveTrait, setPositiveTrait ] = useState('Positive');
  const [ negativeTrait, setNegativeTrait ] = useState('Negative');
  const [ skillsData, setSkillsData ] = useState({});
  const [ attacksData, setAttacksData ] = useState({});
  const [ specialsData, setSpecialsData ] = useState({});
  const [ inventoryData, setInventoryData ] = useState({})
  const [ characterImage, setCharacterImage ] = useState('')
  const [ loading, setLoading ] = useState(false)

  const [fontsLoaded] = useFonts({
    'Ribbon': require('../assets/fonts/Kaldevaderibbon.ttf'),
  });

  useEffect(() => { 

    setLoading(false)

    setTimeout(() => {
      setLoading(true)
    }, 3000)

    const getCharacterData = async () => {
      let values;
      try {
        values = await AsyncStorage.multiGet(['Name', 'Health', 'Armour', 'Positive', 'Negative', 'Skills', 'Attacks', 'Specials', 'Inventory', 'Image']) 

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

        if (values[7][1] != null ) {
          setSpecialsData(JSON.parse(values[7][1]))
        }

        if (values[8][1] != null ) {
          setInventoryData(JSON.parse(values[8][1]))
        }

        if (values[9][1] != null ) {
          setCharacterImage(values[9][1])
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

  const addSpecialsData = () => {
    let id = Object.keys(specialsData).length;
    id = id + 1;
    setSpecialsData({...specialsData,
      [id] :{
        "special": "Edit",
        "id": id
      }
    })
  }

  const updateSpecialsDataStorage = async () => {
    try {
      await AsyncStorage.setItem('Specials', JSON.stringify(specialsData))
    } catch (e) {
      console.log('Error:',e)
    }
  }

  const deleteItemFromSpecialsStorage = async (id) => {
    let editData = specialsData;
    delete editData[id]
    setSpecialsData({...editData})
    await AsyncStorage.setItem('Specials', JSON.stringify(specialsData))
  }

  const addInventoryData = () => {
    let id = Object.keys(inventoryData).length;
    id = id + 1;
    setInventoryData({...inventoryData,
      [id] :{
        "item": "Edit",
        "id": id
      }
    })
  }

  const updateInverntoryDataStorage = async () => {
    try {
      await AsyncStorage.setItem('Inventory', JSON.stringify(inventoryData))
    } catch (e) {
      console.log('Error:',e)
    }
  }

  const deleteItemFromInventoryStorage = async (id) => {
    let editData = inventoryData;
    delete editData[id]
    setInventoryData({...editData})
    await AsyncStorage.setItem('Inventory', JSON.stringify(inventoryData))
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true
    });

    if (!result.canceled) {
      setCharacterImage(result.assets[0].uri)
      try {
        await AsyncStorage.setItem('Image', result.assets[0].uri)
      } catch (e) {
        console.log('Error:',e)
      }
    } 
  }

  if ( loading && fontsLoaded ) {
    return (
      <View style={styles.container}>
        <Image style={styles.loadingImage} source={require('../assets/splash.png')}/>
        <Text style={styles.loadingText}>Loading!</Text>
      </View>
    )
  }

    return (
      <View style={styles.container}>
        <View style={styles.name}>
          <TextInput
            color={colors.Brown}
            fontSize={30}
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
                      value={index.number}
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
                      value={index.name}
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
                        value={index.attack}
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
          <View style={styles.skillsTitle}>
              <Text style={styles.textColor}>Specials</Text>
              <TouchableOpacity style={styles.addSkillButton} onPress={() => {addSpecialsData()}}>
                <Ionicons style={styles.addButton} name="add-circle"></Ionicons>
              </TouchableOpacity>
            </View>
            <View style={styles.attacksContent}>
                {Object.values(specialsData).map(index => {
                  return (
                    <View key={index.id} style={styles.attackPoint}>
                      <TouchableOpacity onPress={() => deleteItemFromSpecialsStorage(index.id)}>
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
                        value={index.special}
                        width={'90%'}
                        multiline={true}
                        onChangeText={(text) => setSpecialsData({...specialsData,
                          [index.id] :{
                            "special": text,
                            "id": index.id
                          }
                        })}
                        onEndEditing={() => updateSpecialsDataStorage()}
                      />
                    </View>
                  )
                })}
            </View>
          </View>
          <View style={styles.inventory}>
          <View style={styles.skillsTitle}>
              <Text style={styles.textColor}>Inventory</Text>
              <TouchableOpacity style={styles.addSkillButton} onPress={() => {addInventoryData()}}>
                <Ionicons style={styles.addButton} name="add-circle"></Ionicons>
              </TouchableOpacity>
            </View>
            <View style={styles.attacksContent}>
              <FlatList
                style={styles.flatlist} 
                data={Object.values(inventoryData)}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View key={item.id} style={styles.inventoryView}>
                    <TouchableOpacity onPress={() => deleteItemFromInventoryStorage(item.id)}>
                      <Ionicons style={styles.inventoryRemove} name="remove-circle"></Ionicons>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.inventoryTextInput}
                      color={colors.Brown}
                      fontSize={20}
                      cursorColor={colors.Brown}
                      autoCapitalize="none"
                      keyboardType="ascii-capable"
                      keyboardAppearance="dark"
                      value={item.item}
                      multiline={true}
                      onChangeText={(text) => setInventoryData({...inventoryData,
                        [item.id] :{
                          "item": text,
                          "id": item.id
                        }
                      })}
                      onEndEditing={() => updateInverntoryDataStorage()}
                    /> 
                  </View>
                )}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.characterImageView} onPress={() => {pickImage()}}>
            <Image style={styles.characterImage} source={{ uri: characterImage }}/>
            <Text style={styles.imageText}>Press to Choose Image</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.logoView}>
          <Image style={styles.logoStyle} source={require('../assets/DandDLogo.png')}/>
        </View>
      </View>
    );
}

export default CharacterScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: colors.Blue
  },
  loadingImage: {
    width: '100%',
    height: '100%'
  },
  loadingText: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    color: 'white',
    fontSize: 70,
    marginBottom: 50,
    fontFamily: 'Ribbon'
  },
  image: {
    width: '100%'
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
    marginBottom: 20,
    alignSelf: 'center',
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
    borderColor: colors.Navy,
  },
  traitsStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.Navy,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 10,
    width: '50%',
  },
  positiveAndNegative: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center'
  },  
  traitsContent: {
    width: '100%',
    backgroundColor: colors.Blue,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    paddingBottom: 20,
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
    borderColor: colors.Navy,
  },
  skillsTitle: {
    backgroundColor: colors.Navy,
    color: colors.Brown,
    width: '100%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: 'center',
    paddingVertical: 10
  },
  skillContent: {
    width: '100%',
    paddingHorizontal: 20,
    minHeight: 35,
    paddingBottom: 20,
    paddingTop: 20
  },
  addSkillButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 5,
    marginTop: Platform.OS === 'ios' ? 10 : 18,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  addButton: {
    fontSize: 30,
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
    paddingRight: 20,
    paddingBottom: 40,
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
    borderColor: colors.Navy,
  },
  inventoryView: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    width: '40%',
    marginLeft: 20,
    padding: 5
  },
  inventoryRemove: {
    color: colors.Brown,
    fontSize: 25,
    marginRight: 5,
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
    fontSize: 30,
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
    fontSize: Platform.OS === 'ios' ? 30 : 30,
    alignSelf: 'center',
    width: '40%',
  },
  logoView: {
    width: '100%',
    height: '15%',
    backgroundColor: colors.Navy,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: colors.Navy,
    paddingTop: 5,
    shadowOffset: {
      width: 0,
      height: 4,
      },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoStyle: {
    width: '50%',
    height: '50%',
  },
  characterImageView: {
    height: 400,
    width: '90%',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderColor: colors.Navy,
    borderRadius: 25,
    backgroundColor: colors.Navy,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageText: {
    color: colors.Brown
  },
  characterImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    position: 'absolute',
    zIndex: 1
  }
})