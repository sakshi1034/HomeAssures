import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppGradient, Navbar } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { List } from 'react-native-paper';

const renderAccordionRight = (expanded: boolean) => (_props: any) => (
  <Icon name={expanded ? 'expand-more' : 'chevron-right'} size={22} color="#374151" />
);
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

type ProjectDetailsNavProp = NativeStackNavigationProp<RootStackParamList, 'ProjectDetails'>;
type ProjectDetailsRouteProp = RouteProp<RootStackParamList, 'ProjectDetails'>;

const ProjectDetailsScreen: React.FC = () => {
  const navigation = useNavigation<ProjectDetailsNavProp>();
  const route = useRoute<ProjectDetailsRouteProp>();
  const { project } = route.params;
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const handleBackPress = () => navigation.goBack();
  const handleNotificationPress = () => {};
  const handleProfilePress = () => {};
  const handleEditPress = () => {
    navigation.navigate('AddProject' as never);
  };

  const details = [
    { label: 'Address :', value: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { label: 'City :', value: 'Pune' },
    { label: 'State :', value: 'Maharashtra' },
    { label: 'Pincode :', value: '411000' },
    { label: 'RERA Number :', value: '123455' },
    { label: 'No. of Phases :', value: '4' },
  ];

  const phases = [1, 2, 3, 4];

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showBackButton={true}
          showProfile={true}
          title={`${project.projectName} Details`}
          onBackPress={handleBackPress}
          onNotificationPress={handleNotificationPress}
          onProfilePress={handleProfilePress}
          showEditButton={true}
          onEditPress={handleEditPress}
        />

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Title moved into Navbar */}

          {/* Details */}
          <View style={styles.detailsSection}>
            {details.map((row, idx) => (
              <View key={idx} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{row.label}</Text>
                <Text style={styles.detailValue}>{row.value}</Text>
              </View>
            ))}
          </View>

          {/* Phase accordions */}
          <View style={styles.phaseList}>
            {phases.map((p) => {
              const isExpanded = !!expanded[p];
              return (
                <List.Accordion
                  key={p}
                  title={`Phase ${p} - Name`}
                  titleStyle={styles.phaseText}
                  expanded={isExpanded}
                  onPress={() => setExpanded(prev => ({ ...prev, [p]: !prev[p] }))}
                  style={[styles.accordionContainer, isExpanded && styles.accordionExpanded]}
                  right={renderAccordionRight(isExpanded)}
                >
                  <View style={styles.phaseDetailsWrapper}>
                    {[1,2,3,4].map((i) => (
                      <View key={i} style={styles.buildingRow}>
                        <Text style={styles.buildingLabel}>{`Building ${i} :`}</Text>
                        <Text style={styles.buildingValue}>Dorem ipsum</Text>
                      </View>
                    ))}
                  </View>
                </List.Accordion>
              );
            })}
          </View>

          {/* Save Changes Button */}
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
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
  scroll: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  editButton: {
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  detailsSection: {
    marginBottom: 16,
  },
  
  detailRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailLabel: {
    width: 130,
    color: '#111827',
    fontSize: 18,
    ...getFontStyle('semiBold'),
  },
  detailValue: {
    flex: 1,
    color: '#374151',
    fontSize: 18,
    lineHeight: 26,
    ...getFontStyle('regular'),
  },
  phaseList: {
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  accordionContainer: {
    borderRadius: 12,
    backgroundColor: '#EAF4FF',
    borderWidth: 1,
    borderColor: '#DCEBFF',
    overflow: 'hidden',
  },
  accordionExpanded: {
    backgroundColor: '#FFFFFF',
  },
  phaseDetailsWrapper: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  buildingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  buildingLabel: {
    fontSize: 20,
    color: '#1F2937',
    ...getFontStyle('semiBold'),
  },
  buildingValue: {
    fontSize: 18,
    color: '#374151',
    ...getFontStyle('regular'),
  },
  phaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#EAF4FF',
    borderWidth: 1,
    borderColor: '#DCEBFF',
  },
  phaseText: {
    fontSize: 22,
    color: '#111827',
    ...getFontStyle('semiBold'),
  },
  phaseMuted: {
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  saveButton: {
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    ...getFontStyle('semiBold'),
  },
});

export default ProjectDetailsScreen;


