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
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from 'react-native-elements';
import { Logo } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import type { AuthStackParamList } from '../../navigation/AuthStack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SignUpScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [adminFullName, setAdminFullName] = useState('');
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const handleSignUp = () => {
    // Handle sign up logic here
    console.log('Sign up pressed', { companyName, emailId, mobileNumber, adminFullName });
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign up logic here
    console.log('Google sign up pressed');
  };

  const handleLogIn = () => {
    // Navigate to login screen
    navigation.goBack();
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
          <Text style={styles.title}>Sign Up</Text>

          {/* Company Name Input */}
          <View style={styles.inputContainer}>
            <Input
              label="Company Name"
              placeholder="John doe"
              value={companyName}
              onChangeText={setCompanyName}
              autoCapitalize="words"
              inputContainerStyle={styles.materialInputContainer}
              inputStyle={styles.materialInput}
              labelStyle={styles.materialLabel}
              containerStyle={styles.materialContainer}
            />
          </View>

          {/* Email ID Input */}
          <View style={styles.inputContainer}>
            <Input
              label="Email ID"
              placeholder="Johndoe@example.com"
              value={emailId}
              onChangeText={setEmailId}
              keyboardType="email-address"
              autoCapitalize="none"
              inputContainerStyle={styles.materialInputContainer}
              inputStyle={styles.materialInput}
              labelStyle={styles.materialLabel}
              containerStyle={styles.materialContainer}
            />
          </View>

          {/* Mobile Number Input */}
          <View style={styles.inputContainer}>
            <Input
              label="Mobile Number"
              placeholder="John doe"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              inputContainerStyle={styles.materialInputContainer}
              inputStyle={styles.materialInput}
              labelStyle={styles.materialLabel}
              containerStyle={styles.materialContainer}
            />
          </View>

          {/* Admin Full Name Input */}
          <View style={styles.inputContainer}>
            <Input
              label="Admin Full Name"
              placeholder="Johndoe@example.com"
              value={adminFullName}
              onChangeText={setAdminFullName}
              autoCapitalize="words"
              inputContainerStyle={styles.materialInputContainer}
              inputStyle={styles.materialInput}
              labelStyle={styles.materialLabel}
              containerStyle={styles.materialContainer}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          {/* Google Sign Up Button */}
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
            <Image
              source={require('../../assets/images/google.logo.png')}
              style={styles.googleIcon}
              resizeMode="contain"
            />
            <Text style={styles.googleButtonText}>Login with Google</Text>
          </TouchableOpacity>

          {/* Log In Link */}
          <View style={styles.logInContainer}>
            <Text style={styles.logInText}>Have an account? </Text>
            <TouchableOpacity onPress={handleLogIn}>
              <Text style={styles.logInLink}>Log in</Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 25,
    ...getFontStyle('medium'),
  },
  inputContainer: {
    marginBottom: -16,
  },
  materialContainer: {
    paddingHorizontal: 0,
    marginBottom: 8,
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
  submitButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
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
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    ...getFontStyle('medium'),
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
    ...getFontStyle('semiBold'),
  },
  logInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logInText: {
    fontSize: 14,
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  logInLink: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '500',
    ...getFontStyle('medium'),
  },
});

export default SignUpScreen;
