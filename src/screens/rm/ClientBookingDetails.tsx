import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppGradient, VectorIcon, Navbar} from '../../components';
import {getFontStyle} from '../../utils/fonts';
import DrawerMenu from "../../components/DrawerMenu";
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigation/AppNavigator';

type ClientBookingDetailsNavProp = NativeStackNavigationProp<RootStackParamList>;

type RouteParams = {
  buildingName?: string;
  floor?: number;
  unitNumber?: string;
  status?: 'Available' | 'Sold' | 'Interested' | 'Best Seller' | 'Selected';
  unitType?: string;
  carpetArea?: string;
  builtUpArea?: string;
  facing?: string;
  price?: string;
  phaseTower?: string;
};

const ClientBookingDetails: React.FC = () => {
  const navigation = useNavigation<ClientBookingDetailsNavProp>();
  const route = useRoute<any>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const {
    buildingName = 'Building A',
    floor = 7,
    unitNumber = '702',
    status = 'Available',
    unitType = '1 BHK',
    carpetArea = '645 sq.ft',
    builtUpArea = '890 sq.ft',
    facing = 'East',
    price = '₹62,50,000',
    phaseTower = 'Phase 1 / Tower A',
  } = (route.params || {}) as RouteParams;

  const handleBackPress = () => navigation.goBack();

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
        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.breadcrumb}>
            {buildingName} • Floor {floor} • Unit {unitNumber}
          </Text>



          <View style={styles.card}>
            <Field label="Unit Type" value={unitType} />
            <Field label="Carpet Area" value={carpetArea} />
            <Field label="Built-up Area" value={builtUpArea} />
            <Field label="Facing" value={facing} />
            <Field label="Price" value={price} />
            <Field label="Phase / Tower" value={phaseTower} />
            <Field label="Floor No." value={String(floor)} />
            <Field label="Unit No." value={unitNumber} />
            <Field label="Status" value={status} />
          </View>

          <View style={{height: 24}} />
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

const Field = ({label, value}: {label: string; value: string}) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.readonlyInput}>
      <Text style={styles.inputText}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  gradient: {flex: 1},
  body: {paddingHorizontal: 16, paddingBottom: 16},
  breadcrumb: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#36454F',
    ...getFontStyle('medium'),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  fieldWrap: {marginTop: 12},
  label: {marginBottom: 6, fontSize: 14, color: '#111827', ...getFontStyle('medium')},
  readonlyInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    minHeight: 44,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },

    pageHeader: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 24 },
  backButton: { position: "absolute", left: 0, width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: "#E5E7EB", justifyContent: "center", alignItems: "center" },
  headerSpacer: { width: 36 },
  pageTitle: { fontSize: 20, color: "#0F172A", ...getFontStyle("semiBold") },


  inputText: {fontSize: 14, color: '#6B7280', ...getFontStyle('medium')},
  statusStrip: {
    backgroundColor: '#F0FFDE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  statusStripText: {color: '#69C300', fontSize: 14, ...getFontStyle('semiBold')},
});

export default ClientBookingDetails;
