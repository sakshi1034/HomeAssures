import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VectorIcon, AppGradient, Navbar } from '../../components';
import { getFontStyle } from '../../utils/fonts';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { InventoryStackParamList } from '../../navigation/InventoryStack';

type InventoryScreenNavigationProp = StackNavigationProp<InventoryStackParamList>;


const InventoryScreen: React.FC = () => {
  const navigation = useNavigation<InventoryScreenNavigationProp>();

  // Mock project data
  const projectsData = [
    {
      id: 'SN123',
      name: 'Sai Nagari',
      unitsBooked: 1000,
      location: 'Sai Nagari, Vitthal Nagar, Jambhulwadi Rd, Siddhivinayak Society, Ambegaon Budruk, Pune, Maharashtra 411046',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
      summary: '1 / 2 / 3 BHK • Phases 1-3 • Possession Q4-2026',
      amenities: [
        {
          icon: 'park',
          title: 'Green surroundings',
          description: 'Tree-lined avenues and landscaped open spaces.'
        },
        {
          icon: 'security',
          title: '24x7 Security',
          description: 'CCTV, gated entry and round-the-clock staff.'
        },
        {
          icon: 'local-parking',
          title: 'Ample Parking',
          description: 'Dedicated slots for residents and guests.'
        }
      ]
    },
    {
      id: 'GV456',
      name: 'Green Valley',
      unitsBooked: 750,
      location: 'Green Valley, Sector 15, Near IT Park, Hinjewadi, Pune, Maharashtra 411057',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      summary: '2 / 3 BHK • Phase 1-2 • Possession Q2-2025',
      amenities: [
        {
          icon: 'pool',
          title: 'Swimming Pool',
          description: 'Olympic size pool with modern amenities.'
        },
        {
          icon: 'fitness-center',
          title: 'Gym & Spa',
          description: 'Fully equipped gym and wellness center.'
        },
        {
          icon: 'restaurant',
          title: 'Club House',
          description: 'Multi-purpose club house with dining facilities.'
        }
      ]
    },
    {
      id: 'BH789',
      name: 'Blue Heights',
      unitsBooked: 500,
      location: 'Blue Heights, Baner Road, Near Balewadi Stadium, Pune, Maharashtra 411045',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
      summary: '1 / 2 / 3 / 4 BHK • Phase 1 • Possession Q3-2025',
      amenities: [
        {
          icon: 'golf-course',
          title: 'Golf Course',
          description: '9-hole golf course with professional coaching.'
        },
        {
          icon: 'school',
          title: 'School Nearby',
          description: 'International school within walking distance.'
        },
        {
          icon: 'shopping-cart',
          title: 'Shopping Mall',
          description: 'Premium shopping mall with entertainment zone.'
        }
      ]
    }
  ];

  const handleProjectPress = (project: any) => {
    navigation.navigate('ProjectDetails', {
      projectId: project.id,
      projectName: project.name,
      projectImage: project.image,
      unitsBooked: project.unitsBooked,
      location: project.location,
      projectSummary: project.summary,
      amenities: project.amenities
    });
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar
          showProfile={true}
          userName="Prakash"
          onNotificationPress={handleNotificationPress}
          onProfilePress={() => console.log('Profile pressed')}
          title="Inventory"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
        />
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Project Cards */}
          <View style={styles.projectsContainer}>
            {projectsData.map((project) => (
              <TouchableOpacity
                key={project.id}
                style={styles.projectCard}
                onPress={() => handleProjectPress(project)}
                activeOpacity={0.9}
              >
                <Image
                  source={{ uri: project.image }}
                  style={styles.projectImage}
                  resizeMode="cover"
                />
                
                {/* Overlay Content */}
                <View style={styles.overlay}>
                  <View style={styles.projectInfo}>
                    <View style={styles.projectHeader}>
                      <View style={styles.projectTitleContainer}>
                        <Text style={styles.projectName}>{project.name}</Text>
                        <Text style={styles.projectId}>{project.id}</Text>
                      </View>
                      <View style={styles.unitsContainer}>
                        <Text style={styles.unitsBooked}>{project.unitsBooked}</Text>
                        <Text style={styles.unitsLabel}>units booked</Text>
                      </View>
                    </View>
                    
                    <View style={styles.locationContainer}>
                      <VectorIcon
                        type="MaterialIcons"
                        name="location-on"
                        size={16}
                        color="#FFFFFF"
                      />
                      <Text style={styles.locationText}>{project.location}</Text>
                    </View>
                    
                    <View style={styles.viewDetailsContainer}>
                      <Text style={styles.viewDetailsText}>View Project Details</Text>
                      <VectorIcon
                        type="MaterialIcons"
                        name="chevron-right"
                        size={20}
                        color="#FFFFFF"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </AppGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  projectsContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  projectCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  projectImage: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  projectInfo: {
    gap: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  projectTitleContainer: {
    flex: 1,
  },
  projectName: {
    fontSize: 20,
    color: '#FFFFFF',
    ...getFontStyle('semiBold'),
  },
  projectId: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 2,
    ...getFontStyle('regular'),
  },
  unitsContainer: {
    alignItems: 'flex-end',
  },
  unitsBooked: {
    fontSize: 20,
    color: '#FFFFFF',
    ...getFontStyle('semiBold'),
  },
  unitsLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 2,
    ...getFontStyle('regular'),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#FFFFFF',
    flex: 1,
    lineHeight: 16,
    ...getFontStyle('regular'),
  },
  viewDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#FFFFFF',
    ...getFontStyle('medium'),
  },
  bottomSpacing: {
    height: 100,
  },
});

export default InventoryScreen;
