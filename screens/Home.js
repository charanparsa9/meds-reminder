import { useAuthentication } from '../helpers/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  View,
} from "react-native";// import { signOut } from 'firebase/auth';
import { userSignOut } from '../helpers/hooks/useAuthentication';
import React, { useEffect, useRef, useState } from "react";
import { setupAlarmListener,initHistoryDB } from '../helpers/fb-utility';


const HomeScreen = ({ route, navigation }) => {

  const [remainders, setRemainders] = useState([]); 
  const { user } = useAuthentication();

  useEffect(() => {
    try {
      initHistoryDB();
    } catch (err) {
      console.log(err);
    }
    setupAlarmListener((items) => {
      setRemainders(items);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Reminders",{currRemainders: remainders})
          }
        >
          <Text style={styles.headerButton}>Reminders</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            userSignOut()
          }
        >
         <Text style={styles.headerButton}>Sign out</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>

      <Button title="Add Schedule" style={styles.button} onPress={() => navigation.navigate("Add")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10
  }
});

export default HomeScreen;
