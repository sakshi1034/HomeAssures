import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { VectorIcon } from '../components';
import { useUser } from '../context/UserContext';
import HomeStack from './HomeStack';
import TeamStack from './TeamStack';
import InventoryStack from './InventoryStack';
import ReportsStack from './ReportsStack';
import RMStack from './RMStack';
// import ProfileStack from './ProfileStack';

export type BottomTabParamList = {
  Home: undefined;
  Clients: undefined;
  Inventory: undefined;
  Reports: undefined;
  Profile: undefined;
  // RM Tabs
  RMHome: undefined;
  Teams: undefined;
  Projects: undefined;
  Analytics: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const getTabBarIcon = ({ route, focused, color, size, role }: {
  route: any;
  focused: boolean;
  color: string;
  size: number;
  role: 'admin' | 'rm' | null;
}) => {
  let iconName: string;
  let iconType: 'MaterialIcons' | 'Ionicons' = 'MaterialIcons';

  if (role === 'rm') {
    // RM role icons
    switch (route.name) {
      case 'RMHome':
        iconName = 'home';
        break;
      case 'Teams':
        iconName = focused ? 'people' : 'people-outline';
        iconType = 'Ionicons';
        break;
      case 'Projects':
        iconName = 'business';
        break;
      case 'Reports':
        iconName = 'description';
        break;
      case 'Analytics':
        iconName = 'bar-chart';
        break;
      default:
        iconName = 'home';
    }
  } else {
    // Admin role icons
    switch (route.name) {
      case 'Home':
        iconName = focused ? 'home' : 'home';
        break;
      case 'Clients':
        iconName = focused ? 'people' : 'people-outline';
        iconType = 'Ionicons';
        break;
      case 'Inventory':
        iconName = focused ? 'inventory' : 'inventory-2';
        break;
      case 'Reports':
        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
        iconType = 'Ionicons';
        break;
      // case 'Profile':
      //   iconName = focused ? 'person' : 'person-outline';
      //   iconType = 'Ionicons';
      //   break;
      default:
        iconName = 'home';
    }
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
  const { role } = useUser();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => getTabBarIcon({ route, focused, color, size, role }),
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
      {role === 'rm' ? (
        // RM Role Tabs
        <>
          <Tab.Screen 
            name="RMHome" 
            component={RMStack}
            options={{
              tabBarLabel: 'Home',
            }}
          />
          <Tab.Screen 
            name="Teams" 
            component={TeamStack}
            options={{
              tabBarLabel: 'Teams',
            }}
          />
          <Tab.Screen 
            name="Projects" 
            component={InventoryStack}
            options={{
              tabBarLabel: 'Projects',
            }}
          />
          <Tab.Screen 
            name="Reports" 
            component={ReportsStack}
            options={{
              tabBarLabel: 'Reports',
            }}
          />
          <Tab.Screen 
            name="Analytics" 
            component={ReportsStack}
            options={{
              tabBarLabel: 'Analytics',
            }}
          />
        </>
      ) : (
        // Admin Role Tabs
        <>
          <Tab.Screen 
            name="Home" 
            component={HomeStack}
            options={{
              tabBarLabel: 'Home',
            }}
          />
          <Tab.Screen 
            name="Clients" 
            component={TeamStack}
            options={{
              tabBarLabel: 'Clients',
            }}
          />
          <Tab.Screen 
            name="Inventory" 
            component={InventoryStack}
            options={{
              tabBarLabel: 'Inventory',
            }}
          />
          <Tab.Screen 
            name="Reports" 
            component={ReportsStack}
            options={{
              tabBarLabel: 'Reports',
            }}
          />
          {/* <Tab.Screen 
            name="Profile" 
            component={ProfileStack}
            options={{
              tabBarLabel: 'Profile',
            }}
          /> */}
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
