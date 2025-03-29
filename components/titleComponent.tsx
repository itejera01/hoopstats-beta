import { Colors } from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function TitleComponent({ title }: { title: string }) {
  return (
    <>
      <View style={styles.titleArea}>
        <Text style={styles.title}>{title}</Text>
        <View style={{ justifyContent: 'center', padding: 5, }}>
          <TouchableOpacity
            onPress={() => router.push("/settings")}
            style={{ marginRight: 10 }}
          >
            <FontAwesome name="cog" size={40} color={Colors.titleColor} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create(
  {
    title: {
      color: Colors.titleColor,
      fontSize: 64,
      fontWeight: 'regular',
      fontFamily: 'Oswald',
      marginLeft: 30,
    },
    titleArea: {
      height: 100,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: Colors.buttonBackground,
    },
  }
)

