import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProjectsScreen } from '../screens/Projects';
import { AddProjectScreen, AddPhaseDetailsScreen } from '../screens/Projects';
import ProjectDetailsScreen from '../screens/Projects/ProjectDetailsScreen';
import AllProjectsScreen from '../screens/Projects/AllProjectsScreen';

export type ProjectsStackParamList = {
  ProjectsMain: undefined;
  AddProject: undefined;
  AddPhaseDetails: undefined;
  ProjectDetails: { project: { id: number; siteLabel: string; projectName: string; booked: string; total: string; progress: number; image: string } };
  AllProjects: { projects: { id: number; projectName: string }[] } | undefined;
};

const Stack = createNativeStackNavigator<ProjectsStackParamList>();

const ProjectsStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProjectsMain" component={ProjectsScreen} />
      <Stack.Screen name="AddProject" component={AddProjectScreen} />
      <Stack.Screen name="AddPhaseDetails" component={AddPhaseDetailsScreen} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      <Stack.Screen name="AllProjects" component={AllProjectsScreen} />
    </Stack.Navigator>
  );
};

export default ProjectsStack;
