import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RMHomeScreen from '../screens/rm/RMHomeScreen';

export type RMStackParamList = {
  RMHomeMain: undefined;
  // Add more RM screens here as needed
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
    </Stack.Navigator>
  );
};

export default RMStack;

