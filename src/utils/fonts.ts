import { Platform } from 'react-native';

// Font family configuration for Poppins
export const fonts = {
  regular: Platform.select({
    ios: 'Poppins-Regular',
    android: 'Poppins-Regular',
  }),
  medium: Platform.select({
    ios: 'Poppins-Medium', 
    android: 'Poppins-Medium',
  }),
  semiBold: Platform.select({
    ios: 'Poppins-SemiBold',
    android: 'Poppins-SemiBold',
  }),
  italic: Platform.select({
    ios: 'Poppins-Italic',
    android: 'Poppins-Italic',
  }),
};

// Font weight mapping
export const fontWeights = {
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

// Utility function to get font style
export const getFontStyle = (weight: 'regular' | 'medium' | 'semiBold' | 'italic' = 'regular') => {
  return {
    fontFamily: fonts[weight],
  };
};
