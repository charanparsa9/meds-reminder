import { Button,Input,Icon } from 'react-native-elements';
import { useState,useRef } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from "react-native-dropdown-picker";
import Padder from '../components/Padder';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Constants from 'expo-constants';
import Swipeable from 'react-native-gesture-handler/Swipeable';




export default function RemainderScreen({route}) {
  const { currRemainders } = route.params;
  let row = [];
  let prevOpenedRow;
  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };
    return (
      <FlatList
      style={styles.screen}
      keyExtractor={(item) => `${item.id}`}
      data={currRemainders}
      ItemSeparatorComponent={FlatListItemSeparator}
      renderItem={({ index, item }) => {
        var dt = new Date(item.timestamp);
        return (
            <View style={styles.container}>
              <Text style={styles.pointStyle}>
               Medicine: {`${item.medicine}`}
              </Text>
              <Text style={styles.pointStyle}>
                Scheduled at : {`${item.schedule}`}
              </Text>
            </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 4,
    paddingTop: 10,
    backgroundColor: "#E8EAF6",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  pointStyle: {
    color: "#000",
    fontSize: 24,
  },
  dateStyle: {
    fontStyle: "italic",
    fontSize: 10,
    alignSelf: "flex-end",
  },
});

