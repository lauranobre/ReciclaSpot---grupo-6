import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { EcopontoCard } from '../components/EcopontoCard';
import { MOCK_PONTOS } from '../services/mockPontos';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';

export default function FavoritosScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const favoritosMock = MOCK_PONTOS.slice(0, 2);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Favoritos</Text>

        <View style={styles.filterRow}>
          <View style={[styles.pill, { backgroundColor: colors.primary }]}>
            <Text style={styles.pillText}>E-lixo</Text>
          </View>
          <View style={[styles.pill, { backgroundColor: colors.badgeOleo }]}>
            <Text style={styles.pillText}>Óleo</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Meus Ecopontos Favoritos</Text>

        <FlatList
          data={favoritosMock}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EcopontoCard
              ponto={{ ...item, statusProjeto: item.id === '1' ? 'Projeto finalizado' : undefined }}
              showStatusBadge={item.id === '1'}
              onPress={() => navigation.navigate('Detalhes', { ponto: item })}
            />
          )}
        />
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
  pillText: { color: colors.white, fontWeight: '700', fontSize: 13 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textDark, marginBottom: 12 },
});