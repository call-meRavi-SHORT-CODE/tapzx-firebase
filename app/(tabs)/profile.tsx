import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { userProfile } = useAuth();

  const handleEditProfile = () => {
    router.push('./(auth)/profile');
  };

  const handleEditLinks = () => {
    router.push('./(auth)/addlinks');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={["#0F172A", "#1E293B", "#334155"]} style={styles.gradient}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Profile</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Ionicons name="create-outline" size={24} color="#F59E0B" />
            </TouchableOpacity>
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              {userProfile?.profileImage ? (
                <Image source={{ uri: userProfile.profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Ionicons name="person" size={40} color="#F59E0B" />
                </View>
              )}
            </View>
            
            <Text style={styles.profileName}>{userProfile?.fullName || 'Your Name'}</Text>
            
            {userProfile?.username && (
              <Text style={styles.profileUrl}>app.me/{userProfile.username}</Text>
            )}
            
            {userProfile?.organizationName && (
              <Text style={styles.organizationName}>{userProfile.organizationName}</Text>
            )}
            
            {userProfile?.bio && (
              <Text style={styles.bio}>{userProfile.bio}</Text>
            )}
            
            {userProfile?.location && (
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={16} color="#94A3B8" />
                <Text style={styles.location}>{userProfile.location}</Text>
              </View>
            )}
          </View>

          {/* Connected Platforms */}
          <View style={styles.platformsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Connected Platforms</Text>
              <TouchableOpacity style={styles.editLinksButton} onPress={handleEditLinks}>
                <Text style={styles.editLinksText}>Edit</Text>
              </TouchableOpacity>
            </View>
            
            {userProfile?.platforms && userProfile.platforms.length > 0 ? (
              userProfile.platforms.map((platform, index) => (
                <View key={index} style={styles.platformItem}>
                  <View style={styles.platformIcon}>
                    <Ionicons name="link" size={16} color="#F59E0B" />
                  </View>
                  <View style={styles.platformContent}>
                    <Text style={styles.platformName}>{platform.name}</Text>
                    <Text style={styles.platformValue}>{platform.value}</Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="link-outline" size={48} color="#64748B" />
                <Text style={styles.emptyStateTitle}>No platforms connected</Text>
                <Text style={styles.emptyStateSubtitle}>Add your social media and other links</Text>
                <TouchableOpacity style={styles.addLinksButton} onPress={handleEditLinks}>
                  <LinearGradient colors={["#F59E0B", "#FBBF24"]} style={styles.addLinksGradient}>
                    <Text style={styles.addLinksButtonText}>Add Links</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Profile Stats */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Profile Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{userProfile?.platforms?.length || 0}</Text>
                <Text style={styles.statLabel}>Connected Platforms</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Profile Views</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Link Clicks</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Shares</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#F59E0B',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F59E0B',
    borderStyle: 'dashed',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  profileUrl: {
    fontSize: 16,
    color: '#F59E0B',
    fontWeight: '500',
    marginBottom: 8,
  },
  organizationName: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 12,
    textAlign: 'center',
  },
  bio: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#94A3B8',
    marginLeft: 6,
  },
  platformsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  editLinksButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  editLinksText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
  },
  platformItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  platformIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  platformContent: {
    flex: 1,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  platformValue: {
    fontSize: 14,
    color: '#94A3B8',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 24,
  },
  addLinksButton: {
    borderRadius: 12,
  },
  addLinksGradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addLinksButtonText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '600',
  },
  statsSection: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F59E0B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});