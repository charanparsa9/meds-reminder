import DateTimePicker from '@react-native-community/datetimepicker';


const TimePicker = (date,mode,onChange) => {
    return(
 <DateTimePicker
 testID="dateTimePicker"
 value={date}
 mode={mode}
 is24Hour={true}
 onChange={onChange}
/>
    );
};

export default TimePicker;
