import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { VectorIcon, AppGradient, Navbar } from '../../components';
import UnitFilterModal from '../../components/UnitFilterModal';
import { getFontStyle } from '../../utils/fonts';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { InventoryStackParamList } from '../../navigation/InventoryStack';

type ProjectDetailsScreenNavigationProp = StackNavigationProp<InventoryStackParamList, 'ProjectDetails'>;
type ProjectDetailsScreenRouteProp = RouteProp<InventoryStackParamList, 'ProjectDetails'>;

const ProjectDetailsScreen: React.FC = () => {
  const navigation = useNavigation<ProjectDetailsScreenNavigationProp>();
  const route = useRoute<ProjectDetailsScreenRouteProp>();
  const { projectId, projectName, projectImage, unitsBooked, location, projectSummary, amenities } = route.params;

  const [selectedUnitType, setSelectedUnitType] = useState('RK');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const unitTypes = ['RK', '1BHK', '2BHK', '3BHK', 'Parking'];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handleChooseUnitType = () => {
    setShowFilterModal(true);
  };

  const handleApplyFilters = (filters: { unitType: string; possessionDate: string }) => {
    navigation.navigate('UnitInventory', {
      projectName: projectName,
      selectedUnitType: filters.unitType,
      possessionDate: filters.possessionDate,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showProfile={true}
          userName="Prakash"
          onNotificationPress={handleNotificationPress}
          onProfilePress={() => console.log('Profile pressed')}
          title={`${projectName} Details`}
          showBackButton={true}
          onBackPress={handleBackPress}
        />
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Unit Type Filters */}
          <View style={styles.unitTypeContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.unitTypeScroll}
            >
              {unitTypes.map((unitType) => (
                <TouchableOpacity
                  key={unitType}
                  style={[
                    styles.unitTypeButton,
                    selectedUnitType === unitType && styles.unitTypeButtonActive
                  ]}
                  onPress={() => setSelectedUnitType(unitType)}
                >
                  <Text
                    style={[
                      styles.unitTypeText,
                      selectedUnitType === unitType && styles.unitTypeTextActive
                    ]}
                  >
                    {unitType}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Project Image and Details */}
          <View style={styles.projectSection}>
            <Image
              source={{ uri: projectImage }}
              style={styles.projectImage}
              resizeMode="cover"
            />
            
            {/* Overlay Content */}
            <View style={styles.projectOverlay}>
              <View style={styles.projectHeader}>
                <View style={styles.projectTitleContainer}>
                  <Text style={styles.projectName}>{projectName}</Text>
                  <Text style={styles.projectId}>{projectId}</Text>
                </View>
                <View style={styles.unitsContainer}>
                  <Text style={styles.unitsBooked}>{unitsBooked}</Text>
                  <Text style={styles.unitsLabel}>units booked</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Project Information */}
          <View style={styles.projectInfo}>
            <View style={styles.locationContainer}>
              <VectorIcon
                type="MaterialIcons"
                name="location-on"
                size={16}
                color="#6B7280"
              />
              <Text style={styles.locationText}>{location}</Text>
            </View>
            
            <Text style={styles.projectSummary}>{projectSummary}</Text>
          </View>

          {/* Amenities Section */}
          <View style={styles.amenitiesSection}>
            <View style={styles.separator} />
            
            {amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <View style={styles.amenityIconContainer}>
                  <VectorIcon
                    type="MaterialIcons"
                    name={amenity.icon as any}
                    size={24}
                    color="#6366F1"
                  />
                </View>
                <View style={styles.amenityContent}>
                  <Text style={styles.amenityTitle}>{amenity.title}</Text>
                  <Text style={styles.amenityDescription}>{amenity.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Choose Unit Type Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.chooseUnitButton}
              onPress={handleChooseUnitType}
              activeOpacity={0.8}
            >
              <Text style={styles.chooseUnitButtonText}>Choose Unit Type</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Filter Modal */}
        <UnitFilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApplyFilters={handleApplyFilters}
        />
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
  unitTypeContainer: {
    paddingVertical: 12,
  },
  unitTypeScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  unitTypeButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  unitTypeButtonActive: {
    backgroundColor: '#E0E7FF',
    borderColor: '#6366F1',
    borderWidth: 1,
  },
  unitTypeText: {
    fontSize: 14,
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  unitTypeTextActive: {
    color: '#6366F1',
  },
  projectSection: {
    position: 'relative',
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  projectImage: {
    width: '100%',
    height: 200,
  },
  projectOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  projectTitleContainer: {
    flex: 1,
  },
  projectName: {
    fontSize: 20,
    color: '#FFFFFF',
    ...getFontStyle('semiBold'),
  },
  projectId: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 2,
    ...getFontStyle('regular'),
  },
  unitsContainer: {
    alignItems: 'flex-end',
  },
  unitsBooked: {
    fontSize: 20,
    color: '#FFFFFF',
    ...getFontStyle('semiBold'),
  },
  unitsLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 2,
    ...getFontStyle('regular'),
  },
  projectInfo: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
    lineHeight: 20,
    ...getFontStyle('regular'),
  },
  projectSummary: {
    fontSize: 14,
    color: '#1F2937',
    ...getFontStyle('medium'),
  },
  amenitiesSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 20,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  amenityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityContent: {
    flex: 1,
  },
  amenityTitle: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
    ...getFontStyle('semiBold'),
  },
  amenityDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    ...getFontStyle('regular'),
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  chooseUnitButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  chooseUnitButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    ...getFontStyle('semiBold'),
  },
  bottomSpacing: {
    height: 100,
  },
});

export default ProjectDetailsScreen;
