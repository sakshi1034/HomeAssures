import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AppGradient, Navbar } from '../../components';
import { getFontStyle } from '../../utils/fonts';

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          userName="Prakash"
          title="Profile"
          onNotificationPress={() => {}}
          onProfilePress={() => {}}
          showHamburgerMenu
          role="rm"
        />

        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>Prakash</Text>
            <Text style={styles.role}>Relationship Manager</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Contact Information</Text>
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Email</Text>
              <Text style={styles.cardValue}>prakash@example.com</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Phone</Text>
              <Text style={styles.cardValue}>+91 98765 43210</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quick Actions</Text>
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionLabel}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionLabel}>Share Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    color: '#0F172A',
    ...getFontStyle('semiBold'),
  },
  role: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
    ...getFontStyle('regular'),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    color: '#0F172A',
    marginBottom: 16,
    ...getFontStyle('semiBold'),
  },
  cardRow: {
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
    ...getFontStyle('medium'),
  },
  cardValue: {
    fontSize: 16,
    color: '#0F172A',
    ...getFontStyle('semiBold'),
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 14,
    color: '#4C1D95',
    ...getFontStyle('semiBold'),
  },
});

export default ProfileScreen;


