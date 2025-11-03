import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppGradient, Navbar } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AllProjectsNavProp = NativeStackNavigationProp<RootStackParamList, 'AllProjects'>;

const AllProjectsScreen: React.FC = () => {
  const navigation = useNavigation<AllProjectsNavProp>();
  const route = useRoute<any>();
  const projects = (route.params?.projects as any[]) || [];

  const handleBackPress = () => navigation.goBack();
  const handleNotificationPress = () => {};
  const handleProfilePress = () => {};

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <Text style={styles.name}>{item.projectName}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('AddProject')} style={styles.iconBtn}>
          <Icon name="edit" size={22} color="#111827" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.iconBtn}>
          <Icon name="delete-outline" size={22} color="#111827" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showBackButton={true}
          showProfile={true}
          title="All Projects"
          onBackPress={handleBackPress}
          onNotificationPress={handleNotificationPress}
          onProfilePress={handleProfilePress}
        />
        <FlatList
          contentContainerStyle={styles.list}
          data={projects}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </AppGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  list: { paddingHorizontal: 12, paddingBottom: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  name: { fontSize: 22, color: '#111827', ...getFontStyle('semiBold') },
  actions: { flexDirection: 'row', gap: 16 },
  iconBtn: { padding: 6 },
  separator: { height: 12 },
});

export default AllProjectsScreen;


