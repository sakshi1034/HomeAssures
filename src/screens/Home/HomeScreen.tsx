       import React from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { VectorIcon, AppGradient, Navbar } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const statsData = [
    { title: 'Total Clients', value: '700' },
    { title: 'Active Projects', value: '02' },
  ];

  const projectsData = [
    {
      id: 1,
      siteLabel: 'Site 1',
      projectName: 'Sai Nagari',
      booked: '450 Units',
      total: '4000 Units',
      progress: 45,
      image: 'https://via.placeholder.com/80x60',
    },
    {
      id: 2,
      siteLabel: 'Site 2',
      projectName: 'Green Valley',
      booked: '320 Units',
      total: '2500 Units',
      progress: 60,
      image: 'https://via.placeholder.com/80x60',
    },
    {
      id: 3,
      siteLabel: 'Site 3',
      projectName: 'Blue Heights',
      booked: '180 Units',
      total: '1800 Units',
      progress: 35,
      image: 'https://via.placeholder.com/80x60',
    },
  ];

  const menuItems = [
    { title: 'Add\nProject', icon: 'create-new-folder', iconType: 'MaterialIcons', },
    { title: 'Add\nTeam', icon: 'diversity-3', iconType: 'MaterialIcons' },
    { title: 'Process\nRefund', icon: 'currency-exchange', iconType: 'MaterialIcons' },
    { title: 'Agreement\nStatus', icon: 'description', iconType: 'MaterialIcons' },
  ];

  const chartData = [
    { day: 'Sun', value: 800 },
    { day: 'Mon', value: 1000 },
    { day: 'Tue', value: 750 },
    { day: 'Wed', value: 1200 },
    { day: 'Thu', value: 1300 },
    { day: 'Fri', value: 900 },
    { day: 'Sat', value: 1400 },
  ];

  const maxValue = Math.max(...chartData.map(item => item.value));

  const handleMenuItemPress = (title: string) => {
    if (title.includes('Add\nTeam')) {
      navigation.navigate('AddTeam' as never);
    } else if (title.includes('Process\nRefund')) {
      navigation.navigate('ProcessRefund' as never);
    } else if (title.includes('Add\nProject')) {
      navigation.navigate('AddProject' as never);
    } else if (title.includes('Agreement')) {
      navigation.navigate('AgreementStatus' as never);
    } else {
      console.log('Menu item pressed:', title);
    }
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showProfile={true}
          userName="Prakash"
          onNotificationPress={handleNotificationPress}
          onProfilePress={() => console.log('Profile pressed')}
        />
        
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {statsData.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>

          {/* Project Cards - Horizontal Scroll */}
          <View style={{ position: 'relative' }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.projectScrollContainer}
              style={styles.projectScrollView}
            >
            {projectsData.map((project) => (
              <View key={project.id} style={styles.projectCard}>
                <LinearGradient
                  colors={['#6366F1', '#3B82F6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.projectCardGradient}
                >
                  <View style={styles.projectHeader}>
                    <View style={styles.projectInfo}>
                      <Text style={styles.siteLabel}>{project.siteLabel}</Text>
                      <Text style={styles.projectName}>{project.projectName}</Text>
                    </View>
                    <Image
                      source={{ uri: project.image }}
                      style={styles.buildingImage}
                    />
                  </View>
                
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${project.progress}%` }]} />
                    </View>
                  </View>

                  <View style={styles.projectStats}>
                    <View style={styles.projectStatItem}>
                      <Text style={styles.projectStatLabel}>Booked</Text>
                      <Text style={styles.projectStatValue}>{project.booked}</Text>
                    </View>
                    <View style={styles.projectStatItem}>
                      <Text style={styles.projectStatLabel}>Total</Text>
                      <Text style={styles.projectStatValue}>{project.total}</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('ProjectDetails', { project })}>
                    <Text style={styles.viewButtonText}>View</Text>
                    <VectorIcon
                      type="MaterialIcons"
                      name="chevron-right"
                      size={20}
                      color="#6366F1"
                    />
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.carouselArrow}
              onPress={() => navigation.navigate('AllProjects', { projects: projectsData })}
              activeOpacity={0.8}
            >
              <VectorIcon type="MaterialIcons" name="chevron-right" size={28} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* Menu Items - Horizontal Scroll */}
            <View style={styles.menuContainer}>
             {menuItems.map((item, index) => (
               <TouchableOpacity 
                 key={index} 
                 style={styles.menuItem}
                 onPress={() => handleMenuItemPress(item.title)}
               >
                 <View style={styles.menuIconContainer}>
                   <VectorIcon
                     type={item.iconType as any}
                     name={item.icon}
                     size={30}
                     color="#42ADFE"
                   />
                 </View>
                 <Text style={styles.menuText}>{item.title}</Text>
               </TouchableOpacity>
             ))}
            </View>
          {/* Manage Targets */}
          <TouchableOpacity style={styles.targetAllocationButton} onPress={() => navigation.navigate('ManageTargets')}>
            <VectorIcon
              type="MaterialIcons"
              name="track-changes"
              size={24}
              color="#FFFFFF"
            />
            <Text style={styles.targetAllocationText}>Manage Targets</Text>
            <VectorIcon
              type="MaterialIcons"
              name="chevron-right"
              size={30}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {/* Reports Section */}
          <View style={styles.reportsSection}>
            <View style={styles.reportsHeader}>
              <Text style={styles.reportsTitle}>Reports</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SalesReport' as never)}>
                <Text style={styles.viewMoreText}>View More</Text>
              </TouchableOpacity>
            </View>

            {/* Chart */}
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Weekly Sales Report</Text>
              <View style={styles.chart}>
                {chartData.map((item, index) => (
                  <View key={index} style={styles.chartBarContainer}>
                    <View style={styles.chartBar}>
                      <View
                        style={[
                          styles.chartBarFill,
                          { height: `${(item.value / maxValue) * 100}%` }
                        ]}
                      />
                    </View>
                    <Text style={styles.chartLabel}>{item.day}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.chartYAxis}>
                <Text style={styles.yAxisLabel}>₹1k</Text>
                <Text style={styles.yAxisLabel}>₹750</Text>
                <Text style={styles.yAxisLabel}>₹500</Text>
                <Text style={styles.yAxisLabel}>₹250</Text>
                <Text style={styles.yAxisLabel}>₹0</Text>
              </View>
            </View>
          </View>

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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    ...getFontStyle('regular'),
  },
  statValue: {
    fontSize: 28,
    color: '#1F2937',
    ...getFontStyle('semiBold'),
  },
  projectScrollView: {
    marginBottom: 20,
  },
  projectScrollContainer: {
    paddingHorizontal: 12,
    gap: 16,
  },
  projectCard: {
    borderRadius: 20,
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  projectCardGradient: {
    borderRadius: 20,
    padding: 20,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  projectInfo: {
    flex: 1,
  },
  siteLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    ...getFontStyle('medium'),
  },
  projectName: {
    fontSize: 22,
    color: '#FFFFFF',
    marginTop: 4,
    ...getFontStyle('semiBold'),
  },
  buildingImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  projectStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  projectStatItem: {
    flex: 1,
  },
  projectStatLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
    ...getFontStyle('regular'),
  },
  projectStatValue: {
    fontSize: 16,
    color: '#FFFFFF',
    ...getFontStyle('semiBold'),
  },
  viewButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 16,
    color: '#6366F1',
    marginRight: 4,
    ...getFontStyle('medium'),
  },
  menuContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  menuItem: {
    alignItems: 'center',
    width: 80,
  },
  menuIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 2,
  },
  menuText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    ...getFontStyle('medium'),
  },
  targetAllocationButton: {
    backgroundColor: '#42ADFE',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 24,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  targetAllocationText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginLeft: 12,
    ...getFontStyle('medium'),
  },
  reportsSection: {
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingHorizontal: 12,
    marginTop: 20,
  },
  reportsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  reportsTitle: {
    fontSize: 20,
    color: '#1F2937',
    ...getFontStyle('semiBold'),
  },
  viewMoreText: {
    fontSize: 14,
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
    ...getFontStyle('medium'),
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 12,
    paddingLeft: 40,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  chartBar: {
    flex: 1,
    width: 20,
    justifyContent: 'flex-end',
    marginHorizontal: 2,
  },
  chartBarFill: {
    backgroundColor: '#3B82F6',
    borderRadius: 2,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    ...getFontStyle('regular'),
  },
  chartYAxis: {
    position: 'absolute',
    left: 10,
    top: 48,
    height: 120,
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    ...getFontStyle('regular'),
  },
  bottomSpacing: {
    height: 100,
  },
  carouselArrow: {
    position: 'absolute',
    right: 8,
    top: '40%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});

export default HomeScreen;
