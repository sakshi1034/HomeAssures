import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { AppGradient, Navbar } from "../../components";
import { getFontStyle } from "../../utils/fonts";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../navigation/AppNavigator";

/* ---------- types ---------- */
type NavT = NativeStackNavigationProp<RootStackParamList, "Projects">;
type RouteT = RouteProp<RootStackParamList, "Projects">;

type Project = {
  id: string | number;
  projectName?: string;
  city?: string;
  state?: string;
  reraNumber?: string;
  phasesCount?: number;
  // ...any other fields you pass to ProjectDetails
};

const AllProjectsScreen: React.FC = () => {
  const navigation = useNavigation<NavT>();
  const route = useRoute<RouteT>();
  const rawProjects = (route.params as any)?.projects as Project[] | undefined;

  const [query, setQuery] = useState("");

  const projects = Array.isArray(rawProjects) ? rawProjects : [];

  const filtered = useMemo(() => {
    if (!query.trim()) return projects;
    const q = query.toLowerCase();
    return projects.filter((p) =>
      (p.projectName || "").toLowerCase().includes(q)
    );
  }, [projects, query]);

  const handleBackPress = () => navigation.goBack();
  const handleNotificationPress = () => {};
  const handleProfilePress = () => {};

  const goToDetails = (item: Project) => {
    // Navigate to your ProjectDetails screen with the whole object
    navigation.navigate("ProjectDetails" as never, { project: item } as never);
  };

  const goToEdit = (item?: Project) => {
    // If you support editing an existing one:
    navigation.navigate("AddProject" as never, item ? ({ project: item } as never) : (undefined as never));
  };

  const confirmDelete = (item: Project) => {
    Alert.alert(
      "Delete Project",
      `Are you sure you want to delete “${item.projectName || "Untitled"}”?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {/* hook your delete API */} },
      ]
    );
  };

  const renderItem = ({ item }: { item: Project }) => {
    const title = item.projectName || "Untitled Project";
    const metaLeft = [item.city, item.state].filter(Boolean).join(", ");
    const metaRight = item.reraNumber ? `RERA: ${item.reraNumber}` : undefined;

    return (
      <Touchable opacity={0.9} onPress={() => goToDetails(item)}>
        <View style={styles.cardRow}>
          <View style={styles.leftBlock}>
            <Text style={styles.projectName} numberOfLines={1}>
              {title}
            </Text>

            <View style={styles.metaRow}>
              <View style={styles.metaBadge}>
                <Icon name="location-on" size={14} color="#6B7280" />
                <Text numberOfLines={1} style={styles.metaText}>
                  {metaLeft || "—"}
                </Text>
              </View>

              {!!metaRight && (
                <View style={styles.metaBadge}>
                  <Icon name="gavel" size={14} color="#6B7280" />
                  <Text numberOfLines={1} style={styles.metaText}>
                    {metaRight}
                  </Text>
                </View>
              )}

              {!!item.phasesCount && (
                <View style={styles.metaBadge}>
                  <Icon name="domain" size={14} color="#6B7280" />
                  <Text numberOfLines={1} style={styles.metaText}>
                    {item.phasesCount} Phases
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => goToEdit(item)}
              style={styles.iconBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Icon name="edit" size={20} color="#111827" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => confirmDelete(item)}
              style={styles.iconBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Icon name="delete-outline" size={20} color="#B91C1C" />
            </TouchableOpacity>

            <Icon name="chevron-right" size={22} color="#9CA3AF" />
          </View>
        </View>
      </Touchable>
    );
  };

  const EmptyList = () => (
    <View style={styles.emptyWrap}>
      <Icon name="folder-open" size={42} color="#9CA3AF" />
      <Text style={styles.emptyTitle}>No Projects</Text>
      <Text style={styles.emptyText}>Tap the + button or Edit to add a project.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showBackButton
          showProfile
          title="All Projects"
          onBackPress={handleBackPress}
          onNotificationPress={handleNotificationPress}
          onProfilePress={handleProfilePress}
        />

        {/* Top tools: count + search */}
        <View style={styles.toolsBar}>
          <View style={styles.countPill}>
            <Text style={styles.countText}>{filtered.length}</Text>
            <Text style={styles.countLabel}>Projects</Text>
          </View>

          <View style={styles.searchWrap}>
            <Icon name="search" size={18} color="#6B7280" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search project"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
              autoCorrect={false}
            />
            {!!query && (
              <TouchableOpacity onPress={() => setQuery("")} style={styles.clearBtn}>
                <Icon name="close" size={16} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <FlatList
          contentContainerStyle={styles.list}
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={EmptyList}
        />

        {/* Optional FAB for quick add */}
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.9}
          onPress={() => goToEdit(undefined)}
        >
          <Icon name="add" size={26} color="#ffffff" />
        </TouchableOpacity>
      </AppGradient>
    </SafeAreaView>
  );
};

/* tiny wrapper to keep TouchableOpacity readable */
const Touchable: React.FC<{ onPress: () => void; opacity?: number; children: React.ReactNode }> = ({
  onPress,
  opacity = 0.8,
  children,
}) => (
  <TouchableOpacity activeOpacity={opacity} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

export default AllProjectsScreen;

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },

  toolsBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingBottom: 6,
    paddingTop: 4,
  },

  countPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF4FF",
    borderWidth: 1,
    borderColor: "#DCEBFF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  countText: {
    fontSize: 14,
    color: "#111827",
    ...getFontStyle("semiBold"),
  },
  countLabel: {
    fontSize: 13,
    color: "#6B7280",
    ...getFontStyle("medium"),
  },

  searchWrap: {
    flex: 1,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    ...getFontStyle("regular"),
  },
  clearBtn: { padding: 4 },

  list: { paddingHorizontal: 12, paddingBottom: 24, paddingTop: 6 },

  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#111827",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },

  leftBlock: { flex: 1, marginRight: 8 },

  projectName: {
    fontSize: 18,
    color: "#111827",
    marginBottom: 6,
    ...getFontStyle("semiBold"),
  },

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
  },
  metaText: {
    fontSize: 12,
    color: "#6B7280",
    ...getFontStyle("medium"),
    maxWidth: 160,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 6,
  },
  iconBtn: { padding: 6 },

  separator: { height: 10 },

  emptyWrap: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    color: "#111827",
    ...getFontStyle("semiBold"),
  },
  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    ...getFontStyle("regular"),
  },

  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
});
