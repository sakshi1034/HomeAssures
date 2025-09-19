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
interface NavbarProps {
  userName?: string;
  showBackButton?: boolean;
  showProfile?: boolean;
  title?: string;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  userName = 'Prakash',
  showBackButton = false,
  showProfile = true,
  title,
  onBackPress,
  onNotificationPress,
  onProfilePress,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Row: Profile Info and Notification */}
      <View style={styles.topRow}>
        {showProfile && (
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
        )}
        
        {/* Notification Section */}
        <TouchableOpacity style={styles.notificationButton} onPress={onNotificationPress}>
          <Icon name="notifications-none" size={24} color="#000" />
        </TouchableOpacity>
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
});

export default Navbar;
