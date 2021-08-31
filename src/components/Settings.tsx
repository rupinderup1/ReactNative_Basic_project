import React, { useState, useEffect } from "react";
// import Picker from 'native-base';

import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements/dist/buttons/Button";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import ModalDropdown from "react-native-modal-dropdown";
import { color } from "react-native-elements/dist/helpers";

export default function Settings() {
  const route = useRoute();
  const values = [
    ["build", "343"],
    ["deploy", "23432"],
  ];
  const navigation = useNavigation();
  // set variable "curentWireTypeCalValue "
  const [curentWireTypeCalValue, setCrntWireTypeCalVal] = useState();
  //Todo wireWeightTepm = curentWireTypeCalValue * (3.14 * (wiredia/2))

  // wireDiaTemp = Math.pow((wireDiaValue/2),2);

  const [setting, setSetting] = useState([
    { name: "SS", value: "", unit: "lb/ft3" },
    { name: "Steel", value: "", unit: "lb/ft3" },
    { name: "Aluminum", value: "", unit: "lb/ft3" },
    { name: "MC", value: "", unit: "lb/ft3" },
    { name: "Flux Core", value: "", unit: "lb/ft3" },
    { name: "Sl Bronze", value: "", unit: "lb/ft3" },
    { name: "Inconel", value: "", unit: "lb/ft3" },
    { name: "Wire Type", value: "", unit: "" },
    { name: "Process Type", value: "", unit: "" },
    { name: "Wire Dia", value: "", unit: "in" },
    { name: "Gas Flow Rate", value: "", unit: "Cuft/hr" },
    { name: "Wire Weight", value: "0.006444", unit: "Ib/foot" },
    { name: "Wire Cost", value: "", unit: "Ib" },
    { name: "Gas Cost", value: "", unit: "Cuft" },
    { name: "Labor Rate", value: "", unit: "hr" },
    { name: "Open Factor%", value: "", unit: "Arc on time/hr" },
    { name: "Transfer Efficiency", value: "98%", unit: "" },
  ]);
  // console.log("SETSETTING DATA:::::::::::::::::::::::::::::::::::", setting);
  const [cont, setcont] = useState("CONTINUE");
  // var procedureType = "";
  const [procedureType, setProcedureType] = useState("");

  useEffect(() => {
    const obj = JSON.stringify(route.params);
    setSettings(JSON.parse(obj).type);
    calculateWireWeight(7);
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

  const setSettings = async (procedureType) => {
    // getData();
    AsyncStorage.getItem('settingData').then((result) => {
      var data = JSON.parse(result);
      console.log("DATA::::::::::::::::", result);
      if (procedureType == "current") {
        if (data != null && data[0] != null && data[0].type == 'current') {
          setSetting(data[0].settingData);
        } else {
          setSetting([
            { name: "SS", value: "0.2854", unit: "lb/ft3" },
            { name: "Steel", value: "0.28396", unit: "lb/ft3" },
            { name: "Aluminum", value: "0.0976", unit: "lb/ft3" },
            { name: "MC", value: "0.253", unit: "lb/ft3" },
            { name: "Flux Core", value: "0.217", unit: "lb/ft3" },
            { name: "Sl Bronze", value: "0.308", unit: "lb/ft3" },
            { name: "Inconel", value: "0.296", unit: "lb/ft3" },
            { name: "Wire Type", value: "0.2854", unit: "" },
            { name: "Process Type", value: "85", unit: "" },
            { name: "Wire Dia", value: "0.052", unit: "in" },
            { name: "Gas Flow Rate", value: "0", unit: "Cuft/hr" },
            { name: "Wire Weight", value: "", unit: "Ib/foot" },
            { name: "Wire Cost", value: "1.69", unit: "Ib" },
            { name: "Gas Cost", value: "0", unit: "Cuft" },
            { name: "Labor Rate", value: "75.00", unit: "hr" },
            { name: "Open Factor%", value: "100", unit: "Arc on time/hr" },
            { name: "Transfer Efficiency", value: "85", unit: "%" },
          ]);
        }
      } else {
        if (data != null && data[1] != null && data[1].type == 'new') {
          setSetting(data[1].settingData);
        } else {
          setSetting([
            { name: "SS", value: "0.2854", unit: "lb/ft3" },
            { name: "Steel", value: "0.28396", unit: "lb/ft3" },
            { name: "Aluminum", value: "0.0976", unit: "lb/ft3" },
            { name: "MC", value: "0.253", unit: "lb/ft3" },
            { name: "Flux Core", value: "0.217", unit: "lb/ft3" },
            { name: "Sl Bronze", value: "0.308", unit: "lb/ft3" },
            { name: "Inconel", value: "0.296", unit: "lb/ft3" },
            { name: "Wire Type", value: "0.2854", unit: "lb/ft3" },
            { name: "Process Type", value: "85", unit: "" },
            { name: "Wire Dia", value: "0.125", unit: "in" },
            { name: "Gas Flow Rate", value: "0", unit: "Cuft/hr" },
            { name: "Wire Weight", value: "", unit: "Ib/foot" },
            { name: "Wire Cost", value: "1.20", unit: "Ib" },
            { name: "Gas Cost", value: "0", unit: "Cuft" },
            { name: "Labor Rate", value: "75.00", unit: "hr" },
            { name: "Open Factor%", value: "100", unit: "Arc on time/hr" },
            { name: "Transfer Efficiency", value: "85", unit: "%" },
          ]);
        }
      }
      setProcedureType(procedureType);
    });
    // if (procedureType == "current") {
    //   setSetting([
    //     { name: "SS", value: "0.2854", unit: "lb/ft3" },
    //     { name: "Steel", value: "0.28396", unit: "lb/ft3" },
    //     { name: "Aluminum", value: "0.0976", unit: "lb/ft3" },
    //     { name: "MC", value: "0.253", unit: "lb/ft3" },
    //     { name: "Flux Core", value: "0.217", unit: "lb/ft3" },
    //     { name: "Sl Bronze", value: "0.308", unit: "lb/ft3" },
    //     { name: "Inconel", value: "0.296", unit: "lb/ft3" },
    //     { name: "Wire Type", value: "0.2854", unit: "" },
    //     { name: "Process Type", value: "85", unit: "" },
    //     { name: "Wire Dia", value: "0.052", unit: "in" },
    //     { name: "Gas Flow Rate", value: "0", unit: "Cuft/hr" },
    //     { name: "Wire Weight", value: "", unit: "Ib/foot" },
    //     { name: "Wire Cost", value: "1.69", unit: "Ib" },
    //     { name: "Gas Cost", value: "0", unit: "Cuft" },
    //     { name: "Labor Rate", value: "75.00", unit: "hr" },
    //     { name: "Open Factor%", value: "100", unit: "Arc on time/hr" },
    //     { name: "Transfer Efficiency", value: "85", unit: "%" },
    //   ]);
    //   setProcedureType(procedureType);
    // } else {
    //   setSetting([
    //     { name: "SS", value: "0.2854", unit: "lb/ft3" },
    //     { name: "Steel", value: "0.28396", unit: "lb/ft3" },
    //     { name: "Aluminum", value: "0.0976", unit: "lb/ft3" },
    //     { name: "MC", value: "0.253", unit: "lb/ft3" },
    //     { name: "Flux Core", value: "0.217", unit: "lb/ft3" },
    //     { name: "Sl Bronze", value: "0.308", unit: "lb/ft3" },
    //     { name: "Inconel", value: "0.296", unit: "lb/ft3" },
    //     { name: "Wire Type", value: "0.2854", unit: "lb/ft3" },
    //     { name: "Process Type", value: "85", unit: "" },
    //     { name: "Wire Dia", value: "0.125", unit: "in" },
    //     { name: "Gas Flow Rate", value: "0", unit: "Cuft/hr" },
    //     { name: "Wire Weight", value: "", unit: "Ib/foot" },
    //     { name: "Wire Cost", value: "1.20", unit: "Ib" },
    //     { name: "Gas Cost", value: "0", unit: "Cuft" },
    //     { name: "Labor Rate", value: "75.00", unit: "hr" },
    //     { name: "Open Factor%", value: "100", unit: "Arc on time/hr" },
    //     { name: "Transfer Efficiency", value: "85", unit: "%" },
    //   ]);
    //   setProcedureType(procedureType);
    // }
  }

  // const getData = async () => {
  //   // var data = await AsyncStorage.getItem("settingData");
  //   // data = JSON.parse(data);
  // };



  //Dropdown Arrays
  const efficency = ["85", "92", "98"];
  const wireType = [
    "SS",
    "Steel",
    "Aluminum",
    "MC",
    "Flux Core",
    "Sl Bronze",
    "Inconel",
  ];
  const processType = ["FCAW", "GMAW-S", "GMAW-P"];

  const calculateWireWeight = async (key) => {
    var wireWeight;


    console.log("WIREDIA::::::::", setting[9].value)

    wireWeight = ((parseFloat(setting[9].value)) / 2);


    // =(VLOOKUP(P13,T5:U12,2,FALSE))*(3.14*(B7/2)^2)*12
    wireWeight = parseFloat(setting[key].value) *(3.14 * Math.pow(wireWeight, 2)) * 12;

    wireWeight = wireWeight.toPrecision(4);

    let obj = setting[11];
    obj.value = wireWeight;
    console.log("weight new:::::::::::", wireWeight);
    setSetting([...setting.slice(0, 11), obj, ...setting.slice(12)]);


  }




  const onChangeDropdownText = async (text: any, key: any) => {
    // alert("TEXT:::::::::"+ text);
    if (setting[key].name == 'Wire Type') {
      setting.map((elements, index, arr) => {
        if (setting[index].name == text) {
          // alert("TEXT::::" + setting[index].name);
          let obj = setting[key];
          obj.value = setting[index].value;
          setSetting([...setting.slice(0, key), obj, ...setting.slice(key + 1)]);
        }
      });

      calculateWireWeight(key);

    }
    if (setting[key].name == 'Process Type') {
      key = 16;
      if (text == 'FCAW') {
        let obj = setting[key];
        obj.value = "85";
        setSetting([...setting.slice(0, key), obj, ...setting.slice(key + 1)]);
      } else if (text == 'GMAW-S') {
        let obj = setting[key];
        obj.value = "92";
        setSetting([...setting.slice(0, key), obj, ...setting.slice(key + 1)]);
      } else {
        let obj = setting[key];
        obj.value = "98";
        setSetting([...setting.slice(0, key), obj, ...setting.slice(key + 1)]);
      }
    }
    setcont("SAVE");
  };

  const onChangeText = async (text: any, index: any) => {
    console.log("DROPDOWNTEXTTTTTTTTTTTTTT::::::", text, index);


    let obj = setting[index];
    obj.value = text;
    setSetting([...setting.slice(0, index), obj, ...setting.slice(index + 1)]);
    setcont("SAVE");

    if (index == 9) {
      calculateWireWeight(7);
      // var wireWeight;

      // console.log("the 9th value is ::::", text);

      // wireWeight = 3.14 * ((parseFloat(text)) / 2);

      // console.log("Wire weight new:::::::::::",wireWeight);

      // wireWeight = parseFloat(text) * Math.pow(wireWeight, 2) * 12;

      // wireWeight = wireWeight.toPrecision(4);

      // let obj = setting[11];
      // obj.value = wireWeight;
      // setSetting([...setting.slice(0, 11), obj, ...setting.slice(12)]);


    }
  };

  const SaveData = async () => {
    console.log("PROCEDURETYPE:::", procedureType);
    var data = {
      type: procedureType,
      settingData: setting,
    };
    var data1 = await AsyncStorage.getItem("settingData");
    var newArray = [];
    if (data1 != null) {
      newArray = JSON.parse(data1);
    } else {
      newArray = [];
    }
    if (procedureType == "current") {
      newArray[0] = data;
    } else {
      newArray[1] = data;
    }
    await AsyncStorage.setItem("settingData", JSON.stringify(newArray));
    console.log("NEWARRAY:::::", JSON.stringify(newArray));
    navigation.navigate("procedure", { type: procedureType });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.densityData}>
            <Text style={styles.densityDataCnt}>Density Settings</Text>
          </View>

          {setting.map((item, key) => (
            <View key={key} style={styles.defaultSetting}>
              <View key={key} style={styles.inputCnt}>
                <View style={[styles.inputHintCnt]}>
                  <Text style={styles.inputHint}>{item.name}</Text>
                </View>

                <View style={[styles.inputFieldCnt]}>
                  {key == 11 || key == 16 ? (
                    <Text style={styles.inputDisable}>{item.value}</Text>
                  ) : key == 7 || key == 8 ? (
                    <View style={styles.dropdown}>
                      <ModalDropdown
                        style={styles.picker}
                        options={
                          key == 7
                            ? wireType
                            : processType
                        }
                        defaultValue={
                          key == 7
                            ? wireType[0]
                            : processType[0]
                        }
                        defaultIndex={0}
                        onSelect={(idx, value) =>
                          onChangeDropdownText(value, key)
                        }
                      />
                    </View>
                  ) : (
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      onChangeText={(text) => onChangeText(text, key)}
                    >
                      {item.value}
                    </TextInput>

                  )}

                  <Text style={styles.inputUnit}>{item.unit}</Text>
                </View>
              </View>
              <TouchableHighlight style={styles.defaultData}>
                {key == 6 ? (
                  <Text style={styles.defaultDataCnt}>Default Settings</Text>
                ) : null}
              </TouchableHighlight>
            </View>
          ))}

          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.9}
            onPress={SaveData}
          >
            <Text style={styles.continueButtonCnt}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2%",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  inputCard: {
    shadowOpacity: 1,
    shadowRadius: 5,
    marginTop: "1%",
    width: "100%",
    height: "100%",
  },
  inputCnt: {
    marginTop: "3%",
    flexDirection: "row",
    width: "100%",
  },
  defaultSetting: {
    flexDirection: "column",
    width: "100%",
  },
  inputHint: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "500",
  },
  inputHintCnt: {
    width: "40%",
  },
  inputFieldCnt: {
    width: "60%",
    display: "flex",
    flexDirection: "row",
  },
  input: {
    width: "70%",
    color: "#000000",
    fontSize: 15,
    padding: 0,
    borderBottomWidth: 1,
  },
  inputDisable: {
    width: "70%",
    color: "#000000",
    fontSize: 15,
    padding: 0,
  },
  inputUnit: {
    width: "30%",
    color: "black",
  },
  weldId: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
  },

  continueButton: {
    //  width:'50%',
    backgroundColor: "#8db4e2",
    marginTop: "8%",
  },
  continueButtonCnt: {
    color: "black",
    fontWeight: "600",
    margin: "2%",
  },
  densityData: {
    backgroundColor: "#8db4e2",
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
  },
  densityDataCnt: {
    color: "black",
    fontWeight: "600",
    margin: "2%",
  },

  defaultDataCnt: {
    color: "black",
    fontWeight: "600",
    paddingVertical: "2%",
  },
  defaultData: {
    backgroundColor: "#8db4e2",
    marginTop: "4%",
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
  },

  picker: {
    width: '100%',
  },

  dropdown: {
    backgroundColor: "#6ea9b8",
    width: "72%",
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
});
