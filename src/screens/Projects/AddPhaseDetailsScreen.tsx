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
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AddPhaseDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddPhaseDetails'>;

interface PhaseData {
  phaseName: string;
  numberOfBuildings: string;
  buildings: BuildingData[];
}

interface BuildingData {
  name: string;
  excelFile: string | null;
}

const AddPhaseDetailsScreen: React.FC = () => {
  const navigation = useNavigation<AddPhaseDetailsScreenNavigationProp>();
  
  // Initialize with 4 phases as shown in the image
  const [phases, setPhases] = useState<PhaseData[]>([
    {
      phaseName: '',
      numberOfBuildings: '3',
      buildings: [
        { name: '', excelFile: null },
        { name: '', excelFile: null },
        { name: '', excelFile: null },
      ],
    },
    {
      phaseName: '',
      numberOfBuildings: '3',
      buildings: [
        { name: '', excelFile: null },
        { name: '', excelFile: null },
        { name: '', excelFile: null },
      ],
    },
    {
      phaseName: '',
      numberOfBuildings: '3',
      buildings: [
        { name: '', excelFile: null },
        { name: '', excelFile: null },
        { name: '', excelFile: null },
      ],
    },
    {
      phaseName: '',
      numberOfBuildings: '3',
      buildings: [
        { name: '', excelFile: null },
        { name: '', excelFile: null },
        { name: '', excelFile: null },
      ],
    },
  ]);

  const buildingOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const updatePhaseName = (phaseIndex: number, name: string) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].phaseName = name;
    setPhases(updatedPhases);
  };

  const updateNumberOfBuildings = (phaseIndex: number, count: string) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].numberOfBuildings = count;
    
    // Update buildings array based on count
    const buildingCount = parseInt(count) || 0;
    const newBuildings = Array(buildingCount).fill(null).map(() => ({ name: '', excelFile: null }));
    updatedPhases[phaseIndex].buildings = newBuildings;
    
    setPhases(updatedPhases);
  };

  const updateBuildingName = (phaseIndex: number, buildingIndex: number, name: string) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].buildings[buildingIndex].name = name;
    setPhases(updatedPhases);
  };

  const handleUploadExcel = (phaseIndex: number, buildingIndex: number) => {
    console.log(`Upload Excel for Phase ${phaseIndex + 1}, Building ${buildingIndex + 1}`);
    // Handle file upload logic here
  };

  const handleAddProject = () => {
    console.log('Add Project pressed');
    console.log('Phases Data:', phases);
    // Handle project creation logic
    navigation.navigate('Home');
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add Phase Details</Text>
          </View>

          {/* Phases */}
          {phases.map((phase, phaseIndex) => (
            <View key={phaseIndex} style={styles.phaseContainer}>
              {/* Phase Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phase {phaseIndex + 1} Name</Text>
                <Input
                  placeholder={`Enter Phase ${phaseIndex + 1} name`}
                  value={phase.phaseName}
                  onChangeText={(text) => updatePhaseName(phaseIndex, text)}
                  inputContainerStyle={styles.materialInputContainer}
                  inputStyle={styles.materialInput}
                  containerStyle={styles.materialContainer}
                />
              </View>

              {/* Number of Buildings */}
              <Dropdown
                label={`No. of buildings in Phase ${phaseIndex + 1}`}
                placeholder="3"
                value={phase.numberOfBuildings}
                options={buildingOptions}
                onSelect={(value) => updateNumberOfBuildings(phaseIndex, value)}
              />

              {/* Buildings */}
              {phase.buildings.map((building, buildingIndex) => (
                <View key={buildingIndex} style={styles.buildingRow}>
                  <View style={styles.buildingNameContainer}>
                    <Text style={styles.buildingLabel}>Building {buildingIndex + 1} Name</Text>
                    <Input
                      placeholder={`Building ${buildingIndex + 1} Name`}
                      value={building.name}
                      onChangeText={(text) => updateBuildingName(phaseIndex, buildingIndex, text)}
                      inputContainerStyle={styles.buildingInputContainer}
                      inputStyle={styles.materialInput}
                      containerStyle={styles.buildingMaterialContainer}
                    />
                  </View>
                  
                  <View style={styles.uploadContainer}>
                    <Text style={styles.uploadLabel}>Upload Excel</Text>
                    <TouchableOpacity 
                      style={styles.uploadButton}
                      onPress={() => handleUploadExcel(phaseIndex, buildingIndex)}
                    >
                      <Icon name="file-upload" size={20} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ))}

          {/* Add Project Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
            <Text style={styles.addButtonText}>Add Project</Text>
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
    paddingHorizontal: 24,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    color: '#1F2937',
    ...getFontStyle('semiBold'),
  },
  phaseContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
  buildingRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
    gap: 12,
  },
  buildingNameContainer: {
    flex: 1,
  },
  buildingLabel: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    ...getFontStyle('medium'),
  },
  buildingMaterialContainer: {
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  buildingInputContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    minHeight: 40,
  },
  uploadContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  uploadLabel: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    ...getFontStyle('medium'),
  },
  uploadButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
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
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    ...getFontStyle('semiBold'),
  },
  bottomSpacing: {
    height: 80,
  },
});

export default AddPhaseDetailsScreen;
