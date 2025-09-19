import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface VectorIconProps {
  type?: 'MaterialIcons' | 'Ionicons' | 'FontAwesome';
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: any;
  disabled?: boolean;
}

const VectorIcon: React.FC<VectorIconProps> = ({
  type = 'MaterialIcons',
  name,
  size = 24,
  color = '#000000',
  onPress,
  style,
  disabled = false,
}) => {
  const renderIcon = () => {
    const iconProps = {
      name,
      size,
      color: disabled ? '#CCCCCC' : color,
      style,
    };

    switch (type) {
      case 'Ionicons':
        return <Ionicons {...iconProps} />;
      case 'FontAwesome':
        return <FontAwesome {...iconProps} />;
      case 'MaterialIcons':
      default:
        return <MaterialIcons {...iconProps} />;
    }
  };

  if (onPress && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, style]}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {renderIcon()}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.iconWrapper, style]}>
      {renderIcon()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VectorIcon;
