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
import type { AuthStackParamList } from '../../navigation/AuthStack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NewPasswordScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'NewPassword'>;

const NewPasswordScreen: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation<NewPasswordScreenNavigationProp>();

  const handleConfirm = () => {
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        console.log('Password reset successful');
        // Navigate back to login or show success message
        navigation.navigate('Login');
      } else {
        console.log('Passwords do not match');
      }
    }
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
          <Text style={styles.title}>Create New Password</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Ensure it differs from previous ones for security
          </Text>

          {/* New Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>New Password</Text>
            <Input
              placeholder="Enter your New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              rightIcon={
                <VectorIcon
                  type="MaterialIcons"
                  name={showNewPassword ? 'visibility-off' : 'visibility'}
                  size={22}
                  color="#9CA3AF"
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              }
              inputContainerStyle={styles.materialInputContainer}
              inputStyle={styles.materialInput}
              labelStyle={styles.materialLabel}
              containerStyle={styles.materialContainer}
            />
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm New Password</Text>
            <Input
              placeholder="Re-enter New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              rightIcon={
                <VectorIcon
                  type="MaterialIcons"
                  name={showConfirmPassword ? 'visibility-off' : 'visibility'}
                  size={22}
                  color="#9CA3AF"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
              inputContainerStyle={styles.materialInputContainer}
              inputStyle={styles.materialInput}
              labelStyle={styles.materialLabel}
              containerStyle={styles.materialContainer}
            />
          </View>

          {/* Confirm Button */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
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
    paddingTop: 60,
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
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
    ...getFontStyle('medium'),
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
  confirmButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    ...getFontStyle('medium'),
  },
});

export default NewPasswordScreen;
