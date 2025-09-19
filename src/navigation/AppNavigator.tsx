import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SignUpScreen, ForgotPasswordScreen, OTPScreen, NewPasswordScreen } from '../screens/Auth';
import { AddTeamScreen } from '../screens/Team';
import { ProcessRefundScreen } from '../screens/Refund';
import { AddProjectScreen, AddPhaseDetailsScreen } from '../screens/Projects';
import BottomTabNavigator from './BottomTabNavigator';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OTP: undefined;
  NewPassword: undefined;
  Home: undefined;
  AddTeam: undefined;
  ProcessRefund: undefined;
  AddProject: undefined;
  AddPhaseDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        
        {/* Main App Screens */}
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="AddTeam" component={AddTeamScreen} />
        <Stack.Screen name="ProcessRefund" component={ProcessRefundScreen} />
        <Stack.Screen name="AddProject" component={AddProjectScreen} />
        <Stack.Screen name="AddPhaseDetails" component={AddPhaseDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
