import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from 'react-native-elements';
import { Logo, VectorIcon } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const handleResetPassword = () => {
    // Handle reset password logic here
    console.log('Reset password pressed', { email });
    // Navigate to OTP screen
    navigation.navigate('OTP');
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Logo size={80} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Forgot Password</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>Please enter your email to reset the password</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Input
              label="Email ID"
              placeholder="Johndoe@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              rightIcon={
                <VectorIcon
                  type="MaterialIcons"
                  name="visibility"
                  size={22}
                  color="#9CA3AF"
                />
              }
              inputContainerStyle={styles.materialInputContainer}
              inputStyle={styles.materialInput}
              labelStyle={styles.materialLabel}
              containerStyle={styles.materialContainer}
            />
          </View>

          {/* Reset Password Button */}
          <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
            <Text style={styles.resetButtonText}>Reset Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: -40,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
    ...getFontStyle('semiBold'),
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 20,
    ...getFontStyle('regular'),
  },
  inputContainer: {
    marginBottom: -16,
  },
  materialContainer: {
    paddingHorizontal: 0,
    marginBottom: 6,
  },
  materialInputContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    minHeight: 48,
  },
  materialInput: {
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 8,
    ...getFontStyle('regular'),
  },
  materialLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
    ...getFontStyle('medium'),
  },
  resetButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    ...getFontStyle('medium'),
  },
});

export default ForgotPasswordScreen;
