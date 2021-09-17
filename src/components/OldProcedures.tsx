import { types } from "@babel/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useEffect } from "react";
import XLSX from "xlsx";
// import * as FileSystem from "expo-file-system";
import RNFetchBlob from "rn-fetch-blob";
import RNFS from 'react-native-fs';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Button,
  Platform,
  Alert,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { ListItem } from "react-native-elements/dist/list/ListItem";
import { ScrollView } from "react-native-gesture-handler";

export default function OldProcedure() {
  const [isSelected, setIsSelected] = useState(-1);
  // const [procedureData, setProcedureData] = useState([
  //   {
  //     id: 1,
  //     inputData: [
  //       { name: "Weld Length(in.)", value: "23" },
  //       { name: "Arc Voltage", value: "123" },
  //       { name: "Welding Amperage", value: "45" },
  //       { name: "Weld Speed(in/min)", value: "34" },
  //       { name: "WFS(in/min)", value: "54" },
  //     ],
  //     resultData: [
  //       { name: "Arc on Time(sec)", value: 4 },
  //       { name: "Wire Dep(lbs)", value: 5 },
  //       { name: "Gas Usage(cuft)", value: 22 },
  //       { name: "Labor Cost", value: 33 },
  //       { name: "Additional Cost", value: 43 },
  //       { name: "Heat Input(KJ/in)", value: 33 },
  //       { name: "Dep Rate lb/hr", value: 33 },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     inputData: [
  //       { name: "Weld Length(in.)", value: "" },
  //       { name: "Arc Voltage", value: "" },
  //       { name: "Welding Amperage", value: "" },
  //       { name: "Weld Speed(in/min)", value: "" },
  //       { name: "WFS(in/min)", value: "" },
  //     ],
  //     resultData: [
  //       { name: "Arc on Time(sec)", value: 0 },
  //       { name: "Wire Dep(lbs)", value: 0 },
  //       { name: "Gas Usage(cuft)", value: 0 },
  //       { name: "Labor Cost", value: 0 },
  //       { name: "Additional Cost", value: 0 },
  //       { name: "Heat Input(KJ/in)", value: 0 },
  //       { name: "Dep Rate lb/hr", value: 0 },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     inputData: [
  //       { name: "Weld Length(in.)", value: "" },
  //       { name: "Arc Voltage", value: "" },
  //       { name: "Welding Amperage", value: "" },
  //       { name: "Weld Speed(in/min)", value: "" },
  //       { name: "WFS(in/min)", value: "" },
  //     ],
  //     resultData: [
  //       { name: "Arc on Time(sec)", value: 0 },
  //       { name: "Wire Dep(lbs)", value: 0 },
  //       { name: "Gas Usage(cuft)", value: 0 },
  //       { name: "Labor Cost", value: 0 },
  //       { name: "Additional Cost", value: 0 },
  //       { name: "Heat Input(KJ/in)", value: 0 },
  //       { name: "Dep Rate lb/hr", value: 0 },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     inputData: [
  //       { name: "Weld Length(in.)", value: "" },
  //       { name: "Arc Voltage", value: "" },
  //       { name: "Welding Amperage", value: "" },
  //       { name: "Weld Speed(in/min)", value: "" },
  //       { name: "WFS(in/min)", value: "" },
  //     ],
  //     resultData: [
  //       { name: "Arc on Time(sec)", value: 0 },
  //       { name: "Wire Dep(lbs)", value: 0 },
  //       { name: "Gas Usage(cuft)", value: 0 },
  //       { name: "Labor Cost", value: 0 },
  //       { name: "Additional Cost", value: 0 },
  //       { name: "Heat Input(KJ/in)", value: 0 },
  //       { name: "Dep Rate lb/hr", value: 0 },
  //     ],
  //   },
  // ]);
  // const [finalResult, setfinalResult] = useState([
  //   {
  //     id: 1,
  //     data: [
  //       { name: "Arc on Time(sec)", value: 0 },
  //       { name: "Wire Dep(lbs)", value: 0 },
  //       { name: "Gas Usage(cuft)", value: 0 },
  //       { name: "Labor Cost", value: 0 },
  //       { name: "Additional Cost", value: 0 },
  //       { name: "Heat Input(KJ/in)", value: 0 },
  //       { name: "Dep Rate lb/hr", value: 0 },
  //     ],
  //   },
  // ]);

  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    var data = await AsyncStorage.getItem("finalData");
    console.log("LENGTH::::::", JSON.stringify(data));
    if (data != null && data != undefined) {
      setFinalData(JSON.parse(data));
    }
  };
  //  //Download Function
  //   function downloadExcelCsv = (rows, attachmentFilename)=>{
  //   // blob = makeExcelCsvBlob(rows)

  //  }
  function onProcedureSelect(index: any) {
    if (isSelected == index) {
      setIsSelected(-1);
    } else {
      setIsSelected(index);
    }
  }

  const onGenerateExcel = async () => {
    var items = [];

    finalData.forEach(function (data) {
      items.push({ Dataname: "Setting Data" });
      if (data.type == 'new') {
        items.push({ procedureType: 'new' });
        items.push({ id: "" });
        data.settingData[1].settingData.forEach(function (item, i) {
          items.push({
            name: item.name,
            value: item.value,
            unit: item.unit,
          });
        });
      } else {
        items.push({ procedureType: 'current' });
        items.push({ id: "" });
        data.settingData[0].settingData.forEach(function (item, i) {
          items.push({
            name: item.name,
            value: item.value,
            unit: item.unit,
          });
        });
      }
      items.push({ Dataname: "Procedure Data" });
      data["procedureData"].forEach(function (item) {
        items.push({ id: item.id });
        item["inputData"].forEach(function (item1) {
          items.push({ name: item1.name, value: item1.value });
        });
        item["resultData"].forEach(function (item1) {
          items.push({ name: item1.name, value: item1.value });
        });
      });
      items.push({ Dataname: "Final Result" });
      data["finalResult"].forEach(function (item) {
        items.push({ name: item.name, value: item.value });
      });
    });

    // alert(JSON.stringify(items));

    var ws = XLSX.utils.json_to_sheet(items);
    var wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Welding Data");

    var wbout = XLSX.write(wb, {
      // type: "base64",
      type: "binary",
      bookType: "xlsx",
    });

    // wbout = "data:image/png;base64," + wbout;

    // const uri = FileSystem.cacheDirectory + "WeldingData.xlsx";
    // console.log(`Writing to with text: ${wbout}`);

    // await Sharing.shareAsync(uri, {
    //   mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //   dialogTitle: 'MyWater data',
    //   UTI: 'com.microsoft.excel.xlsx'
    // });

    const { config, fs } = RNFetchBlob;
    const date = new Date();
    var path;
    if (Platform.OS == 'ios') {
      const { DocumentDir } = fs.dirs; // You can check the available directories in the wiki.
      path = `${DocumentDir}/WeldingProcess`;
    } else {
      const { DownloadDir } = fs.dirs; // You can check the available directories in the wiki.
      // alert("DOWNLOAD DIR::::::" + DownloadDir);
      path = `${DownloadDir}/WeldingProcess`;
    }
    // const path = `${DownloadDir}/me_${Math.floor(date.getTime() + date.getSeconds() / 2)}`;
    console.log("PATH::::::", path);

    // let path = `${RNFS.ExternalStorageDirectoryPath}/DemoApp`;
    RNFS.mkdir(path)
      .then((res) => {
        // Alert.alert('Directory success!' + res);
        const file = path + `/procedureslist_${Math.floor(date.getTime() + date.getSeconds() / 2)}.xlsx`;
        RNFS.writeFile(file, wbout, 'ascii')
          .then((response) => {
            // console.log("DOWNLOAD RES::::", response);
            Alert.alert('File Exported Successfully!', 'Exported to ' + file + ' ');
            if (Platform.OS == 'ios') {
              RNFetchBlob.ios.previewDocument(file);
            }
          })
          .catch((err) => {
            Alert.alert('File Export Failed!', 'Error ' + err.message);
          });
      })
      .catch((error) => {
        Alert.alert('Folder Creation Failed!', 'Error ' + error.message);
      });

  };






  const getFileExtention = (uri) => {
    // To get the file extension
    return /[.]/.exec(uri) ? /[^.]+$/.exec(uri) : undefined;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card
          containerStyle={[
            { shadowColor: "#ffff99", marginTop: 0, width: "100%" },
          ]}
        >
          <TouchableOpacity style={styles.excelBtnCnt} onPress={onGenerateExcel}>
            <Text style={styles.excelBtn}>Generate Excel</Text>
          </TouchableOpacity>
          {finalData.map((item, index) => (
            <View>
              <View>
                <View key={index} style={{ marginTop: "2%" }}>
                  {item.type == 'current' ? (
                    <Card
                      containerStyle={[
                        styles.inputCard,
                        { backgroundColor: "#ffff99", shadowColor: "#ffff99" },
                      ]}
                    >
                      {item.settingData[0].settingData.map((item1, key) => (
                        <View key={key} style={styles.inputCnt}>
                          <View style={styles.inputHintCnt}>
                            <Text style={styles.inputHint}>{item1.name}</Text>
                          </View>
                          <View
                            style={[styles.inputHintCnt, { marginLeft: "4%" }]}
                          >
                            <Text style={styles.input}>{item1.value}</Text>
                          </View>
                        </View>
                      ))}
                    </Card>
                  ) : (
                    <Card
                      containerStyle={[
                        styles.inputCard,
                        { backgroundColor: "#ffff99", shadowColor: "#ffff99" },
                      ]}
                    >
                      {item.settingData[1].settingData.map((item1, key) => (
                        <View key={key} style={styles.inputCnt}>
                          <View style={styles.inputHintCnt}>
                            <Text style={styles.inputHint}>{item1.name}</Text>
                          </View>
                          <View
                            style={[styles.inputHintCnt, { marginLeft: "4%" }]}
                          >
                            <Text style={styles.input}>{item1.value}</Text>
                          </View>
                        </View>
                      ))}
                    </Card>
                  )}
                </View>
              </View>
              {item.procedureData.map((item1, index) => (
                <ScrollView>
                  <View key={index}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      key={index}
                      onPress={() => onProcedureSelect(index)}
                      style={[styles.weldIdCnt]}
                    >
                      <View
                        style={{
                          width: "95%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={styles.weldId}>Weld# {item1.id}</Text>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Image
                            style={styles.upDownIcon}
                            source={
                              isSelected == index
                                ? require("../assets/up_arrow.png")
                                : require("../assets/down_arrow.png")
                            }
                          ></Image>
                        </View>
                      </View>
                    </TouchableOpacity>
                    {isSelected == index ? (
                      <Card
                        containerStyle={[
                          styles.inputCard,
                          {
                            backgroundColor: "#8db4e2",
                            shadowColor: "#8db4e2",
                          },
                        ]}
                      >
                        {item1.inputData.map((item2, index1) => (
                          <View key={index1} style={styles.inputCnt}>
                            <View style={styles.inputHintCnt}>
                              <Text style={styles.inputHint}>{item2.name}</Text>
                            </View>
                            <View
                              style={[
                                styles.inputHintCnt,
                                { marginLeft: "4%" },
                              ]}
                            >
                              <Text style={[styles.input]}>{item2.value}</Text>
                            </View>
                          </View>
                        ))}
                      </Card>
                    ) : null}
                    {isSelected == index ? (
                      <Card
                        containerStyle={[
                          styles.inputCard,
                          {
                            backgroundColor: "#ffff99",
                            shadowColor: "#ffff99",
                          },
                        ]}
                      >
                        {item1.resultData.map((item2, key) => (
                          <View key={key} style={styles.inputCnt}>
                            <View style={styles.inputHintCnt}>
                              <Text style={styles.inputHint}>{item2.name}</Text>
                            </View>
                            <View
                              style={[
                                styles.inputHintCnt,
                                { marginLeft: "4%" },
                              ]}
                            >
                              <Text style={styles.input}>{item2.value}</Text>
                            </View>
                          </View>
                        ))}
                      </Card>
                    ) : null}
                  </View>
                </ScrollView>
              ))}
              <View>
                <View key={index} style={{ marginTop: "2%" }}>
                  <Card
                    containerStyle={[
                      styles.inputCard,
                      { backgroundColor: "#5ad164", shadowColor: "#ffff99" },
                    ]}
                  >
                    {item.finalResult.map((item1, key) => (
                      <View key={key} style={styles.inputCnt}>
                        <View style={styles.inputHintCnt}>
                          <Text style={styles.inputHint}>{item1.name}</Text>
                        </View>
                        <View
                          style={[styles.inputHintCnt, { marginLeft: "4%" }]}
                        >
                          <Text style={styles.input}>{item1.value}</Text>
                        </View>
                      </View>
                    ))}
                  </Card>
                </View>
              </View>
            </View>
          ))}
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: '2%',
    alignItems: "center",
    justifyContent: "flex-start",
  },
  weldIdCnt: {
    // width: '95%',
    backgroundColor: "#addbe6",
    flexDirection: "row",
    alignItems: "center",
    padding: "2%",
    marginTop: "2%",
    alignSelf: "center",
  },
  weldId: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
  },
  upDownArrow: {
    alignSelf: "flex-end",
  },
  inputCard: {
    // padding: '1%',
    shadowOpacity: 1,
    shadowRadius: 5,
    marginTop: "1%",
    width: "95%",
    alignSelf: "center",
  },
  inputCnt: {
    // width: '100%',
    marginTop: "1%",
    flexDirection: "row",
  },
  inputHintCnt: {
    width: "48%",
  },
  inputHint: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "500",
  },
  input: {
    color: "#000000",
    fontSize: 15,
    padding: 0,
  },
  addProcedureButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: "1%",
    paddingBottom: "1%",
    // width: 50,
    // height: 40,
    // position: 'absolute',
    // bottom: 10,
    backgroundColor: "#8db4e2",
    // borderRadius: 50,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowColor: "#8db4e2",
    marginTop: "2%",
  },
  upDownIcon: {
    height: 20,
    width: 20,
  },
  finalResultHeading: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
    alignSelf: "center",
  },
  deleteIconCnt: {
    marginLeft: 10,
  },
  calculateButton: {
    backgroundColor: "#addbe6",
    alignSelf: "flex-end",
    width: "50%",
    marginTop: "5%",
    marginBottom: "1%",
    borderRadius: 2,
  },
  finalResultButton: {
    marginTop: "2%",
    backgroundColor: "#8db4e2",
    width: "95%",
    // padding:'2%',
  },
  excelBtnCnt: {
    backgroundColor: '#8db4e2',
    width: "95%",
    alignSelf: "center",
    alignItems: 'center',
  },
  excelBtn: {
    color: 'black',
    fontWeight: '600',
    margin: '2%',
  },
});
