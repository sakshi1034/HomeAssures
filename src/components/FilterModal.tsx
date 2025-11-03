import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { getFontStyle } from '../utils/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height } = Dimensions.get('window');

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSection {
  title: string;
  type: 'chips' | 'dateRange';
  options?: FilterOption[];
  selectedValue?: string;
  onSelect?: (value: string) => void;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onReset: () => void;
  onShowResults: () => void;
  sections: FilterSection[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onReset,
  onShowResults,
  sections,
}) => {
  const [localSections, setLocalSections] = useState<FilterSection[]>(sections);

  const handleChipSelect = (sectionIndex: number, value: string) => {
    const updatedSections = [...localSections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      selectedValue: value,
    };
    setLocalSections(updatedSections);
    if (updatedSections[sectionIndex].onSelect) {
      updatedSections[sectionIndex].onSelect!(value);
    }
  };

  const handleReset = () => {
    const resetSections = localSections.map(section => ({
      ...section,
      selectedValue: undefined,
      startDate: '',
      endDate: '',
    }));
    setLocalSections(resetSections);
    onReset();
  };

  const renderChipSection = (section: FilterSection, sectionIndex: number) => (
    <View key={sectionIndex} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.chipsContainer}>
        {section.options?.map((option, optionIndex) => (
          <TouchableOpacity
            key={optionIndex}
            style={[
              styles.chip,
              section.selectedValue === option.value && styles.chipSelected,
            ]}
            onPress={() => handleChipSelect(sectionIndex, option.value)}
          >
            <Text
              style={[
                styles.chipText,
                section.selectedValue === option.value && styles.chipTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderDateRangeSection = (section: FilterSection, sectionIndex: number) => (
    <View key={sectionIndex} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.dateRangeContainer}>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={styles.dateInput}
            placeholder="Start Date"
            placeholderTextColor="#9CA3AF"
            value={section.startDate}
            onChangeText={section.onStartDateChange}
          />
          <Icon name="calendar-today" size={20} color="#6B7280" />
        </View>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={styles.dateInput}
            placeholder="End Date"
            placeholderTextColor="#9CA3AF"
            value={section.endDate}
            onChangeText={section.onEndDateChange}
          />
          <Icon name="calendar-today" size={20} color="#6B7280" />
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Filter</Text>
                <TouchableOpacity onPress={handleReset}>
                  <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
              </View>

              {/* Content */}
              <View style={styles.content}>
                {localSections.map((section, index) => {
                  if (section.type === 'chips') {
                    return renderChipSection(section, index);
                  } else if (section.type === 'dateRange') {
                    return renderDateRangeSection(section, index);
                  }
                  return null;
                })}
              </View>

              {/* Action Button */}
              <TouchableOpacity style={styles.showResultsButton} onPress={onShowResults}>
                <Text style={styles.showResultsText}>Show Results</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.7,
    paddingBottom: 34, // Safe area padding
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    color: '#111827',
    ...getFontStyle('bold'),
  },
  resetText: {
    fontSize: 16,
    color: '#111827',
    ...getFontStyle('medium'),
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#111827',
    marginBottom: 12,
    ...getFontStyle('semiBold'),
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipSelected: {
    backgroundColor: '#F3F4F6',
    borderColor: '#F3F4F6',
  },
  chipText: {
    fontSize: 14,
    color: '#111827',
    ...getFontStyle('medium'),
  },
  chipTextSelected: {
    color: '#111827',
    ...getFontStyle('semiBold'),
  },
  dateRangeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    height: 48,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    ...getFontStyle('regular'),
  },
  showResultsButton: {
    marginHorizontal: 24,
    marginTop: 20,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  showResultsText: {
    color: '#FFFFFF',
    fontSize: 18,
    ...getFontStyle('semiBold'),
  },
});

export default FilterModal;
