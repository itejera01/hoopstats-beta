import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';


export default function RootLayout() {
  const [loaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto-VariableFont_wdth,wght.ttf'),
    Oswald: require('../assets/fonts/Oswald-VariableFont_wght.ttf'),
  });
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

