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
import { AppGradient, Navbar, Checkbox } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ProcessRefundScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProcessRefund'>;

const ProcessRefundScreen: React.FC = () => {
  const navigation = useNavigation<ProcessRefundScreenNavigationProp>();
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  const cancellationReasons = [
    'Financial Concerns',
    'Found a Better Property',
    'Project Delays',
    'Personal/Family Reasons',
    'Client Changed Mind',
  ];

  const clientRetentionSteps = [
    {
      id: 1,
      title: 'Initial Cancellation Request',
      description: 'Client requested cancellation due to [reason].',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Retention Attempts',
      description: 'Sales offered [solution] to retain the client',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Follow-Up Sent',
      description: 'Follow-up sent with [offer/details].',
      status: 'completed',
    },
    {
      id: 4,
      title: "Client's Final Decision",
      description: 'Client confirmed cancellation despite efforts.',
      status: 'inactive',
    },
    {
      id: 5,
      title: 'Sales Recommendation',
      description: 'Sales team recommends proceeding with the cancellation',
      status: 'inactive',
    },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const toggleReason = (reason: string) => {
    setSelectedReasons(prev => 
      prev.includes(reason) 
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  const handleApproveCancellation = () => {
    console.log('Approve cancellation pressed');
    console.log('Selected reasons:', selectedReasons);
    // Handle cancellation approval logic
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'inactive':
        return '#D1D5DB';
      default:
        return '#D1D5DB';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showBackButton={true}
          showProfile={true}
          userName="Prakash"
          title="Process Refund"
          onBackPress={handleBackPress}
          onNotificationPress={handleNotificationPress}
          onProfilePress={handleProfilePress}
        />
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Cancellation Reasons Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pick Cancellation Reasons</Text>
            <View style={styles.reasonsContainer}>
              {cancellationReasons.map((reason, index) => (
                <Checkbox
                  key={index}
                  label={reason}
                  checked={selectedReasons.includes(reason)}
                  onToggle={() => toggleReason(reason)}
                />
              ))}
            </View>
          </View>

          {/* Client Retention Summary Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Client Retention Summary</Text>
            <View style={styles.retentionContainer}>
              {clientRetentionSteps.map((step) => (
                <View key={step.id} style={styles.retentionStep}>
                  <View style={styles.stepIndicator}>
                    <View 
                      style={[
                        styles.statusDot, 
                        { backgroundColor: getStatusColor(step.status) }
                      ]} 
                    />
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepDescription}>{step.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Approve Button */}
          <TouchableOpacity 
            style={styles.approveButton} 
            onPress={handleApproveCancellation}
          >
            <Text style={styles.approveButtonText}>Approve Cancellation</Text>
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
  section: {
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
  sectionTitle: {
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
    ...getFontStyle('semiBold'),
  },
  reasonsContainer: {
    // Container for checkboxes
  },
  retentionContainer: {
    // Container for retention steps
  },
  retentionStep: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepIndicator: {
    marginRight: 12,
    marginTop: 2,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
    ...getFontStyle('semiBold'),
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    ...getFontStyle('regular'),
  },
  approveButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 12 ,
    alignItems: 'center',
    marginHorizontal: 24,
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
  approveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    ...getFontStyle('semiBold'),
  },
  bottomSpacing: {
    height: 80,
  },
});

export default ProcessRefundScreen;
