import { Button,Input,Icon } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { useState,useRef } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from "react-native-dropdown-picker";
import Padder from '../components/Padder';
import {
  initHistoryDB,
  setupAlarmListener,
  storeAlarmItem,
} from "../helpers/fb-utility";
import {getUserId} from "../helpers/hooks/useAuthentication";
import { schedulePushNotification } from '../helpers/Notification';

export default function AddScreen({navigation}) {
    const [date, setDate] = useState(new Date());
    const [medName, setMedName] = useState('');
    const initialField = useRef(null);
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);
    const [dosage, setDosage] =
    useState(null);
    const [open, setOpen] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };
      const [dosageItems,setDosageItems]=useState([
        { label: "Once", value: "1" },
        { label: "Weekly", value: "7" },
        { label: "Monthly", value: "31" },
      ]);
    
    return (
        <View >
            <Input
                style={styles.input}
                placeholder="Enter Medicine Name"
                ref={initialField}
                value={medName}
                autoCorrect={false}
                errorStyle={styles.inputError}
                onChangeText={(val) => setMedName(val)}
            />
            <Input
                style={styles.input}
                placeholder="Enter the Schedule time"
                ref={initialField}
                autoCorrect={false}
                errorStyle={styles.inputError}
                value={`${date.getHours()} Hours:${date.getMinutes()} Minutes`}
                disabled={true}
                rightIcon={<Icon name='timer'  color='#0000FF'
                onPress={() => showTimepicker() }/>}
            />
            <View>
                <DropDownPicker
                    placeholder='Select Dosage'
                    label="Dosage"
                    open={open}
                    value={dosage}
                    items={dosageItems}
                    setOpen={setOpen}
                    setValue={setDosage}
                    setItems={setDosageItems}
                    zIndex={3000}
                />
            </View>
            <Padder />
            <Button
                style={styles.buttons}
                title="Save"
                onPress={async () =>{
                  const notId= await schedulePushNotification(medName,date,dosage);
                  storeAlarmItem(getUserId(),{id: (new Date().getTime()),'medicine':medName,'dosage':dosage,'schedule': `${date.getHours()}:${date.getMinutes()}:00`,'notId':notId});
                  navigation.navigate("Home");
                } }
            />
            {show && <DateTimePicker mode={mode} value={date} onChange={onChange} is24Hour={true}/>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: "#E8EAF6",
      flex: 1,
    },
    weatherView: {
      margin:5,
      flexDirection: "row",
      backgroundColor: "#87CEEB",
      flex: 1,
    },
    headerButton: {
      color: "#fff",
      fontWeight: "bold",
      margin: 10,
    },
    buttons: {
      padding: 10,
    },
    inputError: {
      color: "red",
    },
    input: {
      padding: 10,
    },
    resultsGrid: {
      borderColor: "#000",
      borderWidth: 1,
    },
    resultsRow: {
      flexDirection: "row",
      borderColor: "#000",
      borderBottomWidth: 1,
    },
    resultsLabelContainer: {
      borderRightWidth: 1,
      borderRightColor: "#000",
      flex: 1,
    },
    resultsLabelText: {
      fontWeight: "bold",
      fontSize: 20,
      padding: 10,
    },
    resultsValueText: {
      fontWeight: "bold",
      fontSize: 20,
      flex: 1,
      padding: 10,
    },
  });