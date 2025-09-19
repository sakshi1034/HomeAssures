import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { VectorIcon } from '../components';
import { HomeScreen } from '../screens/Home';
import { TeamScreen } from '../screens/Team';
import { ProjectsScreen } from '../screens/Projects';
import { ReportsScreen } from '../screens/Reports';

export type BottomTabParamList = {
  Home: undefined;
  Team: undefined;
  Projects: undefined;
  Reports: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const getTabBarIcon = ({ route, focused, color, size }: {
  route: any;
  focused: boolean;
  color: string;
  size: number;
}) => {
  let iconName: string;
  let iconType: 'MaterialIcons' | 'Ionicons' = 'MaterialIcons';

  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home';
      break;
    case 'Team':
      iconName = focused ? 'people' : 'people-outline';
      iconType = 'Ionicons';
      break;
    case 'Projects':
      iconName = focused ? 'domain' : 'domain';
      break;
    case 'Reports':
      iconName = focused ? 'bar-chart' : 'bar-chart-outline';
      iconType = 'Ionicons';
      break;
    default:
      iconName = 'home';
  }

  return (
    <VectorIcon
      type={iconType}
      name={iconName}
      size={size}
      color={color}
    />
  );
};

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => getTabBarIcon({ route, focused, color, size }),
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Team" 
        component={TeamScreen}
        options={{
          tabBarLabel: 'Team',
        }}
      />
      <Tab.Screen 
        name="Projects" 
        component={ProjectsScreen}
        options={{
          tabBarLabel: 'Projects',
        }}
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{
          tabBarLabel: 'Reports',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
