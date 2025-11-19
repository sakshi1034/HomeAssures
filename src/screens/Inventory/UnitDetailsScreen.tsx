import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppGradient, Navbar } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';

type UnitDetailsNavProp = NativeStackNavigationProp<RootStackParamList, 'UnitDetails'>;

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

const UnitDetailsScreen: React.FC = () => {
  const navigation = useNavigation<UnitDetailsNavProp>();
  const route = useRoute<any>();

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

  // segment
  const [proceed, setProceed] = useState<'hold' | 'book'>('hold');

  // Hold Terms state
  const [holdDuration, setHoldDuration] = useState('Default 3 days');
  const [bookingAmount, setBookingAmount] = useState('₹50,000');
  const [deadline, setDeadline] = useState('Valid till 3rd day of Holding');
  const [paymentMode, setPaymentMode] = useState<string>('');
  const [showModeList, setShowModeList] = useState(false);
  const [autoReleaseAck, setAutoReleaseAck] = useState(false);
  const [bookingAgreeAck, setBookingAgreeAck] = useState(false);
  const paymentOptions = ['UPI', 'Card', 'Net Banking', 'Cheque', 'Cash'];

  // Booking (client) + payment details
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [pan, setPan] = useState('');
  const [coApplicant, setCoApplicant] = useState('');

  const [bookAmount, setBookAmount] = useState('₹50,000');
  const [bookPayMode, setBookPayMode] = useState('');
  const [showBookModeList, setShowBookModeList] = useState(false);
  const [paymentRef, setPaymentRef] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [uploadName, setUploadName] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showBackButton
          showProfile
          title="Unit Details"
          onBackPress={handleBackPress}
          onNotificationPress={() => {}}
          onProfilePress={() => {}}
        />

        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <Text style={styles.breadcrumb}>
            {buildingName} • Floor {floor} • Unit {unitNumber}
          </Text>

          {/* <View style={styles.greenStrip} />// */}

<View style={styles.statusStrip}>
  <Text style={styles.statusStripText}>{status}</Text>
</View>


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

            <Text style={styles.proceedTitle}>How would you like to proceed?</Text>

            {/* SEGMENTED CONTROL (fixed text color issue) */}
            <View style={styles.segmentWrap}>
              <TouchableOpacity
                onPress={() => setProceed('hold')}
                activeOpacity={0.85}
                style={[
                  styles.segmentBtn,
                  proceed === 'hold' ? styles.segmentBtnActive : styles.segmentBtnInactive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    proceed === 'hold' ? styles.segmentTextActive : styles.segmentTextInactive,
                  ]}
                >
                  Hold for 7 Days
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setProceed('book')}
                activeOpacity={0.85}
                style={[
                  styles.segmentBtn,
                  proceed === 'book' ? styles.segmentBtnActive : styles.segmentBtnInactive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    proceed === 'book' ? styles.segmentTextActive : styles.segmentTextInactive,
                  ]}
                >
                  Book this Unit
                </Text>
              </TouchableOpacity>
            </View>

            {proceed === 'hold' ? (
              <>
                <Text style={styles.sectionHeading}>Client Details</Text>
                <LabeledInput label="Full Name (As per PAN)" placeholder="Enter Full Name" value={fullName} onChangeText={setFullName} />
                <LabeledInput label="Mobile Number (WhatsApp-enabled)" placeholder="Enter Mobile Number" keyboardType="phone-pad" value={mobile} onChangeText={setMobile} />
                <LabeledInput label="Email ID" placeholder="Enter Email ID" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
                <LabeledInput label="PAN / Aadhaar (last 4 digits)" placeholder="XXXX" keyboardType="number-pad" maxLength={4} value={aadhaar} onChangeText={setAadhaar} />

                <Text style={[styles.sectionHeading, { marginTop: 12 }]}>Hold Terms</Text>
                <LabeledInput label="Hold Duration" placeholder="Default 3 days" value={holdDuration} onChangeText={setHoldDuration} />
                <LabeledInput label="Booking Amount" placeholder="₹50,000" value={bookingAmount} onChangeText={setBookingAmount} keyboardType="numeric" />
                <LabeledInput label="Payment Deadline" placeholder="Valid till 3rd day of Holding" value={deadline} onChangeText={setDeadline} />

                <View style={styles.fieldWrap}>
                  <Text style={styles.label}>Payment Mode</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.textInput, styles.dropdownInput]}
                    onPress={() => setShowModeList((s) => !s)}
                  >
                    <Text style={[styles.inputText, { color: paymentMode ? '#111827' : '#9CA3AF' }]}>
                      {paymentMode || 'Select Payment mode'}
                    </Text>
                    <Icon name={showModeList ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={20} color="#6B7280" />
                  </TouchableOpacity>
                  {showModeList && (
                    <View style={styles.dropdownList}>
                      {paymentOptions.map((opt) => (
                        <TouchableOpacity key={opt} style={styles.dropdownItem} onPress={() => { setPaymentMode(opt); setShowModeList(false); }}>
                          <Text style={styles.dropdownItemText}>{opt}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <CheckRow checked={autoReleaseAck} onToggle={() => setAutoReleaseAck(v => !v)} label="Client informed of auto-release after hold period." />
                <CheckRow checked={bookingAgreeAck} onToggle={() => setBookingAgreeAck(v => !v)} label="Client agreed to pay booking amount within validity." />

                <TouchableOpacity activeOpacity={0.9} style={{ marginTop: 12 }}>
                  <LinearGradient colors={['#42ADFE', '#7445FF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGradient}>
                    <Text style={styles.ctaText}>Mark as Hold</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.85} style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* BOOK THIS UNIT */}
                <Text style={styles.sectionHeading}>Client Details</Text>
                <LabeledInput label="Full Name (As per PAN)" placeholder="Enter Full Name" value={fullName} onChangeText={setFullName} />
                <LabeledInput label="Mobile Number (WhatsApp-enabled)" placeholder="Enter Mobile Number" keyboardType="phone-pad" value={mobile} onChangeText={setMobile} />
                <LabeledInput label="Email ID" placeholder="Enter Email ID" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
                <LabeledInput label="Aadhaar  Card Number" placeholder="XXXXXXXXXXXX" keyboardType="number-pad" value={aadhaar} onChangeText={setAadhaar} />
                <LabeledInput label="PAN Card Number" placeholder="XXXXXXXXXX" autoCapitalize="characters" value={pan} onChangeText={setPan} />
                <LabeledInput label="Co-Applicant Name (If any)" placeholder="Enter Co-applicant’s name" value={coApplicant} onChangeText={setCoApplicant} />

                {/* Payment Details */}
                <Text style={styles.sectionHeading}>Payment Details</Text>
                <LabeledInput label="Booking Amount" placeholder="₹50,000" value={bookAmount} onChangeText={setBookAmount} keyboardType="numeric" />

                <View style={styles.fieldWrap}>
                  <Text style={styles.label}>Payment Mode</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.textInput, styles.dropdownInput]}
                    onPress={() => setShowBookModeList(s => !s)}
                  >
                    <Text style={[styles.inputText, { color: bookPayMode ? '#111827' : '#9CA3AF' }]}>
                      {bookPayMode || 'Select Payment mode'}
                    </Text>
                    <Icon name={showBookModeList ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={20} color="#6B7280" />
                  </TouchableOpacity>
                  {showBookModeList && (
                    <View style={styles.dropdownList}>
                      {paymentOptions.map((opt) => (
                        <TouchableOpacity key={opt} style={styles.dropdownItem} onPress={() => { setBookPayMode(opt); setShowBookModeList(false); }}>
                          <Text style={styles.dropdownItemText}>{opt}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <LabeledInput label="Payment Reference No. (Required for UPI/NEFT)" placeholder="XXXX" value={paymentRef} onChangeText={setPaymentRef} />
                <LabeledInput label="Payment Date" placeholder="DD/MM/YYYY" value={paymentDate} onChangeText={setPaymentDate} />

                <View style={styles.fieldWrap}>
                  <Text style={styles.label}>Upload Payment Proof (Image / PDF allowed)</Text>
                  <View style={[styles.textInput, styles.uploadInput]}>
                    <Text style={[styles.inputText, { color: uploadName ? '#111827' : '#9CA3AF' }]}>
                      {uploadName || 'Select file'}
                    </Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setUploadName('payment_proof.pdf')} style={styles.uploadIconBtn}>
                      <Icon name="file-upload" size={20} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity activeOpacity={0.9} style={{ marginTop: 12 }}>
                  <LinearGradient colors={['#42ADFE', '#7445FF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGradient}>
                    <Text style={styles.ctaText}>Confirm Booking</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.85} style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <View style={{ height: 28 }} />
        </ScrollView>
      </AppGradient>
    </SafeAreaView>
  );
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.readonlyInput}>
      <Text style={styles.inputText}>{value}</Text>
    </View>
  </View>
);

const LabeledInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize,
  maxLength,
}: {
  label: string;
  placeholder: string;
  value?: string;
  onChangeText?: (t: string) => void;
  keyboardType?: 'default' | 'email-address' | 'number-pad' | 'phone-pad' | 'numeric';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
}) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      keyboardType={keyboardType || 'default'}
      autoCapitalize={autoCapitalize || 'sentences'}
      maxLength={maxLength}
      value={value}
      onChangeText={onChangeText}
      style={styles.textInput}
    />
  </View>
);

const CheckRow = ({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onToggle} style={styles.checkRow}>
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>{checked && <Icon name="check" size={16} color="#fff" />}</View>
    <Text style={styles.checkLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  gradient: { flex: 1 },
  body: { paddingHorizontal: 16, paddingBottom: 16 },

  breadcrumb: { marginTop: 8, textAlign: 'center', fontSize: 16, color: '#36454F', ...getFontStyle('medium') },
  greenStrip: { height: 6, borderRadius: 3, backgroundColor: '#E9FBEF', marginTop: 8, marginBottom: 8 },
  statusPillWrap: { alignItems: 'center', marginBottom: 12 },
  statusPill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999, alignSelf: 'center' },
  availablePill: { backgroundColor: '#E9FBEF', borderWidth: 1, borderColor: '#B7E8C6' },
  availableText: { color: '#0F9D58' },
  statusPillText: { fontSize: 12, ...getFontStyle('semiBold') },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },

  fieldWrap: { marginTop: 12 },
  label: { marginBottom: 6, fontSize: 16, color: 'black', ...getFontStyle('medium') },
  readonlyInput: { borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF', borderRadius: 8, minHeight: 44, paddingHorizontal: 12, justifyContent: 'center' },
  inputText: { fontSize: 14, color: '#6B7280', ...getFontStyle('medium') },

  proceedTitle: { textAlign: 'center', marginTop: 16, marginBottom: 10, fontSize: 14, color: '#6B7280', ...getFontStyle('semiBold') },

  /* NEW segmented control styles */
  segmentWrap: { flexDirection: 'row', alignSelf: 'center', gap: 10, marginBottom: 12 },
  segmentBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
  },
  segmentBtnActive: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
  segmentBtnInactive: { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' },
  segmentText: { fontSize: 13, ...getFontStyle('semiBold') },
  segmentTextActive: { color: '#FFFFFF' },
  segmentTextInactive: { color: '#111827' },

  textInput: { borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF', borderRadius: 8, minHeight: 44, paddingHorizontal: 12, color: '#111827', ...getFontStyle('medium') },
  sectionHeading: { marginTop: 6, marginBottom: 6, textAlign: 'center', fontSize: 14, color: '#111827', ...getFontStyle('semiBold') },

  dropdownInput: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dropdownList: { marginTop: 6, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF', overflow: 'hidden' },
  dropdownItem: { paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  dropdownItemText: { fontSize: 14, color: '#111827', ...getFontStyle('medium') },

  checkRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 10 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1, borderColor: '#D1D5DB', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  checkboxChecked: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
  checkLabel: { flex: 1, fontSize: 13, color: '#111827', ...getFontStyle('medium') },

  uploadInput: { flexDirection: 'row', alignItems: 'center', paddingRight: 8 },
  uploadIconBtn: { padding: 6 },

  secondaryBtn: { height: 46, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10, borderWidth: 1.5, borderColor: '#C7B7FF', backgroundColor: '#FFFFFF' },
  secondaryBtnText: { color: '#7C3AED', fontSize: 14, ...getFontStyle('semiBold') },
  ctaGradient: { height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  ctaText: { color: '#FFFFFF', fontSize: 15, ...getFontStyle('semiBold') },
  statusStrip: {
  backgroundColor: '#F0FFDE',   // soft green band
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 0,            // height similar to screenshot
 
  marginBottom: 12,              // space below the strip
},
statusStripText: {
  color: '#69C300',            // green text like the image
  fontSize: 14,
  ...getFontStyle('semiBold'),
},

});

export default UnitDetailsScreen;
