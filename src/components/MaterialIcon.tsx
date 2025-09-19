import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface MaterialIconProps {
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: any;
  disabled?: boolean;
}

const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  size = 24,
  color = '#000000',
  onPress,
  style,
  disabled = false,
}) => {
  // Fallback rendering function
  const renderFallback = () => {
    // Simple fallback for common icons
    const fallbackIcons: { [key: string]: string } = {
      'visibility': '👁️',
      'visibility-off': '🙈',
      'eye': '👁️',
      'eye-off': '🙈',
    };

    const fallbackIcon = fallbackIcons[name] || '●';

    return (
      <View style={[styles.fallback, { width: size, height: size }]}>
        <Text style={[{ fontSize: size * 0.7, color }]}>{fallbackIcon}</Text>
      </View>
    );
  };

  try {
    if (onPress && !disabled) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.container, style]}
          disabled={disabled}
        >
          <MaterialIcons
            name={name}
            size={size}
            color={disabled ? '#CCCCCC' : color}
          />
        </TouchableOpacity>
      );
    }

    return (
      <MaterialIcons
        name={name}
        size={size}
        color={disabled ? '#CCCCCC' : color}
        style={style}
      />
    );
  } catch (error) {
    // Fallback to emoji or simple text if MaterialIcons fails
    console.warn('MaterialIcon failed to render, using fallback:', name);
    
    if (onPress && !disabled) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.container, style]}
          disabled={disabled}
        >
          {renderFallback()}
        </TouchableOpacity>
      );
    }

    return renderFallback();
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MaterialIcon;
