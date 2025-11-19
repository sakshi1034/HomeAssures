import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { VectorIcon } from './index';
import { getFontStyle } from '../utils/fonts';

const { width } = Dimensions.get('window');

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
  userName: string;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose, userName }) => {
  const slideAnim = React.useRef(new Animated.Value(-width * 0.8)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width * 0.8,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const menuItems = [
    { icon: 'id-card-o', iconType: 'FontAwesome', label: 'Virtual Business Card' },
    { icon: 'calendar', iconType: 'FontAwesome', label: 'My Schedule' },
    { icon: 'sticky-note-o', iconType: 'FontAwesome', label: 'My Notes' },
    { icon: 'line-chart', iconType: 'FontAwesome', label: 'Leaderboard' },
  ] as const;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={styles.logoRow}>
            <Image
              source={require('../assets/images/HALogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.userSection}>
            <View>
              <Text style={styles.userLabel}>Welcome back</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <VectorIcon
                type="MaterialIcons"
                name="close"
                size={24}
                color="#0F172A"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.menuItems}>
            {menuItems.map((item) => (
              <TouchableOpacity key={item.label} style={styles.menuItem}>
                <View style={styles.iconWrapper}>
                  <VectorIcon
                    type={item.iconType}
                    name={item.icon}
                    size={20}
                    color="#0F172A"
                  />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <LinearGradient
              colors={['#3DB7FF', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoutGradient}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    width: width * 0.74,
    backgroundColor: '#FFFFFF',
    height: '100%',
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  logoRow: {
    alignItems: 'flex-end',
  },
  logo: {
    width: 48,
    height: 48,
  },
  userSection: {
    marginTop: 40,
    marginBottom: 48,
  },
  userLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
    ...getFontStyle('medium'),
  },
  userName: {
    fontSize: 24,
    color: '#0F172A',
    ...getFontStyle('semiBold'),
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
  },
  menuItems: {
    gap: 28,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 18,
    color: '#0F172A',
    ...getFontStyle('medium'),
  },
  logoutButton: {
    marginTop: 'auto',
  },
  logoutGradient: {
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#FFFFFF',
    ...getFontStyle('semiBold'),
  },
});

export default DrawerMenu;
