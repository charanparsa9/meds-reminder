import React from 'react';
import './helpers/firebase-config';
import RootNavigation from './navigation';
import { ThemeProvider } from 'react-native-elements';
import 'react-native-gesture-handler';
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  return (
    <ThemeProvider>
       <RootNavigation />
    </ThemeProvider>
  );
}