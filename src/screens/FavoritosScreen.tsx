import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { EcopontoCard } from '../components/EcopontoCard';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';

type PontoType = RootStackParamList['Detalhes']['ponto'];

const FAVORITOS_KEY = '@reciclaspot:favoritos';

export default function FavoritosScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [favoritos, setFavoritos] = useState<PontoType[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);

  // Recarrega os favoritos do AsyncStorage toda vez que a aba ganhar foco (funciona 100% offline)
  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      async function carregarFavoritosOffline() {
        try {
          const dadosSalvos = await AsyncStorage.getItem(FAVORITOS_KEY);
          if (ativo) {
            if (dadosSalvos) {
              setFavoritos(JSON.parse(dadosSalvos));
            } else {
              setFavoritos([]);
            }
          }
        } catch (error) {
          console.log('Erro ao ler favoritos offline:', error);
        } finally {
          if (ativo) setCarregando(false);
        }
      }

      carregarFavoritosOffline();

      return () => {
        ativo = false;
      };
    }, [])
  );

  const favoritosFiltrados = filtroCategoria
    ? favoritos.filter((item) =>
        item.categoria?.toLowerCase().includes(filtroCategoria.toLowerCase())
      )
    : favoritos;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Favoritos</Text>

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.pill,
              { backgroundColor: filtroCategoria === null ? colors.primary : '#E0E4E2' },
            ]}
            onPress={() => setFiltroCategoria(null)}
          >
            <Text
              style={[
                styles.pillText,
                { color: filtroCategoria === null ? colors.white : colors.textDark },
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.pill,
              { backgroundColor: filtroCategoria === 'E-lixo' ? colors.primary : '#E0E4E2' },
            ]}
            onPress={() => setFiltroCategoria(filtroCategoria === 'E-lixo' ? null : 'E-lixo')}
          >
            <Text
              style={[
                styles.pillText,
                { color: filtroCategoria === 'E-lixo' ? colors.white : colors.textDark },
              ]}
            >
              E-lixo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.pill,
              { backgroundColor: filtroCategoria === 'Óleo' ? colors.badgeOleo : '#E0E4E2' },
            ]}
            onPress={() => setFiltroCategoria(filtroCategoria === 'Óleo' ? null : 'Óleo')}
          >
            <Text
              style={[
                styles.pillText,
                { color: filtroCategoria === 'Óleo' ? colors.white : colors.textDark },
              ]}
            >
              Óleo
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>
          Meus Ecopontos Favoritos ({favoritosFiltrados.length})
        </Text>

        {carregando ? (
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.emptyText}>Carregando favoritos salvos...</Text>
          </View>
        ) : favoritosFiltrados.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="star-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>Nenhum favorito encontrado</Text>
            <Text style={styles.emptyText}>
              {filtroCategoria
                ? `Você ainda não favoritou nenhum ponto na categoria ${filtroCategoria}.`
                : 'Abra os detalhes de um ecoponto e toque em "Favoritar Ponto" para acessá-lo mesmo sem internet.'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={favoritosFiltrados}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <EcopontoCard
                ponto={{
                  ...item,
                  statusProjeto: item.id === '1' ? 'Projeto finalizado' : undefined,
                }}
                showStatusBadge={item.id === '1'}
                onPress={() => navigation.navigate('Detalhes', { ponto: item })}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  title: { fontSize: 22, fontWeight: '700', color: colors.textDark, marginBottom: 14 },
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  pill: { paddingHorizontal: 18, paddingVertical: 7, borderRadius: 20 },
  pillText: { fontWeight: '700', fontSize: 13 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textDark, marginBottom: 12 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    marginTop: 12,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 19,
  },
});
