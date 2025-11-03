import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SalesReportScreen } from '../screens/Reports';

export type ReportsStackParamList = {
  ReportsMain: undefined;
};

const Stack = createNativeStackNavigator<ReportsStackParamList>();

const ReportsStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ReportsMain" component={SalesReportScreen} />
    </Stack.Navigator>
  );
};

export default ReportsStack;
