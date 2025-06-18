import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Tabs/credits" />
        <Stack.Screen name="Tabs/projects" />
        <Stack.Screen name="Tabs/manage_project" />
      </Stack>
    </GestureHandlerRootView>
  );
}