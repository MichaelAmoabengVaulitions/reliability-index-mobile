import { Geist_400Regular, Geist_500Medium, useFonts } from '@expo-google-fonts/geist';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SelectionProvider } from '@/selection/SelectionContext';

// The splash screen stays up until Geist is ready, so text never changes font on screen.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Geist_400Regular, Geist_500Medium });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <SelectionProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SelectionProvider>
    </SafeAreaProvider>
  );
}
