import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RMHomeScreen from '../screens/rm/RMHomeScreen';
import CallStatusScreen from '../screens/rm/CallStatusScreen';
import BookingsScreen from '../screens/rm/BookingScreen';
import ClientBookingDetails from '../screens/rm/ClientBookingDetails';

export type RMStackParamList = {
  RMHomeMain: undefined;
  CallStatus: {
    contactName: string;
    time: string;
    duration: string;
  };
  BookingsScreen: undefined;
  ClientBookingDetails: undefined;
};

const Stack = createNativeStackNavigator<RMStackParamList>();

// Accept route params so parent navigators (like a tab) can request a different
// initial route when mounting this stack (e.g. open BookingsScreen directly).
const RMStack: React.FC<any> = ({ route }) => {
  const initialRoute = route?.params?.initialRouteName ?? 'RMHomeMain';

  return (
    <Stack.Navigator
      initialRouteName={initialRoute as any}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RMHomeMain" component={RMHomeScreen} />
      <Stack.Screen name="CallStatus" component={CallStatusScreen} />
      <Stack.Screen name="BookingsScreen" component={BookingsScreen} />
      <Stack.Screen name="ClientBookingDetails" component={ClientBookingDetails} />
    </Stack.Navigator>
  );
};

export default RMStack;

