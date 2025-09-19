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
import { Logo, VectorIcon } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login pressed', { email, password });
    // Static login - directly navigate to home screen
    navigation.navigate('Home');
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Google login pressed');
  };

  const handleSignUp = () => {
    // Navigate to sign up screen
    navigation.navigate('SignUp');
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    navigation.navigate('ForgotPassword');
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
          <Text style={styles.title}>Log in</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Input
              label="Email / Mobile Number"
              placeholder="Johndoe@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              inputContainerStyle={styles.materialInputContainer}
              inputStyle={styles.materialInput}
              labelStyle={styles.materialLabel}
              containerStyle={styles.materialContainer}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Input
              label="Password"
              placeholder=""
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
                rightIcon={
                  <VectorIcon
                    type="MaterialIcons"
                    name={showPassword ? 'visibility-off' : 'visibility'}
                    size={22}
                    color="#9CA3AF"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              inputContainerStyle={styles.materialInputContainer}
              inputStyle={styles.materialInput}
              labelStyle={styles.materialLabel}
              containerStyle={styles.materialContainer}
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          {/* Google Login Button */}
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <Image
              source={require('../../assets/images/google.logo.png')}
              style={styles.googleIcon}
              resizeMode="contain"
            />
            <Text style={styles.googleButtonText}>Login with Google</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpLink}>Sign Up</Text>
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
    marginBottom: 40,
    ...getFontStyle('semiBold'),
  },
  inputContainer: {
    marginBottom: -16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
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
    paddingVertical: 4,
    ...getFontStyle('regular'),
  },
  materialLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
    ...getFontStyle('medium'),
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  submitButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
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
    ...getFontStyle('medium'),
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    color: '#374151',
    fontSize: 16,
    ...getFontStyle('semiBold'),
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#6B7280',
    ...getFontStyle('medium'),
  },
  signUpLink: {
    fontSize: 14,
    color: '#6366F1',
    ...getFontStyle('semiBold'),
  },
});

export default LoginScreen;
