import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { getFontStyle } from '../utils/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { VectorIcon } from './index';

interface NavbarProps {
  userName?: string;
  showBackButton?: boolean;
  showProfile?: boolean;
  title?: string;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  showEditButton?: boolean;
  onEditPress?: () => void;
  showHamburgerMenu?: boolean;
  onHamburgerPress?: () => void;
  role?: 'admin' | 'rm';
}

const Navbar: React.FC<NavbarProps> = ({
  userName = 'Prakash',
  showBackButton = false,
  showProfile = true,
  title,
  onBackPress,
  onNotificationPress,
  onProfilePress,
  showEditButton = false,
  onEditPress,
  showHamburgerMenu = false,
  onHamburgerPress,
  role,
}) => {
  // For RM role, show hamburger menu on left, title in center, profile on right
  const isRMLayout = role === 'rm' || showHamburgerMenu;

  return (
    <View style={styles.container}>
      {/* Top Row: Hamburger Menu / Profile Info, Title, Profile / Notification */}
      <View style={styles.topRow}>
        {/* Left Side: Hamburger Menu (RM) or Profile Info (Admin) */}
        {isRMLayout ? (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={onHamburgerPress}
          >
            <View style={styles.menuIconContainer}>
              <VectorIcon
                type="MaterialIcons"
                name="menu"
                size={20}
                color="#000"
              />
            </View>
          </TouchableOpacity>
        ) : (
          showProfile && (
            <View style={styles.userInfo}>
              <TouchableOpacity onPress={onProfilePress}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/50' }}
                  style={styles.avatar}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.greeting}>Hey,</Text>
                <Text style={styles.userName}>{userName}</Text>
              </View>
            </View>
          )
        )}

        {/* Center: Title (RM) or empty (Admin) */}
        {isRMLayout && (
          <Text style={styles.headerTitle}>Hey, {userName}</Text>
        )}

        {/* Right Side: Profile (RM) or Notification (Admin) */}
        {isRMLayout ? (
          <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.notificationButton} onPress={onNotificationPress}>
            <Icon name="notifications-none" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      {/* Bottom Row: Back Button and Title */}
      <View style={styles.bottomRow}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Icon name="arrow-back-ios" size={24} color="#000" />
          </TouchableOpacity>
        )}
        
        {title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}

        {/* Optional Edit Button aligned to the right */}
        {showEditButton && (
          <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
            <Icon name="edit" size={22} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#000',
  },
  greeting: {
    fontSize: 16,
    color: '#000',
    ...getFontStyle('regular'),
  },
  userName: {
    fontSize: 20,
    color: '#000',
    ...getFontStyle('semiBold'),
  },
  backButton: {
    position: 'absolute',
    left: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#000',
    ...getFontStyle('semiBold'),
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    color: '#000000',
    ...getFontStyle('semiBold'),
  },
  profileButton: {
    width: 40,
    height: 40,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});

export default Navbar;
