import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home';
import { AddTeamScreen } from '../screens/Team';
import { ProcessRefundScreen } from '../screens/Refund';
import { AddProjectScreen, AddPhaseDetailsScreen } from '../screens/Projects';
import ProjectDetailsScreen from '../screens/Projects/ProjectDetailsScreen';
import AllProjectsScreen from '../screens/Projects/AllProjectsScreen';
import SalesReportScreen from '../screens/Reports/SalesReportScreen';
import ManageTargetsScreen from '../screens/Targets/ManageTargetsScreen';
import AgreementStatusScreen from '../screens/Agreements/AgreementStatusScreen';

export type HomeStackParamList = {
  HomeMain: undefined;
  AddTeam: undefined;
  ProcessRefund: undefined;
  AddProject: undefined;
  AddPhaseDetails: undefined;
  AgreementStatus: undefined;
  ProjectDetails: { project: { id: number; siteLabel: string; projectName: string; booked: string; total: string; progress: number; image: string } };
  AllProjects: { projects: { id: number; projectName: string }[] } | undefined;
  SalesReport: undefined;
  ManageTargets: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="AddTeam" component={AddTeamScreen} />
      <Stack.Screen name="ProcessRefund" component={ProcessRefundScreen} />
      <Stack.Screen name="AddProject" component={AddProjectScreen} />
      <Stack.Screen name="AddPhaseDetails" component={AddPhaseDetailsScreen} />
      <Stack.Screen name="AgreementStatus" component={AgreementStatusScreen} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      <Stack.Screen name="AllProjects" component={AllProjectsScreen} />
      <Stack.Screen name="SalesReport" component={SalesReportScreen} />
      <Stack.Screen name="ManageTargets" component={ManageTargetsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
