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
import { AppGradient, Navbar, Dropdown } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SalesReportScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SalesReport'>;

// removed unused width

interface ChartData {
  day: string;
  '1BHK': number;
  '2BHK': number;
  'Parking': number;
}

const SalesReportScreen: React.FC = () => {
  const navigation = useNavigation<SalesReportScreenNavigationProp>();
  
  const [activeTab, setActiveTab] = useState<'Sales' | 'Revenue'>('Sales');
  const [activePeriod, setActivePeriod] = useState<'Weekly' | 'Monthly' | 'Quarterly' | 'Annually'>('Weekly');
  const [selectedProject, setSelectedProject] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [showMonthlyDetail, setShowMonthlyDetail] = useState(false);

  const projectOptions = ['All Projects', 'Sai Nagari', 'Green Valley', 'Blue Heights'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Sales Data (Units) - Weekly
  const weeklySalesData: ChartData[] = [
    { day: 'Mon', '1BHK': 140, '2BHK': 100, 'Parking': 20 },
    { day: 'Tue', '1BHK': 160, '2BHK': 100, 'Parking': 20 },
    { day: 'Wed', '1BHK': 100, '2BHK': 100, 'Parking': 20 },
    { day: 'Thurs', '1BHK': 120, '2BHK': 100, 'Parking': 20 },
    { day: 'Fri', '1BHK': 240, '2BHK': 100, 'Parking': 20 },
    { day: 'Sat', '1BHK': 80, '2BHK': 60, 'Parking': 20 },
    { day: 'Sun', '1BHK': 140, '2BHK': 100, 'Parking': 20 },
  ];

  // Sales Data (Units) - Monthly
  const monthlySalesData: ChartData[] = [
    { day: 'Jan', '1BHK': 150, '2BHK': 100, 'Parking': 20 },
    { day: 'Feb', '1BHK': 180, '2BHK': 120, 'Parking': 25 },
    { day: 'Mar', '1BHK': 200, '2BHK': 150, 'Parking': 30 },
    { day: 'Apr', '1BHK': 160, '2BHK': 110, 'Parking': 22 },
    { day: 'May', '1BHK': 220, '2BHK': 180, 'Parking': 35 },
    { day: 'Jun', '1BHK': 190, '2BHK': 140, 'Parking': 28 },
    { day: 'Jul', '1BHK': 130, '2BHK': 90, 'Parking': 18 },
    { day: 'Aug', '1BHK': 170, '2BHK': 130, 'Parking': 25 },
    { day: 'Sep', '1BHK': 210, '2BHK': 160, 'Parking': 32 },
  ];

  // Sales Data (Units) - Quarterly
  const quarterlySalesData: ChartData[] = [
    { day: 'Q1', '1BHK': 150, '2BHK': 100, 'Parking': 20 },
    { day: 'Q2', '1BHK': 160, '2BHK': 110, 'Parking': 22 },
    { day: 'Q3', '1BHK': 130, '2BHK': 90, 'Parking': 18 },
    { day: 'Q4', '1BHK': 100, '2BHK': 80, 'Parking': 15 },
  ];

  // Sales Data (Units) - Annually
  const annuallySalesData: ChartData[] = [
    { day: '2022', '1BHK': 1500, '2BHK': 1100, 'Parking': 200 },
    { day: '2023', '1BHK': 1600, '2BHK': 1200, 'Parking': 220 },
    { day: '2024', '1BHK': 1000, '2BHK': 800, 'Parking': 150 },
    { day: '2025', '1BHK': 1200, '2BHK': 900, 'Parking': 180 },
  ];

  // Revenue Data (₹) - Weekly
  const weeklyRevenueData: ChartData[] = [
    { day: 'Mon', '1BHK': 220000, '2BHK': 350000, 'Parking': 10000 },
    { day: 'Tue', '1BHK': 250000, '2BHK': 380000, 'Parking': 10000 },
    { day: 'Wed', '1BHK': 180000, '2BHK': 280000, 'Parking': 10000 },
    { day: 'Thurs', '1BHK': 230000, '2BHK': 330000, 'Parking': 10000 },
    { day: 'Fri', '1BHK': 300000, '2BHK': 420000, 'Parking': 10000 },
    { day: 'Sat', '1BHK': 160000, '2BHK': 240000, 'Parking': 10000 },
    { day: 'Sun', '1BHK': 280000, '2BHK': 380000, 'Parking': 10000 },
  ];

  // Revenue Data (₹) - Monthly
  const monthlyRevenueData: ChartData[] = [
    { day: 'Jan', '1BHK': 2200000, '2BHK': 3500000, 'Parking': 100000 },
    { day: 'Feb', '1BHK': 2500000, '2BHK': 3800000, 'Parking': 120000 },
    { day: 'Mar', '1BHK': 2800000, '2BHK': 4200000, 'Parking': 150000 },
    { day: 'Apr', '1BHK': 2400000, '2BHK': 3600000, 'Parking': 110000 },
    { day: 'May', '1BHK': 3200000, '2BHK': 4800000, 'Parking': 180000 },
    { day: 'Jun', '1BHK': 2600000, '2BHK': 3900000, 'Parking': 140000 },
    { day: 'Jul', '1BHK': 1800000, '2BHK': 2700000, 'Parking': 90000 },
    { day: 'Aug', '1BHK': 2400000, '2BHK': 3600000, 'Parking': 120000 },
    { day: 'Sep', '1BHK': 3000000, '2BHK': 4500000, 'Parking': 160000 },
  ];

  // Revenue Data (₹) - Quarterly
  const quarterlyRevenueData: ChartData[] = [
    { day: 'Q1', '1BHK': 7500000, '2BHK': 11500000, 'Parking': 370000 },
    { day: 'Q2', '1BHK': 8200000, '2BHK': 12300000, 'Parking': 430000 },
    { day: 'Q3', '1BHK': 7200000, '2BHK': 10800000, 'Parking': 370000 },
    { day: 'Q4', '1BHK': 6800000, '2BHK': 10200000, 'Parking': 350000 },
  ];

  // Revenue Data (₹) - Annually
  const annuallyRevenueData: ChartData[] = [
    { day: '2022', '1BHK': 22000000, '2BHK': 35000000, 'Parking': 1000000 },
    { day: '2023', '1BHK': 24000000, '2BHK': 38000000, 'Parking': 1200000 },
    { day: '2024', '1BHK': 18000000, '2BHK': 28000000, 'Parking': 900000 },
    { day: '2022', '1BHK': 20000000, '2BHK': 32000000, 'Parking': 1100000 },
  ];

  // Daily data for each month (Sales)
  const monthlyDailySalesData: { [key: string]: ChartData[] } = {
    'Jan': [
      { day: '01', '1BHK': 120, '2BHK': 80, 'Parking': 15 },
      { day: '02', '1BHK': 140, '2BHK': 90, 'Parking': 18 },
      { day: '03', '1BHK': 110, '2BHK': 75, 'Parking': 12 },
      { day: '04', '1BHK': 160, '2BHK': 100, 'Parking': 20 },
      { day: '05', '1BHK': 130, '2BHK': 85, 'Parking': 16 },
      { day: '06', '1BHK': 150, '2BHK': 95, 'Parking': 19 },
      { day: '07', '1BHK': 125, '2BHK': 82, 'Parking': 14 },
      { day: '08', '1BHK': 145, '2BHK': 88, 'Parking': 17 },
      { day: '09', '1BHK': 135, '2BHK': 92, 'Parking': 15 },
      { day: '10', '1BHK': 155, '2BHK': 98, 'Parking': 21 },
      { day: '11', '1BHK': 120, '2BHK': 78, 'Parking': 13 },
      { day: '12', '1BHK': 140, '2BHK': 88, 'Parking': 18 },
      { day: '13', '1BHK': 130, '2BHK': 85, 'Parking': 16 },
      { day: '14', '1BHK': 150, '2BHK': 95, 'Parking': 20 },
      { day: '15', '1BHK': 125, '2BHK': 80, 'Parking': 14 },
    ],
    'Feb': [
      { day: '01', '1BHK': 110, '2BHK': 75, 'Parking': 12 },
      { day: '02', '1BHK': 130, '2BHK': 85, 'Parking': 16 },
      { day: '03', '1BHK': 120, '2BHK': 80, 'Parking': 14 },
      { day: '04', '1BHK': 140, '2BHK': 90, 'Parking': 18 },
      { day: '05', '1BHK': 125, '2BHK': 82, 'Parking': 15 },
      { day: '06', '1BHK': 135, '2BHK': 88, 'Parking': 17 },
      { day: '07', '1BHK': 115, '2BHK': 78, 'Parking': 13 },
      { day: '08', '1BHK': 145, '2BHK': 95, 'Parking': 19 },
      { day: '09', '1BHK': 130, '2BHK': 85, 'Parking': 16 },
      { day: '10', '1BHK': 150, '2BHK': 98, 'Parking': 20 },
      { day: '11', '1BHK': 120, '2BHK': 80, 'Parking': 14 },
      { day: '12', '1BHK': 140, '2BHK': 90, 'Parking': 18 },
      { day: '13', '1BHK': 125, '2BHK': 82, 'Parking': 15 },
      { day: '14', '1BHK': 135, '2BHK': 88, 'Parking': 17 },
      { day: '15', '1BHK': 115, '2BHK': 78, 'Parking': 13 },
    ],
    // Add more months as needed
  };

  // Daily data for each month (Revenue)
  const monthlyDailyRevenueData: { [key: string]: ChartData[] } = {
    'Jan': [
      { day: '01', '1BHK': 180000, '2BHK': 280000, 'Parking': 8000 },
      { day: '02', '1BHK': 210000, '2BHK': 320000, 'Parking': 9000 },
      { day: '03', '1BHK': 170000, '2BHK': 260000, 'Parking': 7000 },
      { day: '04', '1BHK': 240000, '2BHK': 360000, 'Parking': 10000 },
      { day: '05', '1BHK': 200000, '2BHK': 300000, 'Parking': 8500 },
      { day: '06', '1BHK': 230000, '2BHK': 340000, 'Parking': 9500 },
      { day: '07', '1BHK': 190000, '2BHK': 290000, 'Parking': 7500 },
      { day: '08', '1BHK': 220000, '2BHK': 330000, 'Parking': 9000 },
      { day: '09', '1BHK': 205000, '2BHK': 310000, 'Parking': 8200 },
      { day: '10', '1BHK': 235000, '2BHK': 350000, 'Parking': 9800 },
      { day: '11', '1BHK': 185000, '2BHK': 280000, 'Parking': 7800 },
      { day: '12', '1BHK': 215000, '2BHK': 320000, 'Parking': 8800 },
      { day: '13', '1BHK': 200000, '2BHK': 300000, 'Parking': 8500 },
      { day: '14', '1BHK': 230000, '2BHK': 340000, 'Parking': 9500 },
      { day: '15', '1BHK': 195000, '2BHK': 290000, 'Parking': 8000 },
    ],
    'Feb': [
      { day: '01', '1BHK': 170000, '2BHK': 260000, 'Parking': 7000 },
      { day: '02', '1BHK': 200000, '2BHK': 300000, 'Parking': 8500 },
      { day: '03', '1BHK': 185000, '2BHK': 280000, 'Parking': 7800 },
      { day: '04', '1BHK': 215000, '2BHK': 320000, 'Parking': 9000 },
      { day: '05', '1BHK': 195000, '2BHK': 290000, 'Parking': 8000 },
      { day: '06', '1BHK': 205000, '2BHK': 310000, 'Parking': 8500 },
      { day: '07', '1BHK': 175000, '2BHK': 270000, 'Parking': 7500 },
      { day: '08', '1BHK': 220000, '2BHK': 330000, 'Parking': 9000 },
      { day: '09', '1BHK': 200000, '2BHK': 300000, 'Parking': 8500 },
      { day: '10', '1BHK': 230000, '2BHK': 340000, 'Parking': 9500 },
      { day: '11', '1BHK': 185000, '2BHK': 280000, 'Parking': 7800 },
      { day: '12', '1BHK': 215000, '2BHK': 320000, 'Parking': 8800 },
      { day: '13', '1BHK': 195000, '2BHK': 290000, 'Parking': 8000 },
      { day: '14', '1BHK': 205000, '2BHK': 310000, 'Parking': 8500 },
      { day: '15', '1BHK': 175000, '2BHK': 270000, 'Parking': 7500 },
    ],
    // Add more months as needed
  };

  // Get current data based on active tab and period
  const getCurrentData = () => {
    if (activeTab === 'Sales') {
      switch (activePeriod) {
        case 'Weekly': return weeklySalesData;
        case 'Monthly': return monthlySalesData;
        case 'Quarterly': return quarterlySalesData;
        case 'Annually': return annuallySalesData;
        default: return weeklySalesData;
      }
    } else {
      switch (activePeriod) {
        case 'Weekly': return weeklyRevenueData;
        case 'Monthly': return monthlyRevenueData;
        case 'Quarterly': return quarterlyRevenueData;
        case 'Annually': return annuallyRevenueData;
        default: return weeklyRevenueData;
      }
    }
  };

  const currentData = getCurrentData();
  const maxValue = Math.max(...currentData.map(item => item['1BHK'] + item['2BHK'] + item.Parking));
  const totalUnits = currentData.reduce((sum, item) => sum + item['1BHK'] + item['2BHK'] + item.Parking, 0);
  const totalRevenue = currentData.reduce((sum, item) => sum + item['1BHK'] + item['2BHK'] + item.Parking, 0);

  // Calculate totals for legend
  const total1BHK = currentData.reduce((sum, item) => sum + item['1BHK'], 0);
  const total2BHK = currentData.reduce((sum, item) => sum + item['2BHK'], 0);
  const totalParking = currentData.reduce((sum, item) => sum + item.Parking, 0);

  // Get monthly detail data
  const getMonthlyDetailData = () => {
    if (activeTab === 'Sales') {
      return monthlyDailySalesData[selectedMonth] || monthlyDailySalesData.Jan;
    } else {
      return monthlyDailyRevenueData[selectedMonth] || monthlyDailyRevenueData.Jan;
    }
  };

  const monthlyDetailData = getMonthlyDetailData();
  const monthlyDetailMaxValue = Math.max(...monthlyDetailData.map(item => item['1BHK'] + item['2BHK'] + item.Parking));
  const monthlyDetailTotal = monthlyDetailData.reduce((sum, item) => sum + item['1BHK'] + item['2BHK'] + item.Parking, 0);

  const handleBackPress = () => navigation.goBack();
  const handleNotificationPress = () => {};
  const handleProfilePress = () => {};
  const handleDownloadReport = () => {};

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setShowMonthlyDetail(true);
  };

  const handleCloseMonthlyDetail = () => {
    setShowMonthlyDetail(false);
  };

  const renderBarChart = () => {
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          {currentData.map((item, index) => {
            const height1 = (item['1BHK'] / maxValue) * 120;
            const height2 = (item['2BHK'] / maxValue) * 120;
            const height3 = (item.Parking / maxValue) * 120;
            
            return (
              <View key={index} style={styles.barContainer}>
                <View style={styles.bar}>
                  <View style={[styles.barSegment, styles.barColor1, { height: height1 }]} />
                  <View style={[styles.barSegment, styles.barColor2, { height: height2 }]} />
                  <View style={[styles.barSegment, styles.barColor3, { height: height3 }]} />
                </View>
                <Text style={styles.dayLabel}>{item.day}</Text>
              </View>
            );
          })}
        </View>
        
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <Text key={index} style={styles.yAxisLabel}>
              {activeTab === 'Sales' 
                ? Math.round(maxValue * ratio).toString()
                : activePeriod === 'Annually' 
                  ? `₹${Math.round(maxValue * ratio / 1000000)}M`
                  : `₹${Math.round(maxValue * ratio / 1000)}k`
              }
            </Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showBackButton={true}
          showProfile={true}
          title="Reports"
          onBackPress={handleBackPress}
          onNotificationPress={handleNotificationPress}
          onProfilePress={handleProfilePress}
        />
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Sales' && styles.activeTab]}
              onPress={() => setActiveTab('Sales')}
            >
              <Text style={[styles.tabText, activeTab === 'Sales' && styles.activeTabText]}>
                Sales
              </Text>
              {activeTab === 'Sales' && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Revenue' && styles.activeTab]}
              onPress={() => setActiveTab('Revenue')}
            >
              <Text style={[styles.tabText, activeTab === 'Revenue' && styles.activeTabText]}>
                Revenue
              </Text>
              {activeTab === 'Revenue' && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          </View>

          {/* Time Period Filters */}
          <View style={styles.periodContainer}>
            {(['Weekly', 'Monthly', 'Quarterly', 'Annually'] as const).map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  activePeriod === period && styles.activePeriodButton
                ]}
                onPress={() => setActivePeriod(period)}
              >
                <Text style={[
                  styles.periodText,
                  activePeriod === period && styles.activePeriodText
                ]}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Summary Section */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryLeft}>
              <Text style={styles.summaryTitle}>
                {activeTab === 'Sales' ? 'Units Sold' : 'Revenue'}
              </Text>
              <Text style={styles.summaryValue}>
                {activeTab === 'Sales' 
                  ? totalUnits.toString() 
                  : `₹${Math.round(totalRevenue / 1000000)}M`
                }
              </Text>
              <Text style={styles.summarySubtext}>
                {activeTab === 'Sales' ? 'Total 4000 units' : 'Total revenue'}
              </Text>
            </View>
            
            <View style={styles.summaryRight}>
              <Dropdown
                label="Project"
                placeholder="Project"
                value={selectedProject}
                options={projectOptions}
                onSelect={setSelectedProject}
              />
            </View>
          </View>

          {/* Chart */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>
              {activeTab === 'Sales' ? `${activePeriod} Sales Report` : `${activePeriod} Revenue Report`}
            </Text>
            {renderBarChart()}
            
          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.legendColor1]} />
              <Text style={styles.legendText}>1 BHK: {total1BHK}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.legendColor2]} />
              <Text style={styles.legendText}>2 BHK: {total2BHK}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.legendColor3]} />
              <Text style={styles.legendText}>Parking Space: {totalParking}</Text>
            </View>
          </View>
          </View>
          {/* Download Button */}
          <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadReport}>
            <Icon name="download" size={24} color="#FFFFFF" />
            <Text style={styles.downloadText}>Download Report</Text>
          </TouchableOpacity>

          {/* Month Selector - Only show when Monthly period is selected */}
          {activePeriod === 'Monthly' && (
            <View style={styles.monthSelectorContainer}>
              <Text style={styles.monthSelectorTitle}>Units Sold in {selectedMonth}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.monthScrollContainer}
                style={styles.monthScrollView}
              >
                {months.map((month) => (
                  <TouchableOpacity
                    key={month}
                    style={[
                      styles.monthButton,
                      selectedMonth === month && styles.activeMonthButton
                    ]}
                    onPress={() => handleMonthSelect(month)}
                  >
                    <Text style={[
                      styles.monthButtonText,
                      selectedMonth === month && styles.activeMonthButtonText
                    ]}>
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Monthly Detail Chart - Show when month is selected */}
          {showMonthlyDetail && (
            <View style={styles.monthlyDetailSection}>
              <View style={styles.monthlyDetailHeader}>
                <View style={styles.monthlyDetailLeft}>
                  <Text style={styles.monthlyDetailTitle}>Units Sold in {selectedMonth}</Text>
                  <Text style={styles.monthlyDetailValue}>{monthlyDetailTotal}</Text>
                  <Text style={styles.monthlyDetailSubtext}>Total 4000 units</Text>
                </View>
                <View style={styles.monthlyDetailRight}>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={handleCloseMonthlyDetail}
                  >
                    <Icon name="close" size={20} color="#6B7280" />
                  </TouchableOpacity>
                  <Dropdown
                    label="Project"
                    placeholder="Project"
                    value={selectedProject}
                    options={projectOptions}
                    onSelect={setSelectedProject}
                  />
                </View>
              </View>

              <View style={styles.monthlyDetailChart}>
                <View style={styles.monthlyDetailChartContainer}>
                  <View style={styles.monthlyDetailChartBars}>
                    {monthlyDetailData.map((item, index) => {
                      const height1 = (item['1BHK'] / monthlyDetailMaxValue) * 120;
                      const height2 = (item['2BHK'] / monthlyDetailMaxValue) * 120;
                      const height3 = (item.Parking / monthlyDetailMaxValue) * 120;
                      
                      return (
                        <View key={index} style={styles.monthlyDetailBarContainer}>
                          <View style={styles.monthlyDetailBar}>
                            <View style={[styles.monthlyDetailBarSegment, styles.barColor1, { height: height1 }]} />
                            <View style={[styles.monthlyDetailBarSegment, styles.barColor2, { height: height2 }]} />
                            <View style={[styles.monthlyDetailBarSegment, styles.barColor3, { height: height3 }]} />
                          </View>
                          <Text style={styles.monthlyDetailDayLabel}>{item.day}</Text>
                        </View>
                      );
                    })}
                  </View>
                  
                  {/* Y-axis labels for monthly detail */}
                  <View style={styles.monthlyDetailYAxis}>
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
                      <Text key={index} style={styles.monthlyDetailYAxisLabel}>
                        {Math.round(monthlyDetailMaxValue * ratio).toString()}
                      </Text>
                    ))}
                  </View>
                </View>

                {/* Monthly Detail Legend */}
                <View style={styles.monthlyDetailLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, styles.legendColor1]} />
                    <Text style={styles.legendText}>1 BHK</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, styles.legendColor2]} />
                    <Text style={styles.legendText}>2 BHK</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, styles.legendColor3]} />
                    <Text style={styles.legendText}>Parking Space</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

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
    paddingHorizontal: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 20,
    position: 'relative',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    // No background color for active tab
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  activeTabText: {
    color: '#1F2937',
    ...getFontStyle('semiBold'),
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
  periodContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activePeriodButton: {
    backgroundColor: '#D5EDFF',
    borderColor: '#3B82F6',
  },
  periodText: {
    fontSize: 14,
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  activePeriodText: {
    color: '#1F2937',
    ...getFontStyle('semiBold'),
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  summaryLeft: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
    ...getFontStyle('medium'),
  },
  summaryValue: {
    fontSize: 32,
    color: '#8B5CF6',
    marginBottom: 4,
    ...getFontStyle('semiBold'),
  },
  summarySubtext: {
    fontSize: 14,
    color: '#000',
    ...getFontStyle('regular'),
  },
  summaryRight: {
    flex: 1,
    marginLeft: 16,
  },
  chartSection: {
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
  chartTitle: {
    fontSize: 18,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
    ...getFontStyle('semiBold'),
  },
  chartContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
    paddingLeft: 40,
    paddingRight: 20,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  bar: {
    width: 20,
    height: '100%',
    justifyContent: 'flex-end',
    marginHorizontal: 2,
  },
  barSegment: {
    width: '100%',
    borderRadius: 2,
  },
  barColor1: { backgroundColor: '#3B82F6' },
  barColor2: { backgroundColor: '#8B5CF6' },
  barColor3: { backgroundColor: '#EC4899' },
  dayLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    ...getFontStyle('regular'),
  },
  yAxis: {
    position: 'absolute',
    left: 10,
    top: 0,
    height: 160,
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    ...getFontStyle('regular'),
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendColor1: { backgroundColor: '#3B82F6' },
  legendColor2: { backgroundColor: '#8B5CF6' },
  legendColor3: { backgroundColor: '#EC4899' },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  downloadButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  downloadText: {
    color: '#FFFFFF',
    fontSize: 16,
    ...getFontStyle('semiBold'),
  },
  bottomSpacing: {
    height: 100,
  },
  // Month Selector Styles
  monthSelectorContainer: {
    padding: 8,
    marginBottom: 20,
  },
  monthSelectorTitle: {
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
    ...getFontStyle('semiBold'),
  },
  monthScrollView: {
    marginBottom: 0,
  },
  monthScrollContainer: {
    gap: 2,
  },
  monthButton: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
  },
  activeMonthButton: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  monthButtonText: {
    fontSize: 14,
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  activeMonthButtonText: {
    color: '#FFFFFF',
    ...getFontStyle('semiBold'),
  },
  // Monthly Detail Styles
  monthlyDetailSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  monthlyDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  monthlyDetailLeft: {
    flex: 1,
  },
  monthlyDetailTitle: {
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
    ...getFontStyle('semiBold'),
  },
  monthlyDetailValue: {
    fontSize: 32,
    color: '#8B5CF6',
    marginBottom: 4,
    ...getFontStyle('semiBold'),
  },
  monthlyDetailSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    ...getFontStyle('regular'),
  },
  monthlyDetailRight: {
    flex: 1,
    marginLeft: 16,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 8,
    marginBottom: 8,
  },
  monthlyDetailChart: {
    marginTop: 20,
  },
  monthlyDetailChartContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 20,
  },
  monthlyDetailChartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
    paddingLeft: 40,
    paddingRight: 20,
  },
  monthlyDetailBarContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  monthlyDetailBar: {
    width: 12,
    height: '100%',
    justifyContent: 'flex-end',
    marginHorizontal: 1,
  },
  monthlyDetailBarSegment: {
    width: '100%',
    borderRadius: 1,
  },
  monthlyDetailDayLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 8,
    ...getFontStyle('regular'),
  },
  monthlyDetailYAxis: {
    position: 'absolute',
    left: 10,
    top: 0,
    height: 160,
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  monthlyDetailYAxisLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    ...getFontStyle('regular'),
  },
  monthlyDetailLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
});

export default SalesReportScreen;
