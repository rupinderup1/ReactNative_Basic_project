import {types} from '@babel/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {ListItem} from 'react-native-elements/dist/list/ListItem';
import {ScrollView} from 'react-native-gesture-handler';
export default function OldProcedure() {
  const [isSelected, setIsSelected] = useState(-1);
  const [procedureData, setProcedureData] = useState([
    {
      id: 1,
      inputData: [
        {name: 'Weld Length(in.)', value: '23'},
        {name: 'Arc Voltage', value: '123'},
        {name: 'Welding Amperage', value: '45'},
        {name: 'Weld Speed(in/min)', value: '34'},
        {name: 'WFS(in/min)', value: '54'},
      ],
      resultData: [
        {name: 'Arc on Time(sec)', value: 4},
        {name: 'Wire Dep(lbs)', value: 5},
        {name: 'Gas Usage(cuft)', value: 22},
        {name: 'Labor Cost', value: 33},
        {name: 'Additional Cost', value: 43},
        {name: 'Heat Input(KJ/in)', value: 33},
        {name: 'Dep Rate lb/hr', value: 33},
      ],
    },
    {
      id: 2,
      inputData: [
        {name: 'Weld Length(in.)', value: ''},
        {name: 'Arc Voltage', value: ''},
        {name: 'Welding Amperage', value: ''},
        {name: 'Weld Speed(in/min)', value: ''},
        {name: 'WFS(in/min)', value: ''},
      ],
      resultData: [
        {name: 'Arc on Time(sec)', value: 0},
        {name: 'Wire Dep(lbs)', value: 0},
        {name: 'Gas Usage(cuft)', value: 0},
        {name: 'Labor Cost', value: 0},
        {name: 'Additional Cost', value: 0},
        {name: 'Heat Input(KJ/in)', value: 0},
        {name: 'Dep Rate lb/hr', value: 0},
      ],
    },
    {
      id: 3,
      inputData: [
        {name: 'Weld Length(in.)', value: ''},
        {name: 'Arc Voltage', value: ''},
        {name: 'Welding Amperage', value: ''},
        {name: 'Weld Speed(in/min)', value: ''},
        {name: 'WFS(in/min)', value: ''},
      ],
      resultData: [
        {name: 'Arc on Time(sec)', value: 0},
        {name: 'Wire Dep(lbs)', value: 0},
        {name: 'Gas Usage(cuft)', value: 0},
        {name: 'Labor Cost', value: 0},
        {name: 'Additional Cost', value: 0},
        {name: 'Heat Input(KJ/in)', value: 0},
        {name: 'Dep Rate lb/hr', value: 0},
      ],
    },
    {
      id: 4,
      inputData: [
        {name: 'Weld Length(in.)', value: ''},
        {name: 'Arc Voltage', value: ''},
        {name: 'Welding Amperage', value: ''},
        {name: 'Weld Speed(in/min)', value: ''},
        {name: 'WFS(in/min)', value: ''},
      ],
      resultData: [
        {name: 'Arc on Time(sec)', value: 0},
        {name: 'Wire Dep(lbs)', value: 0},
        {name: 'Gas Usage(cuft)', value: 0},
        {name: 'Labor Cost', value: 0},
        {name: 'Additional Cost', value: 0},
        {name: 'Heat Input(KJ/in)', value: 0},
        {name: 'Dep Rate lb/hr', value: 0},
      ],
    },
  ]);
  const [finalResult, setfinalResult] = useState([
    {
      id: 1,
      data: [
        {name: 'Arc on Time(sec)', value: 0},
        {name: 'Wire Dep(lbs)', value: 0},
        {name: 'Gas Usage(cuft)', value: 0},
        {name: 'Labor Cost', value: 0},
        {name: 'Additional Cost', value: 0},
        {name: 'Heat Input(KJ/in)', value: 0},
        {name: 'Dep Rate lb/hr', value: 0},
      ],
    },
  ]);

  const [finalData, setFinalData] = useState([
    {
      type: 'current',
      settingData: [
        {
          type: 'current',
          settingData: [
            {name: 'Wire Dia', value: '0.052', unit: 'in'},
            {name: 'Gas Flow Rate', value: '0', unit: 'Cuft/hr'},
            {name: 'Wire Weight', value: '0.006444335', unit: 'Ib/foot'},
            {name: 'Wire Cost', value: '1.69', unit: 'Ib'},
            {name: 'Gas Cost', value: '0', unit: 'Cuft'},
            {name: 'Labor Rate', value: '75.00', unit: 'hr'},
            {name: 'Oper Factor%', value: ' 1', unit: 'Arc on time/hr'},
            {name: 'Transfer Efficiency', value: '0.98', unit: ''},
          ],
        },
      ],
      procedureData: [
        {
          id: 1,
          inputData: [
            {name: 'Weld Length(in.)', value: '1'},
            {name: 'Arc Voltage', value: '2'},
            {name: 'Welding Amperage', value: '2'},
            {name: 'Weld Speed(in/min)', value: '1'},
            {name: 'WFS(in/min)', value: '1'},
          ],
          resultData: [
            {name: 'Arc on Time(sec)', value: 60},
            {name: 'Wire Dep(lbs)', value: 0.000526},
            {name: 'Gas Usage(cuft)', value: 0},
            {name: 'Labor Cost', value: 1.25},
            {name: 'Additional Cost', value: 0},
            {name: 'Heat Input(KJ/in)', value: 0.24},
            {name: 'Dep Rate lb/hr', value: 0.032},
          ],
        },
        {
          id: 2,
          inputData: [
            {name: 'Weld Length(in.)', value: '1'},
            {name: 'Arc Voltage', value: '2'},
            {name: 'Welding Amperage', value: '2'},
            {name: 'Weld Speed(in/min)', value: '1'},
            {name: 'WFS(in/min)', value: '1'},
          ],
          resultData: [
            {name: 'Arc on Time(sec)', value: 60},
            {name: 'Wire Dep(lbs)', value: 0.000526},
            {name: 'Gas Usage(cuft)', value: 0},
            {name: 'Labor Cost', value: 1.25},
            {name: 'Additional Cost', value: 0},
            {name: 'Heat Input(KJ/in)', value: 0.24},
            {name: 'Dep Rate lb/hr', value: 0.032},
          ],
        },
        {
          id: 3,
          inputData: [
            {name: 'Weld Length(in.)', value: '1'},
            {name: 'Arc Voltage', value: '2'},
            {name: 'Welding Amperage', value: '2'},
            {name: 'Weld Speed(in/min)', value: '1'},
            {name: 'WFS(in/min)', value: '1'},
          ],
          resultData: [
            {name: 'Arc on Time(sec)', value: 60},
            {name: 'Wire Dep(lbs)', value: 0.000526},
            {name: 'Gas Usage(cuft)', value: 0},
            {name: 'Labor Cost', value: 1.25},
            {name: 'Additional Cost', value: 0},
            {name: 'Heat Input(KJ/in)', value: 0.24},
            {name: 'Dep Rate lb/hr', value: 0.032},
          ],
        },
      ],
      finalResult: [
        {name: 'Arc on Time(sec)', value: 0.0167},
        {name: 'Wire Dep(lbs)', value: 0.000889},
        {name: 'Gas Usage(cuft)', value: 0},
        {name: 'Labor Cost', value: 1.25},
        {name: 'Additional Cost', value: 0},
        {name: 'Heat Input(KJ/in)', value: 0.24},
        {name: 'Dep Rate lb/hr', value: 0},
      ],
    },
    {
      type: 'current',
      settingData: [
        {
          type: 'current',
          settingData: [
            {name: 'Wire Dia', value: '0.052', unit: 'in'},
            {name: 'Gas Flow Rate', value: '0', unit: 'Cuft/hr'},
            {name: 'Wire Weight', value: '0.006444335', unit: 'Ib/foot'},
            {name: 'Wire Cost', value: '1.69', unit: 'Ib'},
            {name: 'Gas Cost', value: '0', unit: 'Cuft'},
            {name: 'Labor Rate', value: '75.00', unit: 'hr'},
            {name: 'Oper Factor%', value: ' 1', unit: 'Arc on time/hr'},
            {name: 'Transfer Efficiency', value: '0.98', unit: ''},
          ],
        },
      ],
      procedureData: [
        {
          id: 1,
          inputData: [
            {name: 'Weld Length(in.)', value: '1'},
            {name: 'Arc Voltage', value: '2'},
            {name: 'Welding Amperage', value: '2'},
            {name: 'Weld Speed(in/min)', value: '1'},
            {name: 'WFS(in/min)', value: '1'},
          ],
          resultData: [
            {name: 'Arc on Time(sec)', value: 60},
            {name: 'Wire Dep(lbs)', value: 0.000526},
            {name: 'Gas Usage(cuft)', value: 0},
            {name: 'Labor Cost', value: 1.25},
            {name: 'Additional Cost', value: 0},
            {name: 'Heat Input(KJ/in)', value: 0.24},
            {name: 'Dep Rate lb/hr', value: 0.032},
          ],
        },
        {
          id: 2,
          inputData: [
            {name: 'Weld Length(in.)', value: '1'},
            {name: 'Arc Voltage', value: '2'},
            {name: 'Welding Amperage', value: '2'},
            {name: 'Weld Speed(in/min)', value: '1'},
            {name: 'WFS(in/min)', value: '1'},
          ],
          resultData: [
            {name: 'Arc on Time(sec)', value: 60},
            {name: 'Wire Dep(lbs)', value: 0.000526},
            {name: 'Gas Usage(cuft)', value: 0},
            {name: 'Labor Cost', value: 1.25},
            {name: 'Additional Cost', value: 0},
            {name: 'Heat Input(KJ/in)', value: 0.24},
            {name: 'Dep Rate lb/hr', value: 0.032},
          ],
        },
      ],
      finalResult: [
        {name: 'Arc on Time(sec)', value: 0.0167},
        {name: 'Wire Dep(lbs)', value: 0.000889},
        {name: 'Gas Usage(cuft)', value: 0},
        {name: 'Labor Cost', value: 1.25},
        {name: 'Additional Cost', value: 0},
        {name: 'Heat Input(KJ/in)', value: 0.24},
        {name: 'Dep Rate lb/hr', value: 0},
      ],
    },
    {
      type: 'current',
      settingData: [
        {
          type: 'current',
          settingData: [
            {name: 'Wire Dia', value: '0.052', unit: 'in'},
            {name: 'Gas Flow Rate', value: '0', unit: 'Cuft/hr'},
            {name: 'Wire Weight', value: '0.006444335', unit: 'Ib/foot'},
            {name: 'Wire Cost', value: '1.69', unit: 'Ib'},
            {name: 'Gas Cost', value: '0', unit: 'Cuft'},
            {name: 'Labor Rate', value: '75.00', unit: 'hr'},
            {name: 'Oper Factor%', value: ' 1', unit: 'Arc on time/hr'},
            {name: 'Transfer Efficiency', value: '0.98', unit: ''},
          ],
        },
      ],
      procedureData: [
        {
          id: 1,
          inputData: [
            {name: 'Weld Length(in.)', value: '1'},
            {name: 'Arc Voltage', value: '2'},
            {name: 'Welding Amperage', value: '2'},
            {name: 'Weld Speed(in/min)', value: '1'},
            {name: 'WFS(in/min)', value: '1'},
          ],
          resultData: [
            {name: 'Arc on Time(sec)', value: 60},
            {name: 'Wire Dep(lbs)', value: 0.000526},
            {name: 'Gas Usage(cuft)', value: 0},
            {name: 'Labor Cost', value: 1.25},
            {name: 'Additional Cost', value: 0},
            {name: 'Heat Input(KJ/in)', value: 0.24},
            {name: 'Dep Rate lb/hr', value: 0.032},
          ],
        },
        {
          id: 2,
          inputData: [
            {name: 'Weld Length(in.)', value: '1'},
            {name: 'Arc Voltage', value: '2'},
            {name: 'Welding Amperage', value: '2'},
            {name: 'Weld Speed(in/min)', value: '1'},
            {name: 'WFS(in/min)', value: '1'},
          ],
          resultData: [
            {name: 'Arc on Time(sec)', value: 60},
            {name: 'Wire Dep(lbs)', value: 0.000526},
            {name: 'Gas Usage(cuft)', value: 0},
            {name: 'Labor Cost', value: 1.25},
            {name: 'Additional Cost', value: 0},
            {name: 'Heat Input(KJ/in)', value: 0.24},
            {name: 'Dep Rate lb/hr', value: 0.032},
          ],
        },
        {
          id: 3,
          inputData: [
            {name: 'Weld Length(in.)', value: '1'},
            {name: 'Arc Voltage', value: '2'},
            {name: 'Welding Amperage', value: '2'},
            {name: 'Weld Speed(in/min)', value: '1'},
            {name: 'WFS(in/min)', value: '1'},
          ],
          resultData: [
            {name: 'Arc on Time(sec)', value: 60},
            {name: 'Wire Dep(lbs)', value: 0.000526},
            {name: 'Gas Usage(cuft)', value: 0},
            {name: 'Labor Cost', value: 1.25},
            {name: 'Additional Cost', value: 0},
            {name: 'Heat Input(KJ/in)', value: 0.24},
            {name: 'Dep Rate lb/hr', value: 0.032},
          ],
        },
      ],
      finalResult: [
        {name: 'Arc on Time(sec)', value: 0.0167},
        {name: 'Wire Dep(lbs)', value: 0.000889},
        {name: 'Gas Usage(cuft)', value: 0},
        {name: 'Labor Cost', value: 1.25},
        {name: 'Additional Cost', value: 0},
        {name: 'Heat Input(KJ/in)', value: 0.24},
        {name: 'Dep Rate lb/hr', value: 0},
      ],
    },
  ]);

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    var finalData = [];
    var data = await AsyncStorage.getItem('finalData');
    console.log(data);
    finalData = JSON.parse(data);
    // setfinalData()
  };

  function onProcedureSelect(index: any) {
    if (isSelected == index) {
      setIsSelected(-1);
    } else {
      setIsSelected(index);
    }
  }

  return (
    <ScrollView>
      {/* <View style={styles.container} >
                {
                    procedureData.map((item, index,) => (
                        <View key={index} >
                            <TouchableOpacity activeOpacity={0.9} key={index} onPress={() => onProcedureSelect(index)} style={[styles.weldIdCnt]}>
                                <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.weldId}>Weld# {item.id}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={styles.upDownIcon} source={isSelected == index ? require('../assets/up_arrow.png') : require('../assets/down_arrow.png')}></Image>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {isSelected == index ? (
                                <Card containerStyle={[styles.inputCard, { backgroundColor: '#8db4e2', shadowColor: '#8db4e2' }]}>
                                    {
                                        item.inputData.map((item1, index1) => (
                                            <View key={index1} style={styles.inputCnt}>
                                                <View style={styles.inputHintCnt}>
                                                    <Text style={styles.inputHint}>{item1.name}</Text>
                                                </View>
                                                <View style={[styles.inputHintCnt, { marginLeft: '4%' }]}>
                                                    <Text style={[styles.input]}>{item1.value}</Text>
                                                </View>
                                            </View>
                                        ))
                                    }

                                </Card>
                            ) : null}
                            {isSelected == index ? (
                                <Card containerStyle={[styles.inputCard, { backgroundColor: '#ffff99', shadowColor: '#ffff99' }]}>
                                    {
                                        item.resultData.map((item1, key) => (
                                            <View key={key} style={styles.inputCnt}>
                                                <View style={styles.inputHintCnt}>
                                                    <Text style={styles.inputHint}>{item1.name}</Text>
                                                </View>
                                                <View style={[styles.inputHintCnt, { marginLeft: '4%' }]}>
                                                    <Text style={styles.input}>{item1.value}</Text>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </Card>
                            ) : null}

                        </View>

                    ))}
            </View> */}

      {/* new Changes */}
      {
        <View style={styles.container}>
          <Card
            containerStyle={[
              styles.inputCard,
              {backgroundColor: '#ffff99', shadowColor: '#ffff99'},
            ]}>
            <View style={styles.inputCnt}>
              <View style={styles.inputHintCnt}>
                <Text style={styles.inputHint}></Text>
              </View>
              <View style={[styles.inputHintCnt, {marginLeft: '4%'}]}>
                <Text style={styles.input}></Text>
              </View>
            </View>
            {procedureData.map((item, index) => (
              <ScrollView>
                <View key={index}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    key={index}
                    onPress={() => onProcedureSelect(index)}
                    style={[styles.weldIdCnt]}>
                    <View
                      style={{
                        width: '95%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.weldId}>Weld# {item.id}</Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          style={styles.upDownIcon}
                          source={
                            isSelected == index
                              ? require('../assets/up_arrow.png')
                              : require('../assets/down_arrow.png')
                          }></Image>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {isSelected == index ? (
                    <Card
                      containerStyle={[
                        styles.inputCard,
                        {backgroundColor: '#8db4e2', shadowColor: '#8db4e2'},
                      ]}>
                      {item.inputData.map((item1, index1) => (
                        <View key={index1} style={styles.inputCnt}>
                          <View style={styles.inputHintCnt}>
                            <Text style={styles.inputHint}>{item1.name}</Text>
                          </View>
                          <View
                            style={[styles.inputHintCnt, {marginLeft: '4%'}]}>
                            <Text style={[styles.input]}>{item1.value}</Text>
                          </View>
                        </View>
                      ))}
                    </Card>
                  ) : null}
                  {isSelected == index ? (
                    <Card
                      containerStyle={[
                        styles.inputCard,
                        {backgroundColor: '#ffff99', shadowColor: '#ffff99'},
                      ]}>
                      {item.resultData.map((item1, key) => (
                        <View key={key} style={styles.inputCnt}>
                          <View style={styles.inputHintCnt}>
                            <Text style={styles.inputHint}>{item1.name}</Text>
                          </View>
                          <View
                            style={[styles.inputHintCnt, {marginLeft: '4%'}]}>
                            <Text style={styles.input}>{item1.value}</Text>
                          </View>
                        </View>
                      ))}
                    </Card>
                  ) : null}
                </View>
              </ScrollView>
            ))}

            <View>
              <Card
                containerStyle={[
                  styles.inputCard,
                  {backgroundColor: 'purple', shadowColor: '#ffff99'},
                ]}>
                {/* {
                                    item.data.map((item1, key) => (
                                        <View key={key} style={styles.inputCnt}>
                                            <View style={styles.inputHintCnt}>
                                                <Text style={styles.inputHint}>{item1.name}</Text>
                                            </View>
                                            <View style={[styles.inputHintCnt, { marginLeft: '4%' }]}>
                                                <Text style={styles.input}>{item1.value}</Text>
                                            </View>
                                        </View>
                                    ))
                                } */}
              </Card>
            </View>
          </Card>
        </View>
      }

      <View>
        {finalResult.map((item, index) => (
          <View key={index} style={{marginTop: '60%'}}>
            <Card
              containerStyle={[
                styles.inputCard,
                {backgroundColor: '#ffff99', shadowColor: '#ffff99'},
              ]}>
              {item.data.map((item1, key) => (
                <View key={key} style={styles.inputCnt}>
                  <View style={styles.inputHintCnt}>
                    <Text style={styles.inputHint}>{item1.name}</Text>
                  </View>
                  <View style={[styles.inputHintCnt, {marginLeft: '4%'}]}>
                    <Text style={styles.input}>{item1.value}</Text>
                  </View>
                </View>
              ))}
            </Card>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  weldIdCnt: {
    // width: '95%',
    backgroundColor: '#addbe6',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2%',
    marginTop: '2%',
    alignSelf: 'center',
  },
  weldId: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  upDownArrow: {
    alignSelf: 'flex-end',
  },
  inputCard: {
    // padding: '1%',
    shadowOpacity: 1,
    shadowRadius: 5,
    marginTop: '1%',
    width: '95%',
    marginLeft: '3%',
  },
  inputCnt: {
    // width: '100%',
    marginTop: '1%',
    flexDirection: 'row',
  },
  inputHintCnt: {
    width: '48%',
  },
  inputHint: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '500',
  },
  input: {
    color: '#000000',
    fontSize: 15,
    padding: 0,
  },
  addProcedureButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingTop: '1%',
    paddingBottom: '1%',
    // width: 50,
    // height: 40,
    // position: 'absolute',
    // bottom: 10,
    backgroundColor: '#8db4e2',
    // borderRadius: 50,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowColor: '#8db4e2',
    marginTop: '2%',
  },
  upDownIcon: {
    height: 20,
    width: 20,
  },
  finalResultHeading: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    alignSelf: 'center',
  },
  deleteIconCnt: {
    marginLeft: 10,
  },
  calculateButton: {
    backgroundColor: '#addbe6',
    alignSelf: 'flex-end',
    width: '50%',
    marginTop: '5%',
    marginBottom: '1%',
    borderRadius: 2,
  },
  finalResultButton: {
    marginTop: '2%',
    backgroundColor: '#8db4e2',
    width: '95%',
    // padding:'2%',
  },
});
