import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { MOCK_PONTOS } from '../services/mockPontos';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';

export default function MapaScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [busca, setBusca] = useState('');

  const pontosMapa = MOCK_PONTOS.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="Buscar ecoponto no mapa"
            placeholderTextColor={colors.textMuted}
            value={busca}
            onChangeText={setBusca}
          />
        </View>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -21.7975,
          longitude: -50.8789,
          latitudeDelta: 0.035,
          longitudeDelta: 0.035,
        }}
      >
        {pontosMapa.map((ponto) => (
          <Marker
            key={ponto.id}
            coordinate={{
              latitude: ponto.latitude,
              longitude: ponto.longitude,
            }}
            pinColor={colors.primary}
          >
            <Callout onPress={() => navigation.navigate('Detalhes', { ponto })}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{ponto.nome}</Text>
                <Text style={styles.calloutCategory}>{ponto.categoria}</Text>
                <Text style={styles.calloutLink}>Toque para ver detalhes</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Meus arredores ({pontosMapa.length} pontos)</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  searchWrapper: {
    position: 'absolute',
    top: 44,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 44,
    gap: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  input: { flex: 1, fontSize: 15, color: colors.textDark },
  map: { flex: 1 },
  callout: { width: 180, padding: 4 },
  calloutTitle: { fontWeight: '700', fontSize: 14, color: colors.textDark },
  calloutCategory: { fontSize: 12, color: colors.primary, marginVertical: 2 },
  calloutLink: { fontSize: 11, color: colors.textMuted, textDecorationLine: 'underline' },
  footer: {
    backgroundColor: colors.white,
    padding: 18,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 6,
  },
  footerTitle: { fontSize: 16, fontWeight: '700', color: colors.textDark },
});