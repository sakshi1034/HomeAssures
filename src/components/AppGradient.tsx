import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ViewStyle } from 'react-native';

interface AppGradientProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

const AppGradient: React.FC<AppGradientProps> = ({ style, children }) => {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#42ADFE', '#FFF', '#FFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export default AppGradient;
