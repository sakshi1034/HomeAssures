import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppGradient, Navbar, Dropdown, FilterModal } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ManageTargetsNavProp = NativeStackNavigationProp<RootStackParamList, 'ManageTargets'>;

const ManageTargetsScreen: React.FC = () => {
  const navigation = useNavigation<ManageTargetsNavProp>();
  const [activeTab, setActiveTab] = useState<'Allocate' | 'Achievements'>('Allocate');
  const [role, setRole] = useState('Sales Manager (SM)');
  const [smName, setSmName] = useState('');
  const [project, setProject] = useState('');
  const [targetUnits, setTargetUnits] = useState('');
  const [targetPeriod, setTargetPeriod] = useState('');
  const [periodFilter, setPeriodFilter] = useState<'Weekly' | 'Monthly' | 'Quarterly' | 'Annually'>('Weekly');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const roleOptions = ['Sales Manager (SM)', 'Client Relationship Manager (CRM)'];
  const smOptions = ['Prachi Yeole', 'Madan More', 'Prakash Patil'];
  const projectOptions = ['Sai Nagari', 'Green Valley', 'Blue Heights'];
  const targetOptions = ['200 Units', '300 Units', '400 Units', '500 Units'];
  const periodOptions = ['Weekly', 'Monthly', 'Quarterly', 'Annually'];

  const handleBackPress = () => navigation.goBack();
  const handleNotificationPress = () => {};
  const handleProfilePress = () => {};
  const handleSend = () => {};
  const handleFilterPress = () => setShowFilterModal(true);
  const handleFilterClose = () => setShowFilterModal(false);
  const handleFilterReset = () => {
    // Reset filter logic here
    console.log('Filter reset');
  };
  const handleShowResults = () => {
    setShowFilterModal(false);
    // Apply filter logic here
    console.log('Show results');
  };

  const achievements = new Array(4).fill(null).map((_, i) => ({
    id: i + 1,
    name: 'Rajesh Sharma',
    project: 'Sai Dwarka',
    avatar: 'https://via.placeholder.com/48',
    progress: 0.55,
    target: 440,
    achieved: 320,
    days: '04/07 Days',
  }));

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showBackButton={true}
          showProfile={true}
          title="Manage Targets"
          onBackPress={handleBackPress}
          onNotificationPress={handleNotificationPress}
          onProfilePress={handleProfilePress}
        />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Tabs */}
          <View style={styles.tabSwitch}>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'Allocate' && styles.tabActive]}
              onPress={() => setActiveTab('Allocate')}
            >
              <Text style={[styles.tabText, activeTab === 'Allocate' && styles.tabTextActive]}>Allocate Targets</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'Achievements' && styles.tabActive]}
              onPress={() => setActiveTab('Achievements')}
            >
              <Text style={[styles.tabText, activeTab === 'Achievements' && styles.tabTextActive]}>Achievements</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'Allocate' ? (
            <View>
              {/* Role */}
              <Text style={styles.label}>Role</Text>
              <Dropdown
                label=""
                placeholder="Sales Manager (SM)"
                value={role}
                options={roleOptions}
                onSelect={setRole}
              />

              {/* SM Name */}
              <Text style={styles.label}>SM Name</Text>
              <Dropdown
                label=""
                placeholder="Select SM Name"
                value={smName}
                options={smOptions}
                onSelect={setSmName}
              />

              {/* Project */}
              <Text style={styles.label}>Project</Text>
              <Dropdown
                label=""
                placeholder="Select Project"
                value={project}
                options={projectOptions}
                onSelect={setProject}
              />

              {/* Target units */}
              <Text style={styles.label}>Target (No of Units)</Text>
              <Dropdown
                label=""
                placeholder="Select Target (No of Units)"
                value={targetUnits}
                options={targetOptions}
                onSelect={setTargetUnits}
              />

              {/* Target period */}
              <Text style={styles.label}>Target Period</Text>
              <Dropdown
                label=""
                placeholder="Select Target Period"
                value={targetPeriod}
                options={periodOptions}
                onSelect={setTargetPeriod}
              />

              {/* Send button */}
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {/* Search and filter */}
              <View style={styles.searchRow}>
                <View style={styles.searchBox}>
                  <Icon name="search" size={20} color="#6B7280" />
                  <TextInput placeholder="Search by Client name or Lawyer..." placeholderTextColor="#9CA3AF" style={styles.searchInput} />
                </View>
                <TouchableOpacity style={styles.filterBtn} onPress={handleFilterPress}>
                  <Icon name="tune" size={22} color="#111827" />
                </TouchableOpacity>
              </View>

              {/* Period chips */}
              <View style={styles.chipsRow}>
                {(['Weekly', 'Monthly', 'Quarterly', 'Annually'] as const).map((p) => (
                  <TouchableOpacity key={p} style={[styles.chip, periodFilter === p && styles.chipActive]} onPress={() => setPeriodFilter(p)}>
                    <Text style={[styles.chipText, periodFilter === p && styles.chipTextActive]}>{p}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Achievement cards */}
              {achievements.map((a) => (
                <View key={a.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={styles.cardLeft}>
                      <Image source={{ uri: a.avatar }} style={styles.avatar} />
                      <Text style={styles.cardName}>{a.name}</Text>
                    </View>
                    <Text style={styles.cardProject}>Sai Dwarka</Text>
                  </View>

                  <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>Progress</Text>
                    <Text style={styles.daysText}>{a.days}</Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${a.progress * 100}%` }]} />
                  </View>

                  <View style={styles.targetsRow}>
                    <Text style={styles.targetText}>Target: <Text style={styles.targetBold}>{a.target} Units</Text></Text>
                    <Text style={styles.targetText}>Achieved: <Text style={styles.targetBold}>{a.achieved} Units</Text></Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Filter Modal */}
        <FilterModal
          visible={showFilterModal}
          onClose={handleFilterClose}
          onReset={handleFilterReset}
          onShowResults={handleShowResults}
          sections={[
            {
              title: 'Project Name',
              type: 'chips',
              options: [
                { label: 'Project 1', value: 'project1' },
                { label: 'Project 2', value: 'project2' },
              ],
            },
            {
              title: 'Custom Date Range',
              type: 'dateRange',
            },
            {
              title: 'Achievement %',
              type: 'chips',
              options: [
                { label: 'High to low', value: 'highToLow' },
                { label: 'Low to high', value: 'lowToHigh' },
              ],
            },
          ]}
        />
      </AppGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 12 },
  tabSwitch: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    marginBottom: 20,
  },
  tabBtn: { flex: 1, paddingVertical: 4, alignItems: 'center' },
  tabActive: { backgroundColor: '#42ADFE' },
  tabText: { fontSize: 16, color: '#6B7280', ...getFontStyle('medium') },
  tabTextActive: { color: '#FFFFFF', ...getFontStyle('semiBold'), },
  label: { fontSize: 18, color: '#111827', marginBottom: 5, marginTop: 10, ...getFontStyle('semiBold') },
  sendButton: {
    marginTop: 24,
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
  sendButtonText: { color: '#FFFFFF', fontSize: 18, ...getFontStyle('semiBold') },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: { flex: 1, ...getFontStyle('regular'), color: '#111827' },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  chip: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12, backgroundColor: '#F3F4F6' },
  chipActive: { backgroundColor: '#EDE9FE' },
  chipText: { fontSize: 14, color: '#6B7280', ...getFontStyle('medium') },
  chipTextActive: { color: '#8B5CF6', ...getFontStyle('semiBold') },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  cardName: { fontSize: 18, color: '#111827', ...getFontStyle('semiBold') },
  cardProject: { fontSize: 14, color: '#7C3AED', ...getFontStyle('semiBold') },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 14, color: '#6B7280', ...getFontStyle('medium') },
  daysText: { fontSize: 12, color: '#9CA3AF', ...getFontStyle('regular') },
  progressTrack: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  progressFill: { height: '100%', backgroundColor: '#6366F1' },
  targetsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  targetText: { fontSize: 14, color: '#6B7280', ...getFontStyle('medium') },
  targetBold: { color: '#111827', ...getFontStyle('semiBold') },
  bottomSpacing: { height: 80 },
});

export default ManageTargetsScreen;


