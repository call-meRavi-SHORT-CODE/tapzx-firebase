import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  const { user, userProfile, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user && userProfile) {
        // Check if user has completed profile setup
        if (userProfile.username && userProfile.platforms.length > 0) {
          router.replace('./(tabs)/home');
        } else if (!userProfile.username) {
          router.replace('./(auth)/profile');
        } else {
          router.replace('./(auth)/addlinks');
        }
      } else {
        router.replace('./(auth)/signin');
      }
    }
  }, [user, userProfile, loading]);

  return (
    <LinearGradient colors={["#0F172A", "#1E293B", "#334155"]} style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F59E0B" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});