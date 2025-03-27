import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from '@/cache';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('CLERK_PUBLISHABLE_KEY is not set');
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto-VariableFont_wdth,wght.ttf'),
    Oswald: require('../assets/fonts/Oswald-VariableFont_wght.ttf'),
  });
  return (
    <ClerkProvider publishableKey={publishableKey}
      tokenCache={tokenCache}>
      <ClerkLoaded>
        <Slot />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

