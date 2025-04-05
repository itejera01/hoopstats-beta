import { Colors } from '@/constants/Colors';
import { View, Image, StyleSheet } from 'react-native';

const escudos: { [key: string]: any } = {
  '25 de Agosto': require('../assets/escudos/25_de_Agosto.png'),
  'Aguada': require('../assets/escudos/Aguada.png'),
  'Albatros': require('../assets/escudos/Albatros.png'),
  'Atenas': require('../assets/escudos/Atenas.png'),
  'Ateneo': require('../assets/escudos/Ateneo_(maldonado).png'),
  'Auriblanco': require('../assets/escudos/Auriblanco.png'),
  'Bigua': require('../assets/escudos/Bigua.png'),
  'Bohemios': require('../assets/escudos/Bohemios.png'),
  'Capitol': require('../assets/escudos/Capitol.png'),
  'Capurro': require('../assets/escudos/Capurro.png'),
  'Cordon': require('../assets/escudos/Cordon.png'),
  'Colon F.C.': require('../assets/escudos/Colon_F.C..png'),
  'Country El Pinar': require('../assets/escudos/Country_El_Pinar.png'),
  'Defensor Sporting': require('../assets/escudos/Defensor_Sporting.png'),
  'Defensores de Maroñas': require('../assets/escudos/Defensores_de_Maroñas.png'),
  'Deportivo Maldonado': require('../assets/escudos/Deportivo_Maldonado.png'),
  'Deportivo de la Costa': require('../assets/escudos/Deportivo_de_la_Costa.png'),
  'Goes': require('../assets/escudos/Goes.png'),
  'Hebraica y Macabi': require('../assets/escudos/Hebraica_y_Macabi.png'),
  'Juventud': require('../assets/escudos/Juventud.png'),
  'Lagomar': require('../assets/escudos/Lagomar.png'),
  'Larrañaga': require('../assets/escudos/Larrañaga.png'),
  'Larre Borges': require('../assets/escudos/Larre_Borges.png'),
  'Layva': require('../assets/escudos/Layva.png'),
  'Malvin': require('../assets/escudos/Malvin.png'),
  'Marne': require('../assets/escudos/Marne.png'),
  'Miramar': require('../assets/escudos/Miramar.png'),
  'Montevideo BBC': require('../assets/escudos/Montevideo_BBC.png'),
  'Nacional': require('../assets/escudos/Nacional.png'),
  'Nautico': require('../assets/escudos/Nautico.png'),
  'Olimpia': require('../assets/escudos/Olimpia.png'),
  'Olivol Mundial': require('../assets/escudos/Olivol_Mundial.png'),
  'Peñarol': require('../assets/escudos/Peñarol.png'),
  'Plaza Helvetico': require('../assets/escudos/Plaza_Helvetico.png'),
  'Reducto': require('../assets/escudos/Reducto.png'),
  'San Telmo - Rapido Sport': require('../assets/escudos/San_Telmo_-_Rapido_Sport.png'),
  'Sayago': require('../assets/escudos/Sayago.png'),
  'Stockolmo': require('../assets/escudos/Stockolmo.png'),
  'Tabare': require('../assets/escudos/Tabare.png'),
  'Trouville': require('../assets/escudos/Trouville.png'),
  'Union Atletica': require('../assets/escudos/Union_Atletica.png'),
  'Urunday Universitario': require('../assets/escudos/Urunday_Universitario.png'),
  'Urupan': require('../assets/escudos/Urupan.png'),
  'Verdirrojo': require('../assets/escudos/Verdirrojo.png'),
  'Welcome': require('../assets/escudos/Welcome.png'),
  'Yale': require('../assets/escudos/Yale.png'),
};

const EscudosComponent = ({ teamName }: { teamName: string }) => {
  const imageSource = escudos[teamName] || require('../assets/escudos/default.png')


  return (
    <View style={styles.imageContainer}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: Colors.appBackground,
    backgroundColor: Colors.text,
    borderWidth: 2,
    marginHorizontal: 15,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
});

export default EscudosComponent;
