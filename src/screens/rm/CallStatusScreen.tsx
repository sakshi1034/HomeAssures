import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { AppGradient, VectorIcon, Navbar } from '../../components';
import DrawerMenu from '../../components/DrawerMenu';
import { getFontStyle } from '../../utils/fonts';
import type { RMStackParamList } from '../../navigation/RMStack';

type Props = NativeStackScreenProps<RMStackParamList, 'CallStatus'>;

const statusOptions = [
  'Interested',
  'Not Interested',
  'Schedule Site Visit',
  'Decision Pending',
  'Ready to Book',
  'Cancel Booking',
];

const CallStatusScreen: React.FC<Props> = ({ route, navigation }) => {
  const { contactName, time, duration } = route.params;
  const [selectedStatus, setSelectedStatus] = useState<string>(statusOptions[0]);
  const [notes, setNotes] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    clientName: 'Kiran Chilwery',
    venue: 'link here',
    selectedDate: 'Thu, 06 Nov',
    selectedTime: '06:00 PM',
  });
  const [cancelReasons, setCancelReasons] = useState<string[]>([]);

  const handleSave = () => {
    // Placeholder for submit logic
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          userName="Prakash"
          role="rm"
          showHamburgerMenu
          onHamburgerPress={() => setDrawerVisible(true)}
          onProfilePress={() => {}}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.pageHeader}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <VectorIcon type="MaterialIcons" name="arrow-back-ios" size={20} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Call Status</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.contactCard}>
            <View>
              <Text style={styles.contactName}>{contactName}</Text>
              <View style={styles.contactMetaRow}>
                <VectorIcon type="MaterialIcons" name="arrow-upward" size={16} color="#22C55E" />
                <Text style={styles.contactMetaText}>
                  {time}  {duration}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <VectorIcon type="MaterialIcons" name="play-arrow" size={22} color="#374151" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Pick Status</Text>
          <View style={styles.statusList}>
            {statusOptions.map((option) => {
              const selected = selectedStatus === option;
              return (
                <TouchableOpacity
                  key={option}
                  style={styles.statusItem}
                  onPress={() => setSelectedStatus(option)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
                    {selected && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[styles.statusLabel, selected && styles.statusLabelActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {selectedStatus === 'Schedule Site Visit' && (
            <View style={styles.scheduleCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderTitle}>Schedule Site Visit</Text>
                <VectorIcon type="MaterialIcons" name="expand-less" size={20} color="#94A3B8" />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Client Name</Text>
                <TextInput
                  style={styles.inputField}
                  value={scheduleData.clientName}
                  onChangeText={(text) => setScheduleData({ ...scheduleData, clientName: text })}
                  placeholder="Enter client name"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Venue Name/Link</Text>
                <TextInput
                  style={styles.inputField}
                  value={scheduleData.venue}
                  onChangeText={(text) => setScheduleData({ ...scheduleData, venue: text })}
                  placeholder="Enter venue or meeting link"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.datePickerCard}>
                <View style={styles.calendarHeader}>
                  <Text style={styles.calendarMonth}>Nov 2025</Text>
                  <View style={styles.calendarNav}>
                    <VectorIcon type="MaterialIcons" name="chevron-left" size={20} color="#111827" />
                    <VectorIcon type="MaterialIcons" name="chevron-right" size={20} color="#111827" />
                  </View>
                </View>
                <FlatList
                  data={Array.from({ length: 30 }, (_, i) => i + 1)}
                  numColumns={7}
                  scrollEnabled={false}
                  keyExtractor={(item) => item.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.calendarCell}>
                      <Text style={styles.calendarCellText}>{item}</Text>
                    </View>
                  )}
                />
                <View style={styles.selectedDateRow}>
                  <View>
                    <Text style={styles.selectDateLabel}>Select Date</Text>
                    <Text style={styles.selectedDateText}>{scheduleData.selectedDate}</Text>
                  </View>
                  <View>
                    <Text style={styles.selectDateLabel}>Time</Text>
                    <Text style={styles.selectedDateText}>{scheduleData.selectedTime}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.actionButton} activeOpacity={0.9}>
                <LinearGradient
                  colors={['#3DB7FF', '#7C3AED']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionGradient}
                >
                  <Text style={styles.actionButtonText}>Schedule Visit</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {selectedStatus === 'Cancel Booking' && (
            <>
              <View style={styles.cancelCard}>
                <Text style={styles.cardHeaderTitle}>Pick Cancellation Reasons</Text>
                {['Financial Concerns', 'Found a Better Property', 'Project Delays', 'Personal/Family Reasons'].map(
                  (reason) => {
                    const checked = cancelReasons.includes(reason);
                    return (
                      <TouchableOpacity
                        key={reason}
                        style={styles.checkboxRow}
                        onPress={() => {
                          setCancelReasons((prev) =>
                            checked ? prev.filter((item) => item !== reason) : [...prev, reason],
                          );
                        }}
                        activeOpacity={0.8}
                      >
                        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                          {checked && <VectorIcon type="MaterialIcons" name="check" size={14} color="#FFFFFF" />}
                        </View>
                        <Text style={styles.checkboxLabel}>{reason}</Text>
                      </TouchableOpacity>
                    );
                  },
                )}
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.cardHeaderTitle}>Client Retention Summary</Text>
                {[
                  {
                    title: 'Initial Cancellation Request',
                    desc: 'Client requested cancellation due to [reason].',
                    status: 'complete',
                  },
                  {
                    title: 'Retention Attempts',
                    desc: 'Sales offered [solution] to retain the client.',
                    status: 'complete',
                  },
                  {
                    title: 'Follow-Up Sent',
                    desc: 'Follow-up sent with [offer/details].',
                    status: 'complete',
                  },
                  {
                    title: "Client's Final Decision",
                    desc: 'Client confirmed cancellation despite efforts.',
                    status: 'pending',
                  },
                  {
                    title: 'Sales Recommendation',
                    desc: 'Sales team recommends proceeding with the cancellation.',
                    status: 'pending',
                  },
                ].map((item, index) => (
                  <View key={item.title} style={styles.timelineRow}>
                    <View style={styles.timelineIndicator}>
                      <View
                        style={[
                          styles.timelineDot,
                          item.status === 'complete' && styles.timelineDotComplete,
                          item.status === 'pending' && styles.timelineDotPending,
                        ]}
                      />
                      {index < 4 && <View style={styles.timelineConnector} />}
                    </View>
                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineTitle}>{item.title}</Text>
                      <Text style={styles.timelineDesc}>{item.desc}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.actionButton} activeOpacity={0.9}>
                <LinearGradient
                  colors={['#3DB7FF', '#7C3AED']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionGradient}
                >
                  <Text style={styles.actionButtonText}>Send for Approval</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}

          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Add Call Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add Call Notes"
              placeholderTextColor="#D1D5DB"
              multiline
              maxLength={120}
              value={notes}
              onChangeText={setNotes}
            />
            <Text style={styles.notesCount}>{`${notes.length}/120`}</Text>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.9}>
            <LinearGradient
              colors={['#6D28D9', '#7C3AED', '#9333EA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.saveGradient}
            >
              <Text style={styles.saveText}>Save Status</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </AppGradient>

      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        userName="Prakash"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSpacer: {
    width: 36,
    height: 36,
  },
  pageTitle: {
    fontSize: 20,
    color: '#0F172A',
    ...getFontStyle('semiBold'),
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 32,
  },
  contactName: {
    fontSize: 18,
    color: '#0F172A',
    ...getFontStyle('semiBold'),
  },
  contactMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  contactMetaText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    ...getFontStyle('regular'),
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
    ...getFontStyle('semiBold'),
  },
  statusList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  radioOuterActive: {
    borderColor: '#7C3AED',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7C3AED',
  },
  statusLabel: {
    fontSize: 16,
    color: '#4B5563',
    ...getFontStyle('medium'),
  },
  statusLabelActive: {
    color: '#1F2937',
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardHeaderTitle: {
    fontSize: 16,
    color: '#111827',
    ...getFontStyle('semiBold'),
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
    ...getFontStyle('medium'),
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    ...getFontStyle('medium'),
  },
  datePickerCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 16,
    marginTop: 4,
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  calendarMonth: {
    fontSize: 16,
    color: '#111827',
    ...getFontStyle('semiBold'),
  },
  calendarNav: {
    flexDirection: 'row',
    gap: 4,
  },
  calendarCell: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 2,
  },
  calendarCellText: {
    fontSize: 13,
    color: '#1F2937',
    ...getFontStyle('medium'),
  },
  selectedDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  selectDateLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
    ...getFontStyle('medium'),
  },
  selectedDateText: {
    fontSize: 15,
    color: '#111827',
    ...getFontStyle('semiBold'),
  },
  actionButton: {
    marginTop: 10,
  },
  actionGradient: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    ...getFontStyle('semiBold'),
  },
  cancelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#CBD5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#1F2937',
    ...getFontStyle('medium'),
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineIndicator: {
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  timelineDotComplete: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  timelineDotPending: {
    backgroundColor: '#E5E7EB',
    borderColor: '#E5E7EB',
  },
  timelineConnector: {
    width: 2,
    height: 32,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 15,
    color: '#111827',
    ...getFontStyle('semiBold'),
  },
  timelineDesc: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    lineHeight: 18,
    ...getFontStyle('regular'),
  },
  notesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  notesLabel: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 12,
    ...getFontStyle('medium'),
  },
  notesInput: {
    minHeight: 140,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    textAlignVertical: 'top',
    ...getFontStyle('regular'),
  },
  notesCount: {
    textAlign: 'right',
    marginTop: 8,
    fontSize: 12,
    color: '#D1D5DB',
    ...getFontStyle('medium'),
  },
  saveButton: {
    marginTop: 32,
  },
  saveGradient: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    color: '#FFFFFF',
    ...getFontStyle('semiBold'),
  },
});

export default CallStatusScreen;


