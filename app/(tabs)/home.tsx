import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { user, userProfile, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              router.replace('./(auth)/signin');
            } catch (error: any) {
              Alert.alert("Error", error.message);
            }
          }
        }
      ]
    );
  };

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
            <View style={styles.headerLeft}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.nameText}>{userProfile?.fullName || user?.displayName || 'User'}</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="#F59E0B" />
            </TouchableOpacity>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <LinearGradient
              colors={["rgba(245, 158, 11, 0.1)", "rgba(251, 191, 36, 0.05)"]}
              style={styles.profileCardGradient}
            >
              <View style={styles.profileHeader}>
                <View style={styles.profileImageContainer}>
                  {userProfile?.profileImage ? (
                    <Image source={{ uri: userProfile.profileImage }} style={styles.profileImage} />
                  ) : (
                    <View style={styles.profileImagePlaceholder}>
                      <Ionicons name="person" size={32} color="#F59E0B" />
                    </View>
                  )}
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{userProfile?.fullName || 'Your Name'}</Text>
                  {userProfile?.username && (
                    <Text style={styles.profileUrl}>app.me/{userProfile.username}</Text>
                  )}
                  {userProfile?.organizationName && (
                    <Text style={styles.organizationName}>{userProfile.organizationName}</Text>
                  )}
                </View>
              </View>

              {userProfile?.bio && (
                <Text style={styles.bio}>{userProfile.bio}</Text>
              )}

              {userProfile?.location && (
                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={16} color="#94A3B8" />
                  <Text style={styles.location}>{userProfile.location}</Text>
                </View>
              )}
            </LinearGradient>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userProfile?.platforms?.length || 0}</Text>
              <Text style={styles.statLabel}>Connected Platforms</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Profile Views</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            
            <TouchableOpacity style={styles.actionItem} onPress={handleEditProfile}>
              <View style={styles.actionIcon}>
                <Ionicons name="person-outline" size={20} color="#F59E0B" />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Edit Profile</Text>
                <Text style={styles.actionSubtitle}>Update your personal information</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748B" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem} onPress={handleEditLinks}>
              <View style={styles.actionIcon}>
                <Ionicons name="link-outline" size={20} color="#F59E0B" />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Manage Links</Text>
                <Text style={styles.actionSubtitle}>Add or edit your social links</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748B" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <Ionicons name="share-outline" size={20} color="#F59E0B" />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Share Profile</Text>
                <Text style={styles.actionSubtitle}>Share your profile with others</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748B" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <Ionicons name="analytics-outline" size={20} color="#F59E0B" />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>View Analytics</Text>
                <Text style={styles.actionSubtitle}>See your profile performance</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Connected Platforms */}
          {userProfile?.platforms && userProfile.platforms.length > 0 && (
            <View style={styles.platformsContainer}>
              <Text style={styles.sectionTitle}>Connected Platforms</Text>
              {userProfile.platforms.map((platform, index) => (
                <View key={index} style={styles.platformItem}>
                  <View style={styles.platformIcon}>
                    <Ionicons name="link" size={16} color="#F59E0B" />
                  </View>
                  <View style={styles.platformContent}>
                    <Text style={styles.platformName}>{platform.name}</Text>
                    <Text style={styles.platformValue}>{platform.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
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
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  profileCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  profileImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F59E0B',
    borderStyle: 'dashed',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileUrl: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
    marginBottom: 2,
  },
  organizationName: {
    fontSize: 14,
    color: '#94A3B8',
  },
  bio: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
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
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
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
  actionsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  platformsContainer: {
    marginBottom: 24,
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
    width: 32,
    height: 32,
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
});