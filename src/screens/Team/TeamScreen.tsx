import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFontStyle } from '../../utils/fonts';

const TeamScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Team Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  text: {
    fontSize: 18,
    color: '#1F2937',
    ...getFontStyle('medium'),
  },
});

export default TeamScreen;
