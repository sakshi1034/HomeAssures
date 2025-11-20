import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppGradient, VectorIcon, Navbar } from "../../components";
import DrawerMenu from "../../components/DrawerMenu";
import { getFontStyle } from "../../utils/fonts";

export default function BookingsScreen() {
  const navigation = useNavigation<any>();
  const [selectedTab, setSelectedTab] = useState("Sai Nagari");
  const [drawerVisible, setDrawerVisible] = useState(false);

  // NORMALIZED VALUES
  const oneBHK = 53;
  const twoBHK = 73;
  const parking = 73;

  // Bar heights
  const barHeight = 120;
  const phases = ["Phase 1", "Phase 2", "Phase 3", "Phase 4"];

  // Client list
  const clientList = [
    { unit: "Unit 101", size: "800 sq.ft", name: "K. R. Chilwery", color: "#C61AFF" },
    { unit: "Unit 102", size: "650 sq.ft", name: "Rohit Deshmukh", color: "#42ADFE" },
    { unit: "Unit 103", size: "710 sq.ft", name: "Aditya Patil", color: "#833EEF" },
    { unit: "Unit 104", size: "865 sq.ft", name: "Sahil Jadhav", color: "#C61AFF" },
    { unit: "Unit 105", size: "1025 sq.ft", name: "Nikhil Wagh", color: "#42ADFE" },
    { unit: "Unit 106", size: "1180 sq.ft", name: "Vikram Pawar", color: "#C61AFF" },
    { unit: "Unit 107", size: "800 Sqft", name: "Ayshi Gokhale", color: "#42ADFE" },
    { unit: "Unit 108", size: "1180 sq.ft", name: "Riya Mehta", color: "#C61AFF" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        {/* Navbar */}
        <Navbar
          userName="Prakash"
          role="rm"
          showHamburgerMenu
          onHamburgerPress={() => setDrawerVisible(true)}
          onProfilePress={() => {}}
        />

        {/* HEADER */}
        <View style={styles.pageHeader}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <VectorIcon type="MaterialIcons" name="arrow-back-ios" size={20} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Bookings</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* CONTENT */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* TARGET CARD */}
          <View style={styles.targetCard}>
            <Text style={styles.greatWork}>Great work!, 👋</Text>
            <Text style={styles.cardName}>Sakshi</Text>

            <View style={styles.progressWrapper}>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: "50%" }]} />
              </View>
            </View>

            <Text style={styles.targetText}>
              You're already at <Text style={styles.bold}>50%</Text> of your monthly target.
            </Text>
          </View>

          {/* SECTION TITLE */}
          <Text style={styles.sectionTitle}>Project Performance</Text>

          {/* TABS */}
          <View style={styles.tabsRow}>
            {["Sai Nagari", "Sai Dwarka", "Project 3"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                style={[styles.tab, selectedTab === tab && styles.activeTab]}
              >
                <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* PERFORMANCE CARD */}
          <View style={styles.performanceCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.empName}>Sakshi Chavan</Text>
              <Text style={styles.projectTag}>Sai Nagari</Text>
            </View>

            <Text style={styles.progressLabel}>Progress</Text>

            <View style={styles.cardProgressBg}>
              <View style={[styles.cardProgressFill, { width: "50%" }]} />
            </View>

            <Text style={styles.achievedLabel}>50% Achieved</Text>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Target: 440 Units</Text>
              <Text style={styles.footerText}>Achieved: 320 Units</Text>
            </View>
          </View>

          {/* UNITS SOLD GRAPH */}
          <View style={styles.unitsCard}>
            <View style={styles.unitsHeaderRow}>
              <View>
                <Text style={styles.unitsSoldLabel}>Units Sold</Text>
                <Text style={styles.unitsSoldValue}>1700</Text>
                <Text style={styles.unitsTotalText}>Total 4000 units</Text>
              </View>

              <TouchableOpacity style={styles.projectDropdown}>
                <Text style={styles.projectText}>Sai Nagari</Text>
                <VectorIcon type="MaterialIcons" name="keyboard-arrow-down" size={22} />
              </TouchableOpacity>
            </View>

            {/* GRAPH */}
            <View style={styles.graphWrapper}>
              <View style={styles.yAxis}>
                {[400, 300, 200, 100, 0].map((num, idx) => (
                  <Text key={idx} style={styles.yAxisText}>{num}</Text>
                ))}
              </View>

              <View style={styles.graphArea}>
                <View style={styles.gridLines}>
                  {[400, 300, 200, 100, 0].map((_, i) => (
                    <View key={i} style={styles.gridLine} />
                  ))}
                </View>

                <View style={styles.barsRow}>
                  {phases.map((phase, idx) => (
                    <View key={idx} style={styles.singleBarItem}>
                      <View style={styles.barContainer}>
                        <View style={styles.singleBar}>
                          <View style={[styles.barSegment, { backgroundColor: "#42ADFE", height: oneBHK }]} />
                          <View style={[styles.barSegment, { backgroundColor: "#833EEF", height: twoBHK }]} />
                          <View style={[styles.barSegment, { backgroundColor: "#C61AFF", height: parking }]} />
                        </View>
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.xAxisLine} />
                <View style={styles.phaseLabelsRow}>
                  {phases.map((phase, idx) => (
                    <Text key={idx} style={styles.xAxisLabel}>{phase}</Text>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <Text style={styles.legendValueBlue}>150</Text>
                <Text style={styles.legendLabel}>1 BHK</Text>
              </View>

              <View style={styles.legendItem}>
                <Text style={styles.legendValuePurple}>210</Text>
                <Text style={styles.legendLabel}>2 BHK</Text>
              </View>

              <View style={styles.legendItem}>
                <Text style={styles.legendValuePink}>210</Text>
                <Text style={styles.legendLabel}>Parking Space</Text>
              </View>
            </View>
          </View>

          {/* PHASE 1 CLIENT LIST */}
          <View style={styles.clientCard}>
            <View style={styles.clientHeaderRow}>
              <Text style={styles.clientHeaderText}>Phase 1 Client list</Text>
              <VectorIcon
                type="MaterialIcons"
                name="keyboard-arrow-down"
                size={24}
                color="#000"
              />
            </View>

            <View style={styles.clientTableHeader}>
              <Text style={styles.clientTableHeadText}>Unit No.</Text>
              <Text style={styles.clientTableHeadText}>Unit Size</Text>
              <Text style={styles.clientTableHeadText}>Client Name</Text>
              <Text style={styles.clientTableHeadText}></Text>
            </View>

            {/* NAVIGATE TO ClientBookingDetails */}
            {clientList.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.clientRow}
                onPress={() =>
                  navigation.navigate('ClientBookingDetails', {
                    buildingName: 'Building A',
                    floor: 7,
                    unitNumber: item.unit.replace('Unit ', ''),
                    status: 'Available',
                    unitType: '1 BHK',
                    carpetArea: item.size,
                    builtUpArea: '890 sq.ft',
                    facing: 'East',
                    price: '₹62,50,000',
                    phaseTower: 'Phase 1 / Tower A',
                  })
                }
              >
                <Text style={styles.clientUnit}>{item.unit}</Text>
                <Text style={styles.clientSize}>{item.size}</Text>
                <Text style={styles.clientName}>{item.name}</Text>

                <View style={styles.rowRight}>
                  <View style={[styles.dot, { backgroundColor: item.color }]} />
                  <VectorIcon
                    type="MaterialIcons"
                    name="chevron-right"
                    size={22}
                    color="#C7C7CC"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 80 }} />
        </ScrollView>
      </AppGradient>

      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        userName="Prakash"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  gradient: { flex: 1, paddingHorizontal: 20 },

  pageHeader: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 24 },
  backButton: { position: "absolute", left: 0, width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: "#E5E7EB", justifyContent: "center", alignItems: "center" },
  headerSpacer: { width: 36 },
  pageTitle: { fontSize: 20, color: "#0F172A", ...getFontStyle("semiBold") },

  targetCard: { backgroundColor: "#fff", borderRadius: 14, padding: 18, marginTop: 20, elevation: 5 },
  greatWork: { fontSize: 20, color: '#1F2937', ...getFontStyle('semiBold') },
  cardName: { fontSize: 20, color: '#1F2937', ...getFontStyle('semiBold') },
  progressWrapper: { marginTop: 15 },
  progressBg: { height: 5, backgroundColor: "#E5E7EB", borderRadius: 4 },
  progressFill: { height: 5, backgroundColor: "#6C63FF" },
  targetText: { marginTop: 10, fontSize: 16, color: "#555", ...getFontStyle('regular') },
  bold: { fontWeight: "700" },

  sectionTitle: { marginTop: 25, fontSize: 18, color: '#1F2937', marginBottom: 16, ...getFontStyle('semiBold') },

  tabsRow: { flexDirection: "row", marginTop: 12 },
  tab: { paddingVertical: 8, paddingHorizontal: 14, backgroundColor: "#E8ECF3", borderRadius: 18, marginRight: 10 },
  activeTab: { backgroundColor: "#6C63FF" },
  tabText: { fontSize: 15, fontWeight: "600", color: "#333" },
  activeTabText: { color: "#fff" },

  performanceCard: { backgroundColor: "#fff", borderRadius: 14, padding: 18, marginTop: 15, elevation: 4 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  empName: { fontSize: 20, fontWeight: "600" },
  projectTag: { fontSize: 16, fontWeight: "600", color: "#6C63FF" },
  progressLabel: { marginTop: 12, fontSize: 16, fontWeight: "400" },
  cardProgressBg: { height: 6, backgroundColor: "#E5E7EB", borderRadius: 4, marginTop: 6 },
  cardProgressFill: { height: 6, backgroundColor: "#6C63FF" },
  achievedLabel: { marginTop: 8, fontSize: 14, fontWeight: "600", color: "#6C63FF" },
  footerRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  footerText: { fontSize: 16, opacity: 0.7, fontWeight: "600" },

  unitsCard: { backgroundColor: "#FFF", borderRadius: 14, padding: 16, marginTop: 20, borderWidth: 1, borderColor: "#EAEAEA" },
  unitsHeaderRow: { flexDirection: "row", justifyContent: "space-between" },
  unitsSoldLabel: { fontSize: 14, color: "#6B7280" },
  unitsSoldValue: { fontSize: 32, fontWeight: "700", color: "#833EEF" },
  unitsTotalText: { fontSize: 12, color: "#A8A8A8" },
  projectDropdown: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: "#D5D5D5", borderRadius: 6 },
  projectText: { fontSize: 14, fontWeight: "600", marginRight: 4 },

  graphWrapper: { flexDirection: "row", marginTop: 40 },
  yAxis: { width: 40, height: 200, justifyContent: "space-between" },
  yAxisText: { fontSize: 12, color: "#8E8E8E", textAlign: "left" },
  graphArea: { flex: 1, height: 200 },
  gridLines: { position: "absolute", height: "100%", width: "100%", justifyContent: "space-between" },
  gridLine: { height: 1, backgroundColor: "#EEE", width: "80%", alignSelf: "center" },

  barsRow: { flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end", paddingHorizontal: 10, gap: 12 },
  singleBarItem: { alignItems: "center" },
  barContainer: { justifyContent: "flex-end", height: 180 },
  singleBar: { width: 12, flexDirection: "column-reverse", borderRadius: 6, overflow: "hidden" },
  barSegment: { width: "100%" },
  xAxisLine: { height: 1, backgroundColor: "#000", width: "100%", marginTop: 2 },
  phaseLabelsRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 4 },
  xAxisLabel: { fontSize: 12, color: "#555", textAlign: "center" },

  legendRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 22 },
  legendItem: { alignItems: "center" },
  legendLabel: { fontSize: 12, color: "#6B7280" },
  legendValueBlue: { color: "#42ADFE", fontSize: 19, fontWeight: "700" },
  legendValuePurple: { color: "#833EEF", fontSize: 19, fontWeight: "700" },
  legendValuePink: { color: "#C61AFF", fontSize: 19, fontWeight: "700" },

  clientCard: { backgroundColor: "#FFF", borderRadius: 14, padding: 16, marginTop: 25, borderWidth: 1, borderColor: "#EAEAEA" },
  clientHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  clientHeaderText: { fontSize: 21, fontWeight: "700", color: "#000" },
  clientTableHeader: { flexDirection: "row", justifyContent: "space-between", paddingBottom: 10, borderBottomWidth: 1, borderColor: "#E8E8E8", marginBottom: 10 },
  clientTableHeadText: { width: "25%", fontSize: 14, fontWeight: "600", color: "#777", ...getFontStyle('medium') },
  clientRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, borderBottomWidth: 1, borderColor: "#EFEFEF", alignItems: "center" },
  clientUnit: { width: "25%", fontSize: 14, fontWeight: "600", color: "#344054" },
  clientSize: { width: "25%", fontSize: 14, fontWeight: "600", color: "#344054" },
  clientName: { width: "35%", fontSize: 14, fontWeight: "600", color: "#344054" },
  rowRight: { flexDirection: "row", alignItems: "center", width: "15%", justifyContent: "flex-end" },
  dot: { width: 10, height: 10, borderRadius: 50, marginRight: 10 },
});
