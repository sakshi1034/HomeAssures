import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { VectorIcon, AppGradient } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import DrawerMenu from '../../components/DrawerMenu';

const { width } = Dimensions.get('window');

interface HistoryItem {
  id: string;
  name: string;
  time: string;
  duration: string;
  type: 'call' | 'meeting';
  participants?: number;
}

const RMHomeScreen: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const upcomingEvent = {
    name: 'Alia Bhatt',
    time: '12:30 PM',
    inTime: 'In 1 hours',
  };

  const todayHistory: HistoryItem[] = [
    {
      id: '1',
      name: 'Hardik Pandya',
      time: '12:30 PM',
      duration: '1 m 12 secs',
      type: 'call',
    },
    {
      id: '2',
      name: 'Hardik Pandya',
      time: '12:30 PM',
      duration: '1 m 12 secs',
      type: 'call',
    },
  ];

  const yesterdayHistory: HistoryItem[] = [
    {
      id: '3',
      name: 'Google',
      time: '12:30 PM',
      duration: '1 m 12 secs',
      type: 'call',
    },
    {
      id: '4',
      name: 'Alia Bhatt +2 Others',
      time: '1:00 PM',
      duration: '1 hr',
      type: 'meeting',
      participants: 3,
    },
  ];

  const totalTodayTime = '3 hr';
  const totalYesterdayTime = '3 hrs 30 min';

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setDrawerVisible(true)}
          >
            <View style={styles.menuIconContainer}>
              <VectorIcon
                type="MaterialIcons"
                name="menu"
                size={20}
                color="#000"
              />
            </View>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Hey, Prakash</Text>

          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Upcoming Event Banner */}
          <View style={styles.upcomingBanner}>
            <View style={styles.upcomingIconContainer}>
              <VectorIcon
                type="MaterialIcons"
                name="phone"
                size={20}
                color="#42ADFE"
              />
            </View>
            <View style={styles.upcomingInfo}>
              <Text style={styles.upcomingName}>{upcomingEvent.name}</Text>
              <Text style={styles.upcomingTime}>{upcomingEvent.time}</Text>
            </View>
            <Text style={styles.upcomingInTime}>{upcomingEvent.inTime}</Text>
          </View>

          {/* Welcome Back Card */}
          <View style={styles.welcomeCard}>
            <View style={styles.welcomeHeader}>
              <Text style={styles.welcomeTitle}>Welcome Back, Prakash</Text>
              <Text style={styles.welcomeEmoji}>👋</Text>
            </View>
            <View style={styles.progressContainer}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBar, { width: '40%' }]}
              />
            </View>
            <Text style={styles.progressText}>
              Great job! You've completed 40% of your target
            </Text>
          </View>

          {/* Calls & Meeting History Section */}
          <Text style={styles.sectionTitle}>Calls & Meeting History</Text>

          {/* Today's History */}
          <View style={styles.historySection}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyDate}>Today (23rd Jan)</Text>
              <Text style={styles.historyTotalTime}>{totalTodayTime}</Text>
            </View>
            {todayHistory.map((item) => (
              <TouchableOpacity key={item.id} style={styles.historyItem}>
                <View
                  style={[
                    styles.historyIconContainer,
                    item.type === 'call' ? styles.callIcon : styles.meetingIcon,
                  ]}
                >
                  <VectorIcon
                    type="MaterialIcons"
                    name={item.type === 'call' ? 'phone' : 'groups'}
                    size={20}
                    color={item.type === 'call' ? '#42ADFE' : '#8B5CF6'}
                  />
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyName}>{item.name}</Text>
                  <View style={styles.historyTimeRow}>
                    <VectorIcon
                      type="MaterialIcons"
                      name="arrow-upward"
                      size={14}
                      color="#10B981"
                    />
                    <Text style={styles.historyTime}>
                      {item.time} {item.duration}
                    </Text>
                  </View>
                </View>
                <VectorIcon
                  type="MaterialIcons"
                  name="chevron-right"
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Yesterday's History */}
          <View style={styles.historySection}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyDate}>Yesterday (24th Jan)</Text>
              <Text style={styles.historyTotalTime}>{totalYesterdayTime}</Text>
            </View>
            {yesterdayHistory.map((item) => (
              <TouchableOpacity key={item.id} style={styles.historyItem}>
                <View
                  style={[
                    styles.historyIconContainer,
                    item.type === 'call' ? styles.callIcon : styles.meetingIcon,
                  ]}
                >
                  <VectorIcon
                    type="MaterialIcons"
                    name={item.type === 'call' ? 'phone' : 'groups'}
                    size={20}
                    color={item.type === 'call' ? '#42ADFE' : '#8B5CF6'}
                  />
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyName}>{item.name}</Text>
                  <View style={styles.historyTimeRow}>
                    <VectorIcon
                      type="MaterialIcons"
                      name="arrow-upward"
                      size={14}
                      color="#10B981"
                    />
                    <Text style={styles.historyTime}>
                      {item.time} {item.duration}
                    </Text>
                  </View>
                </View>
                <VectorIcon
                  type="MaterialIcons"
                  name="chevron-right"
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </AppGradient>

      {/* Drawer Menu */}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    color: '#000000',
    ...getFontStyle('semiBold'),
  },
  profileButton: {
    width: 40,
    height: 40,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  upcomingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  upcomingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingName: {
    fontSize: 16,
    color: '#1F2937',
    ...getFontStyle('semiBold'),
  },
  upcomingTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
    ...getFontStyle('regular'),
  },
  upcomingInTime: {
    fontSize: 14,
    color: '#EF4444',
    ...getFontStyle('medium'),
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 20,
    color: '#1F2937',
    ...getFontStyle('semiBold'),
  },
  welcomeEmoji: {
    fontSize: 24,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    ...getFontStyle('regular'),
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
    ...getFontStyle('semiBold'),
  },
  historySection: {
    marginBottom: 24,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyDate: {
    fontSize: 16,
    color: '#1F2937',
    ...getFontStyle('medium'),
  },
  historyTotalTime: {
    fontSize: 14,
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  historyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  callIcon: {
    backgroundColor: '#E0F2FE',
  },
  meetingIcon: {
    backgroundColor: '#F3E8FF',
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
    ...getFontStyle('semiBold'),
  },
  historyTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTime: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
    ...getFontStyle('regular'),
  },
  bottomSpacing: {
    height: 100,
  },
});

export default RMHomeScreen;

