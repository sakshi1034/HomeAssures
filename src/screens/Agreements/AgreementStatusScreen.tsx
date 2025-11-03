import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { AppGradient, Navbar, FilterModal } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import {
  Button,
  Chip,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

interface AgreementItem {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
}

interface SectionData {
  title: string; // e.g., '2025\nSeptember'
  count: number;
  data: AgreementItem[];
}

const AgreementStatusScreen: React.FC = () => {
  const navigation = useNavigation();

  const sections = useMemo<SectionData[]>(
    () => [
      {
        title: '2025\nSeptember',
        count: 25,
        data: new Array(5).fill(0).map((_, i) => ({
          id: `sep-${i}`,
          title: 'Kiran Chilwery',
          subtitle: 'Samiksha Shetty, 23rd Sept',
          meta: 'Sai Nagari, P807',
        })),
      },
      {
        title: '2025\nAugust',
        count: 25,
        data: new Array(5).fill(0).map((_, i) => ({
          id: `aug-${i}`,
          title: 'Kiran Chilwery',
          subtitle: 'Samiksha Shetty, 23rd Sept',
          meta: 'Sai Nagari, P807',
        })),
      },
    ],
    [],
  );

  // Filter modal state
  const [filterVisible, setFilterVisible] = useState(false);
  const [showNewFilterModal, setShowNewFilterModal] = useState(false);
  const [projectChips, setProjectChips] = useState<string[]>(['Project 1']);
  const [sortBy, setSortBy] = useState<'recent' | '6m'>('recent');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const toggleChip = (label: string) => {
    setProjectChips(prev =>
      prev.includes(label) ? prev.filter(c => c !== label) : [...prev, label],
    );
  };

  const resetFilter = () => {
    setProjectChips([]);
    setSortBy('recent');
    setStartDate('');
    setEndDate('');
  };

  const handleNewFilterPress = () => setShowNewFilterModal(true);
  const handleNewFilterClose = () => setShowNewFilterModal(false);
  const handleNewFilterReset = () => {
    console.log('New filter reset');
  };
  const handleNewShowResults = () => {
    setShowNewFilterModal(false);
    console.log('New show results');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showBackButton={true}
          showProfile={true}
          userName="Prakash"
          title="Agreement Status"
          onBackPress={() => navigation.goBack()}
          onNotificationPress={() => {}}
          onProfilePress={() => {}}
        />

        {/* Search + Filter Row */}
        <View style={styles.searchRow}>
          <TextInput
            mode="outlined"
            placeholder="Search by Client name or Lawyer..."
            left={<TextInput.Icon icon="magnify" />}
            style={styles.searchInput}
            outlineStyle={styles.searchOutline}
          />
          <IconButton
            icon="tune"
            size={25}
            onPress={handleNewFilterPress}
            style={styles.filterBtn}
          />
        </View>

        {/* Sectioned List */}
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionMonth}>{section.title.split('\n')[1]}</Text>
              <Text style={styles.sectionYear}>{section.title.split('\n')[0]}</Text>
              <View style={styles.sectionCountWrap}>
                <Text style={styles.sectionCount}>{section.count} Agreements</Text>
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardIconWrap}>
                <Icon name="description" size={20} color="#6B7280" />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardMeta}>{item.meta}</Text>
              </View>
              <TouchableOpacity style={styles.cardAction} onPress={() => {}}>
                <Icon name="file-download" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          )}
          stickySectionHeadersEnabled={false}
        />

        {/* Filter Modal */}
        <Portal>
          <Modal
            visible={filterVisible}
            onDismiss={() => setFilterVisible(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter</Text>
              <TouchableOpacity onPress={resetFilter}>
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>Project Name</Text>
            <View style={styles.chipsRow}>
              {['Project 1', 'Project 2', 'Project 3'].map(chip => (
                <Chip
                  key={chip}
                  selected={projectChips.includes(chip)}
                  onPress={() => toggleChip(chip)}
                  style={styles.chip}
                >
                  {chip}
                </Chip>
              ))}
            </View>

            <Text style={styles.modalLabel}>Custom Date Range</Text>
            <View style={styles.dateRow}>
              <TextInput
                mode="outlined"
                placeholder="Start Date"
                value={startDate}
                onChangeText={setStartDate}
                right={<TextInput.Icon icon="calendar" />}
                style={styles.dateInput}
                outlineStyle={styles.searchOutline}
              />
              <TextInput
                mode="outlined"
                placeholder="End Date"
                value={endDate}
                onChangeText={setEndDate}
                right={<TextInput.Icon icon="calendar" />}
                style={styles.dateInput}
                outlineStyle={styles.searchOutline}
              />
            </View>

            <Text style={styles.modalLabel}>Sort by</Text>
            <View style={styles.chipsRow}>
              <Chip
                selected={sortBy === 'recent'}
                onPress={() => setSortBy('recent')}
                style={styles.chip}
              >
                Most Recent
              </Chip>
              <Chip
                selected={sortBy === '6m'}
                onPress={() => setSortBy('6m')}
                style={styles.chip}
              >
                Last 6 Months
              </Chip>
            </View>

            <Button
              mode="contained"
              onPress={() => setFilterVisible(false)}
              style={styles.resultsBtn}
              contentStyle={styles.resultsBtnContent}
            >
              Show Results
            </Button>
          </Modal>
        </Portal>

        {/* New Filter Modal */}
        <FilterModal
          visible={showNewFilterModal}
          onClose={handleNewFilterClose}
          onReset={handleNewFilterReset}
          onShowResults={handleNewShowResults}
          sections={[
            {
              title: 'Project Name',
              type: 'chips',
              options: [
                { label: 'Project 1', value: 'project1' },
                { label: 'Project 2', value: 'project2' },
                { label: 'Project 3', value: 'project3' },
              ],
            },
            {
              title: 'Custom Date Range',
              type: 'dateRange',
            },
            {
              title: 'Sort By',
              type: 'chips',
              options: [
                { label: 'Recent', value: 'recent' },
                { label: '6 Months', value: '6m' },
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  searchInput: { flex: 1, backgroundColor: 'transparent' },
  searchOutline: { borderRadius: 12 },
  filterBtn: { marginLeft: 3,},

  listContent: { paddingHorizontal: 0, paddingBottom: 24 },
  sectionHeader: {
    backgroundColor: '#E7EEF7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  sectionMonth: { fontSize: 16, color: '#1F2937', ...getFontStyle('semiBold') },
  sectionYear: { position: 'absolute', left: 24, top: -12, fontSize: 10, color: '#9CA3AF' },
  sectionCountWrap: {},
  sectionCount: { fontSize: 12, color: '#6B7280' },

  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  cardIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardBody: { flex: 1 },
  cardSubtitle: { fontSize: 12, color: '#6B7280', marginBottom: 2, ...getFontStyle('regular') },
  cardTitle: { fontSize: 14, color: '#1F2937', ...getFontStyle('semiBold') },
  cardMeta: { fontSize: 12, color: '#6B7280', marginTop: 2, ...getFontStyle('regular') },
  cardAction: { padding: 6 },

  modalContainer: {
    marginHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
},
  modalTitle: { 
    fontSize: 24, 
    color: '#1F2937', 
    ...getFontStyle('semiBold') 
},
  resetText: { 
    fontSize: 16, 
    color: '#6B7280',
    ...getFontStyle('medium') 
},
  modalLabel: { fontSize: 16, color: '#374151', marginTop: 16, marginBottom: 8, ...getFontStyle('medium') },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  chip: { backgroundColor: '#F3F4F6' },
  dateRow: { flexDirection: 'row', gap: 12 },
  dateInput: { flex: 1, backgroundColor: 'transparent' },
  resultsBtn: { marginTop: 28, borderRadius: 12 },
  resultsBtnContent: { paddingVertical: 10 },
});

export default AgreementStatusScreen;
