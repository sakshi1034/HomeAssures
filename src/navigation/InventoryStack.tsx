import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Inventory stack navigation
import InventoryScreen from '../screens/Inventory/InventoryScreen';
import ProjectDetailsScreen from '../screens/Inventory/ProjectDetailsScreen';
import UnitInventoryScreen from '../screens/Inventory/UnitInventoryScreen';

export type InventoryStackParamList = {
  InventoryHome: undefined;
  ProjectDetails: {
    projectId: string;
    projectName: string;
    projectImage?: string;
    unitsBooked: number;
    location: string;
    projectSummary: string;
    amenities: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  UnitInventory: {
    projectName: string;
    selectedUnitType: string;
    possessionDate: string;
  };
};

const Stack = createStackNavigator<InventoryStackParamList>();

const InventoryStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="InventoryHome" 
        component={InventoryScreen}
      />
      <Stack.Screen 
        name="ProjectDetails" 
        component={ProjectDetailsScreen}
      />
      <Stack.Screen 
        name="UnitInventory" 
        component={UnitInventoryScreen}
      />
    </Stack.Navigator>
  );
};

export default InventoryStack;
