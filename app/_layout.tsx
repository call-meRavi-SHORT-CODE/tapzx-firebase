import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { AuthProvider } from "../contexts/AuthContext"
import { useFrameworkReady } from '@/hooks/useFrameworkReady'

export default function RootLayout() {
  useFrameworkReady();
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0F172A" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)/signin" />
        <Stack.Screen name="(auth)/signup" />
        <Stack.Screen name="(auth)/profile" />
        <Stack.Screen name="(auth)/addlinks" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  )
}