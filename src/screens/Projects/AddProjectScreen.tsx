import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from 'react-native-elements';
import { AppGradient, Navbar, Dropdown } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AddProjectScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddProject'>;

const AddProjectScreen: React.FC = () => {
  const navigation = useNavigation<AddProjectScreenNavigationProp>();
  
  // Form state
  const [projectName, setProjectName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [reraNumber, setReraNumber] = useState('');
  const [numberOfPhases, setNumberOfPhases] = useState('');

  // Dropdown options
  const cityOptions = ['Mumbai', 'Pune', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolhapur'];
  const stateOptions = ['Maharashtra', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana'];
  const phaseOptions = ['1', '2', '3', '4', '5', '6'];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleNext = () => {
    console.log('Next pressed');
    console.log('Project Data:', {
      projectName,
      addressLine1,
      addressLine2,
      city,
      state,
      pinCode,
      reraNumber,
      numberOfPhases,
    });
    // Navigate to Add Phase Details screen
    navigation.navigate('AddPhaseDetails' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showBackButton={true}
          showProfile={true}
          title=""
          onBackPress={handleBackPress}
          onNotificationPress={handleNotificationPress}
          onProfilePress={handleProfilePress}
        />
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Progress Card */}
          <View style={styles.progressCard}>
            <Text style={styles.cardTitle}>Add Project Details</Text>
            <Text style={styles.cardSubtitle}>Next: Phase Details</Text>
            
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, {width: '50%'}]} />
              </View>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Project Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Project Name</Text>
              <Input
                placeholder="Enter project name"
                value={projectName}
                onChangeText={setProjectName}
                inputContainerStyle={styles.materialInputContainer}
                inputStyle={styles.materialInput}
                containerStyle={styles.materialContainer}
              />
            </View>

            {/* Address Line 1 */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address Line 1</Text>
              <Input
                placeholder="Street/Plot, Area"
                value={addressLine1}
                onChangeText={setAddressLine1}
                inputContainerStyle={styles.materialInputContainer}
                inputStyle={styles.materialInput}
                containerStyle={styles.materialContainer}
              />
            </View>

            {/* Address Line 2 */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address Line 2</Text>
              <Input
                placeholder="Landmark (optional)"
                value={addressLine2}
                onChangeText={setAddressLine2}
                inputContainerStyle={styles.materialInputContainer}
                inputStyle={styles.materialInput}
                containerStyle={styles.materialContainer}
              />
            </View>

            {/* City Dropdown */}
            <Dropdown
              label="City"
              placeholder="Enter city"
              value={city}
              options={cityOptions}
              onSelect={setCity}
            />

            {/* State Dropdown */}
            <Dropdown
              label="State"
              placeholder="Enter State"
              value={state}
              options={stateOptions}
              onSelect={setState}
            />

            {/* PIN Code */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>PIN Code</Text>
              <Input
                placeholder="6 Digit PINCode"
                value={pinCode}
                onChangeText={setPinCode}
                keyboardType="numeric"
                maxLength={6}
                inputContainerStyle={styles.materialInputContainer}
                inputStyle={styles.materialInput}
                containerStyle={styles.materialContainer}
              />
            </View>

            {/* RERA Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>RERA Number</Text>
              <Input
                placeholder="RERA registration number"
                value={reraNumber}
                onChangeText={setReraNumber}
                inputContainerStyle={styles.materialInputContainer}
                inputStyle={styles.materialInput}
                containerStyle={styles.materialContainer}
              />
            </View>

            {/* Number of Phases */}
            <Dropdown
              label="Number of Phases"
              placeholder="4"
              value={numberOfPhases}
              options={phaseOptions}
              onSelect={setNumberOfPhases}
            />
          </View>

          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacing} />
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
    paddingHorizontal: 12,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
    ...getFontStyle('semiBold'),
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    ...getFontStyle('regular'),
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
    ...getFontStyle('medium'),
  },
  materialContainer: {
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  materialInputContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    minHeight: 48,
  },
  materialInput: {
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 8,
    ...getFontStyle('regular'),
  },
  nextButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 0,
    marginBottom: 20,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    ...getFontStyle('semiBold'),
  },
  bottomSpacing: {
    height: 80,
  },
});

export default AddProjectScreen;
