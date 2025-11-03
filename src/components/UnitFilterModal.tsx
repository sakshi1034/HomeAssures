import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { VectorIcon } from './index';
import { getFontStyle } from '../utils/fonts';

const { height } = Dimensions.get('window');

interface UnitFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    unitType: string;
    possessionDate: string;
  }) => void;
}

const UnitFilterModal: React.FC<UnitFilterModalProps> = ({
  visible,
  onClose,
  onApplyFilters,
}) => {
  const [selectedUnitType, setSelectedUnitType] = useState<string>('');
  const [possessionDate, setPossessionDate] = useState<string>('');

  const unitTypes = ['1 BHK', '2 BHK', '3 BHK'];

  const handleReset = () => {
    setSelectedUnitType('');
    setPossessionDate('');
  };

  const handleShowResults = () => {
    onApplyFilters({
      unitType: selectedUnitType,
      possessionDate: possessionDate,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Modal Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filter</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Unit Type Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Unit Type</Text>
            <View style={styles.unitTypeContainer}>
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
            </View>
          </View>

          {/* Possession Date Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Possession Date</Text>
            <View style={styles.dateInputContainer}>
              <TextInput
                style={styles.dateInput}
                placeholder="Enter Date"
                value={possessionDate}
                onChangeText={setPossessionDate}
                placeholderTextColor="#9CA3AF"
              />
              <VectorIcon
                type="MaterialIcons"
                name="calendar-today"
                size={20}
                color="#6B7280"
              />
            </View>
          </View>

          {/* Show Results Button */}
          <TouchableOpacity
            style={styles.showResultsButton}
            onPress={handleShowResults}
            activeOpacity={0.8}
          >
            <Text style={styles.showResultsText}>Show Results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: height * 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    color: '#1F2937',
    ...getFontStyle('semiBold'),
  },
  resetText: {
    fontSize: 16,
    color: '#6366F1',
    ...getFontStyle('medium'),
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
    ...getFontStyle('semiBold'),
  },
  unitTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  unitTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  unitTypeButtonActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  unitTypeText: {
    fontSize: 14,
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  unitTypeTextActive: {
    color: '#FFFFFF',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    ...getFontStyle('regular'),
  },
  showResultsButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  showResultsText: {
    fontSize: 16,
    color: '#FFFFFF',
    ...getFontStyle('semiBold'),
  },
});

export default UnitFilterModal;
