import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { VectorIcon, AppGradient, Navbar } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { InventoryStackParamList } from '../../navigation/InventoryStack';

type UnitInventoryScreenNavigationProp = StackNavigationProp<InventoryStackParamList, 'UnitInventory'>;
type UnitInventoryScreenRouteProp = RouteProp<InventoryStackParamList, 'UnitInventory'>;

const { width } = Dimensions.get('window');

// Unit status types
type UnitStatus = 'available' | 'sold' | 'interested' | 'bestSeller' | 'selected';

interface Unit {
  id: string;
  status: UnitStatus;
  floor: number;
  unitNumber: string;
}

interface Building {
  id: string;
  name: string;
  totalUnits: number;
  floors: Unit[][];
}

const UnitInventoryScreen: React.FC = () => {
  const navigation = useNavigation<UnitInventoryScreenNavigationProp>();
  const route = useRoute<UnitInventoryScreenRouteProp>();
  const { projectName, selectedUnitType, possessionDate } = route.params;

  const [selectedBuilding, setSelectedBuilding] = useState(0);
  const [selectedPhase, setSelectedPhase] = useState('Phase 1 - 360');

  // Mock data for buildings and units
  const buildings: Building[] = [
    {
      id: '1',
      name: 'Building 1',
      totalUnits: 100,
      floors: generateMockFloors(100, 12)
    },
    {
      id: '2',
      name: 'Building 2',
      totalUnits: 100,
      floors: generateMockFloors(100, 12)
    },
    {
      id: '3',
      name: 'Building 3',
      totalUnits: 10,
      floors: generateMockFloors(10, 2)
    }
  ];

  const phases = ['Phase 1 - 360', 'Phase 2 - 240', 'Phase 3 - 180'];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const getUnitStyle = (status: UnitStatus) => {
    switch (status) {
      case 'available':
        return styles.unitAvailable;
      case 'sold':
        return styles.unitSold;
      case 'interested':
        return styles.unitInterested;
      case 'bestSeller':
        return styles.unitBestSeller;
      case 'selected':
        return styles.unitSelected;
      default:
        return styles.unitAvailable;
    }
  };

  const getStatusLabel = (status: UnitStatus) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'sold':
        return 'Sold';
      case 'interested':
        return 'Interested';
      case 'bestSeller':
        return 'Best Seller';
      case 'selected':
        return 'Selected';
      default:
        return 'Available';
    }
  };

  const currentBuilding = buildings[selectedBuilding];

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showProfile={true}
          userName="Prakash"
          onNotificationPress={handleNotificationPress}
          onProfilePress={() => console.log('Profile pressed')}
          title={`${selectedUnitType}'s in ${projectName}`}
          showBackButton={true}
          onBackPress={handleBackPress}
        />
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Filter Info */}
          <View style={styles.filterInfo}>
            <Text style={styles.filterText}>
              {selectedUnitType}'s Available in {projectName}
            </Text>
          </View>

          {/* Phase Selection */}
          <View style={styles.phaseContainer}>
            <TouchableOpacity style={styles.phaseDropdown}>
              <Text style={styles.phaseText}>{selectedPhase}</Text>
              <VectorIcon
                type="MaterialIcons"
                name="keyboard-arrow-down"
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          {/* Building Selection Tabs */}
          <View style={styles.buildingTabsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.buildingTabs}
            >
              {buildings.map((building, index) => (
                <TouchableOpacity
                  key={building.id}
                  style={[
                    styles.buildingTab,
                    selectedBuilding === index && styles.buildingTabActive
                  ]}
                  onPress={() => setSelectedBuilding(index)}
                >
                  <Text
                    style={[
                      styles.buildingTabText,
                      selectedBuilding === index && styles.buildingTabTextActive
                    ]}
                  >
                    {building.name} - {building.totalUnits}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Unit Grid */}
          <View style={styles.gridContainer}>
            <View style={styles.gridHeader}>
              <Text style={styles.floorsLabel}>Floors</Text>
              <View style={styles.unitsHeader}>
                {Array.from({ length: 8 }, (_, i) => (
                  <Text key={i} style={styles.unitHeaderText}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                ))}
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.gridContent}>
                {currentBuilding.floors.map((floor, floorIndex) => (
                  <View key={floorIndex} style={styles.floorRow}>
                    <Text style={styles.floorLabel}>
                      {floorIndex === 0 ? 'P' : floorIndex.toString()}
                    </Text>
                    <View style={styles.unitsRow}>
                      {floor.map((unit, unitIndex) => (
                        <TouchableOpacity
                          key={unit.id}
                          style={[styles.unit, getUnitStyle(unit.status)]}
                          onPress={() => console.log('Unit pressed:', unit.id)}
                        >
                          <Text style={styles.unitText}>{unit.unitNumber}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.unitAvailable]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.unitSold]} />
              <Text style={styles.legendText}>Sold</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.unitInterested]} />
              <Text style={styles.legendText}>Interested</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.unitBestSeller]} />
              <Text style={styles.legendText}>Best Seller</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.unitSelected]} />
              <Text style={styles.legendText}>Selected</Text>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </AppGradient>
    </SafeAreaView>
  );
};

// Helper function to generate mock floor data
function generateMockFloors(totalUnits: number, totalFloors: number): Unit[][] {
  const floors: Unit[][] = [];
  const unitsPerFloor = Math.ceil(totalUnits / totalFloors);
  
  for (let floor = 0; floor < totalFloors; floor++) {
    const floorUnits: Unit[] = [];
    const unitsInThisFloor = Math.min(unitsPerFloor, totalUnits - (floor * unitsPerFloor));
    
    for (let unit = 0; unit < unitsInThisFloor; unit++) {
      const statuses: UnitStatus[] = ['available', 'sold', 'interested', 'bestSeller', 'selected'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      floorUnits.push({
        id: `${floor}-${unit}`,
        status: randomStatus,
        floor: floor,
        unitNumber: `${String.fromCharCode(65 + unit)}${floor + 1}`
      });
    }
    
    floors.push(floorUnits);
  }
  
  return floors;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  filterInfo: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterText: {
    fontSize: 16,
    color: '#1F2937',
    ...getFontStyle('medium'),
  },
  phaseContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  phaseDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  phaseText: {
    fontSize: 16,
    color: '#1F2937',
    ...getFontStyle('medium'),
  },
  buildingTabsContainer: {
    marginBottom: 20,
  },
  buildingTabs: {
    paddingHorizontal: 20,
    gap: 12,
  },
  buildingTab: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buildingTabActive: {
    backgroundColor: '#E0E7FF',
    borderColor: '#6366F1',
  },
  buildingTabText: {
    fontSize: 14,
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  buildingTabTextActive: {
    color: '#6366F1',
  },
  gridContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  gridHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  floorsLabel: {
    fontSize: 14,
    color: '#6B7280',
    width: 40,
    textAlign: 'center',
    ...getFontStyle('medium'),
  },
  unitsHeader: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  unitHeaderText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    ...getFontStyle('medium'),
  },
  gridContent: {
    minWidth: width - 80,
  },
  floorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  floorLabel: {
    fontSize: 14,
    color: '#1F2937',
    width: 40,
    textAlign: 'center',
    ...getFontStyle('medium'),
  },
  unitsRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  unit: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  unitText: {
    fontSize: 10,
    color: '#1F2937',
    ...getFontStyle('medium'),
  },
  unitAvailable: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  unitSold: {
    backgroundColor: '#9CA3AF',
  },
  unitInterested: {
    backgroundColor: '#F59E0B',
  },
  unitBestSeller: {
    backgroundColor: '#FCD34D',
  },
  unitSelected: {
    backgroundColor: '#059669',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  bottomSpacing: {
    height: 100,
  },
});

export default UnitInventoryScreen;
