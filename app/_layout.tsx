import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const [loaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto-VariableFont_wdth,wght.ttf'),
    Oswald: require('../assets/fonts/Oswald-VariableFont_wght.ttf'),
  });
  if (!loaded) return null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="+not-found" options={{ headerShown: false }}></Stack.Screen>
    </Stack>
  );
}

