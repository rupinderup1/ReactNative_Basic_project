import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({ }) {
  const route = useRoute();
  const values = [
    ['build', '343'],
    ['deploy', '23432'],
  ];
  const navigation = useNavigation();
  const [setting, setSetting] = useState(
    [
      { name: 'Wire Dia', value: '', unit: 'in' },
      { name: 'Gas Flow Rate', value: '', unit: 'Cuft/hr' },
      { name: 'Wire Weight', value: '0.006444', unit: 'Ib/foot' },
      { name: 'Wire Cost', value: '', unit: 'Ib' },
      { name: 'Gas Cost', value: '', unit: 'Cuft' },
      { name: 'Labor Rate', value: '', unit: 'hr' },
      { name: 'Oper Factor%', value: '', unit: 'Arc on time/hr' },
      { name: 'Transfer Efficiency', value: '98%', unit: '' },
    ]
  );
  const [cont, setcont] = useState("CONTINUE");
  var procedureType = 'current';

  useEffect(() => {
    const obj = JSON.stringify(route.params);
    procedureType = JSON.parse(obj).type;
    if (procedureType == 'current') {
      setSetting([
        { name: 'Wire Dia', value: '0.052', unit: 'in' },
        { name: 'Gas Flow Rate', value: '0', unit: 'Cuft/hr' },
        { name: 'Wire Weight', value: '0.006444335', unit: 'Ib/foot' },
        { name: 'Wire Cost', value: '1.69', unit: 'Ib' },
        { name: 'Gas Cost', value: '0', unit: 'Cuft' },
        { name: 'Labor Rate', value: '75.00', unit: 'hr' },
        { name: 'Oper Factor%', value: ' 1', unit: 'Arc on time/hr' },
        { name: 'Transfer Efficiency', value: '0.98', unit: '' },
      ]);
    } else {
      setSetting([
        { name: 'Wire Dia', value: '0.125', unit: 'in' },
        { name: 'Gas Flow Rate', value: '0', unit: 'Cuft/hr' },
        { name: 'Wire Weight', value: '0.037238438', unit: 'Ib/foot' },
        { name: 'Wire Cost', value: '1.20', unit: 'Ib' },
        { name: 'Gas Cost', value: '0', unit: 'Cuft' },
        { name: 'Labor Rate', value: '75.00', unit: 'hr' },
        { name: 'Oper Factor%', value: ' 1', unit: 'Arc on time/hr' },
        { name: 'Transfer Efficiency', value: '0.98', unit: '' },
      ]);
    }
    // var data = {
    //   type: procedureType,
    //   settingData: setting
    // }
    // const newArray = [...settingData];
    // if (procedureType == 'current') {
    //   newArray[0] = data;
    // } else {
    //   newArray[1] = data;
    // }
    // console.log("NEWARRAY:::::::", JSON.stringify(newArray));
    // setSettingData(newArray);
  }, []);

  const onChangeText = async (text: any, index: any) => {
    let obj = setting[index];
    obj.value = text;
    setSetting([...setting.slice(0, index), obj, ...setting.slice(index + 1)]);
    setcont("SAVE");
  }

  const SaveData = async () => {
    var data = {
      type: procedureType,
      settingData: setting
    }
    const newArray = [];
    if (procedureType == 'current') {
      newArray[0] = data;
    } else {
      newArray[1] = data;
    }
    await AsyncStorage.setItem("settingData", JSON.stringify(newArray))
    console.log("NEWARRAY:::::", JSON.stringify(newArray));
    navigation.navigate("procedure", { type: procedureType })
  }

  return (
    <View style={styles.container}>
      {
        setting.map((item, key) => (
          <View key={key} style={styles.inputCnt}>
            <View style={[styles.inputHintCnt]}>
              <Text style={styles.inputHint}>{item.name}</Text>
            </View>
            <View style={[styles.inputFieldCnt]}>
              {key == 2 ? (
                <Text>{item.value}</Text>
              ) : key == 7 ? (
                <Text>98%</Text>
              ) : (
                <TextInput style={styles.input} keyboardType="numeric"
                  onChangeText={text => onChangeText(text, key)} >
                  {item.value}
                </TextInput>
              )}
              <Text style={styles.inputUnit}>{item.unit}</Text>
            </View>
          </View>
        ))


      }
      <TouchableOpacity activeOpacity={0.9} onPress={SaveData}

        style={{ alignSelf: 'flex-start', marginRight: '0%' }}>

        <View style={styles.savebutton}>
          <Text style={[styles.weldId,]}>{cont}</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  inputCard: {
    shadowOpacity: 1,
    shadowRadius: 5,
    marginTop: '1%',
    width: '100%',
    height: '100%',
  },
  inputCnt: {
    marginTop: '3%',
    flexDirection: 'row',
    width: '100%',
  },
  inputHint: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '500',
  },
  inputHintCnt: {
    width: '40%',
  },
  inputFieldCnt: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    width: '70%',
    color: '#000000',
    fontSize: 15,
    padding: 0,
    borderBottomWidth: 1,
  },
  inputUnit: {
    width: '30%',
    color: 'black',
  },
  weldId: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  savebutton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingTop: '1%',
    paddingBottom: '1%',
    marginLeft: '38%',
    width: 100,
    backgroundColor: '#8db4e2',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowColor: '#8db4e2',
    marginTop: '10%',
  },
});
