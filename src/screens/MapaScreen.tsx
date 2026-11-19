import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Callout, Marker, Region } from 'react-native-maps';
import { MOCK_PONTOS } from '../services/mockPontos';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';

export default function MapaScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const mapRef = useRef<MapView>(null);

  const [busca, setBusca] = useState('');
  const [loadingGps, setLoadingGps] = useState(true);
  const [region, setRegion] = useState<Region>({
    latitude: -21.7975,
    longitude: -50.8789,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
  });

  const obterLocalizacao = async () => {
    setLoadingGps(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Ative a localização nas configurações para centralizar o mapa na sua posição atual.'
        );
        setLoadingGps(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const novaRegiao: Region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };

      setRegion(novaRegiao);
      mapRef.current?.animateToRegion(novaRegiao, 800);
    } catch (error) {
      Alert.alert('Erro de GPS', 'Não foi possível obter sua localização atual.');
    } finally {
      setLoadingGps(false);
    }
  };

  useEffect(() => {
    obterLocalizacao();
  }, []);

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

      {loadingGps && (
        <View style={styles.loadingBanner}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.loadingText}>Obtendo sua localização...</Text>
        </View>
      )}

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={false}
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
            <Callout
              tooltip={false}
              onPress={() => navigation.navigate('Detalhes', { ponto })}
            >
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{ponto.nome}</Text>

                <Text style={styles.calloutMaterials}>
                  Materiais:{' '}
                  {(ponto.materiaisAceitos ?? [ponto.categoria, 'Plástico', 'Vidro']).join(', ')}
                </Text>

                <View style={styles.calloutButton}>
                  <Text style={styles.calloutButtonText}>Ver detalhes</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.gpsButton}
        onPress={obterLocalizacao}
        disabled={loadingGps}
      >
        {loadingGps ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Ionicons name="locate" size={24} color={colors.primary} />
        )}
      </TouchableOpacity>

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
  loadingBanner: {
    position: 'absolute',
    top: 96,
    alignSelf: 'center',
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    elevation: 4,
  },
  loadingText: { fontSize: 12, color: colors.textDark, fontWeight: '600' },
  map: { flex: 1 },
  callout: { width: 190, padding: 6 },
  calloutTitle: { fontWeight: '700', fontSize: 14, color: colors.textDark },
  calloutCategory: { fontSize: 12, color: colors.primary, marginVertical: 4 },
  calloutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  calloutButtonText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  gpsButton: {
    position: 'absolute',
    right: 16,
    bottom: 76,
    backgroundColor: colors.white,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  calloutMaterials: {
    fontSize: 12,
    color: colors.textMuted,
    marginVertical: 4,
    lineHeight: 16,
  },

  footer: {
    backgroundColor: colors.white,
    padding: 18,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 6,
  },
  footerTitle: { fontSize: 16, fontWeight: '700', color: colors.textDark },
});