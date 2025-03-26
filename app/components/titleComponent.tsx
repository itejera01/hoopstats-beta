import {Colors} from '@/constants/Colors';
import {StyleSheet, View, Text} from 'react-native';

export default function TitleComponent({ title }: { title: string }) {
  return (
    <>
      <View style={styles.titleArea}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </>
  );
}
  
const styles = StyleSheet.create(
    {title: {
      color: Colors.titleColor,
      fontSize: 64, 
      fontWeight: 'regular', 
      fontFamily: 'Oswald',
      marginLeft: 30,
    },
    titleArea: {
      height: 100,
      width: '100%',
      justifyContent: 'center',
      backgroundColor: Colors.buttonBackground,
    },
  }
)

