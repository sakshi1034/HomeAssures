import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppGradient, Navbar, MaterialIcon } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AddTeamScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddTeam'>;

const AddTeamScreen: React.FC = () => {
  const navigation = useNavigation<AddTeamScreenNavigationProp>();

  const teamRoles = [
    {
      id: 1,
      name: 'CRM',
      members: 4,
      icon: 'business-center',
    },
    {
      id: 2,
      name: 'Sales',
      members: 4,
      icon: 'trending-up',
    },
    {
      id: 3,
      name: 'Legal',
      members: 4,
      icon: 'gavel',
    },
    {
      id: 4,
      name: 'Accounts',
      members: 4,
      icon: 'account-balance',
    },
    {
      id: 5,
      name: 'Custom Role',
      members: 0,
      icon: 'person-add',
    },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handleAddMember = (roleName: string) => {
    console.log('Add member to:', roleName);
  };
  
  const handleProfilePress = () => {
    console.log('Profile pressed');
  }
  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showBackButton={true}
          showProfile={true}
          // userName="Kiran"
          title="Add Team"
          onBackPress={handleBackPress}
          onNotificationPress={handleNotificationPress}
          onProfilePress={handleProfilePress}
        />
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.rolesList}>
            {teamRoles.map((role) => (
              <View key={role.id} style={styles.roleItem}>
                <View style={styles.roleInfo}>
                  <View style={styles.roleIconContainer}>
                    <MaterialIcon
                      name={role.icon as any}
                      size={24}
                      color="#6B7280"
                    />
                  </View>
                  <View style={styles.roleDetails}>
                    <Text style={styles.roleName}>{role.name}</Text>
                    {role.members > 0 && (
                      <Text style={styles.memberCount}>{role.members} Members</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddMember(role.name)}
                >
                  <MaterialIcon
                    // type="Icon"
                    name="add"
                    size={24}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </AppGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  rolesList: {
    paddingTop: 20,
  },
  roleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  roleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  roleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleDetails: {
    flex: 1,
  },
  roleName: {
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
    ...getFontStyle('semiBold'),
  },
  memberCount: {
    fontSize: 14,
    color: '#6B7280',
    ...getFontStyle('regular'),
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddTeamScreen;
