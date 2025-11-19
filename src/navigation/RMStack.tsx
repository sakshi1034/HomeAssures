import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RMHomeScreen from '../screens/rm/RMHomeScreen';
import CallStatusScreen from '../screens/rm/CallStatusScreen';

export type RMStackParamList = {
  RMHomeMain: undefined;
  CallStatus: {
    contactName: string;
    time: string;
    duration: string;
  };
};

const Stack = createNativeStackNavigator<RMStackParamList>();

const RMStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RMHomeMain" component={RMHomeScreen} />
      <Stack.Screen name="CallStatus" component={CallStatusScreen} />
    </Stack.Navigator>
  );
};

export default RMStack;

