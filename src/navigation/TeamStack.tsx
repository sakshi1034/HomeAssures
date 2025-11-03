import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TeamScreen } from '../screens/Team';
import { AddTeamScreen } from '../screens/Team';

export type TeamStackParamList = {
  TeamMain: undefined;
  AddTeam: undefined;
};

const Stack = createNativeStackNavigator<TeamStackParamList>();

const TeamStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TeamMain" component={TeamScreen} />
      <Stack.Screen name="AddTeam" component={AddTeamScreen} />
    </Stack.Navigator>
  );
};

export default TeamStack;
