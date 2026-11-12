import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { EcopontoCard } from '../components/EcopontoCard';
import { MOCK_PONTOS } from '../services/mockPontos';
import { colors } from '../theme/colors';
import { CategoriaResiduo, RootStackParamList } from '../types';

const FILTROS: { label: string; valor: CategoriaResiduo; cor: string }[] = [
  { label: 'E-lixo', valor: 'Eletrônicos', cor: colors.primary },
  { label: 'Óleo', valor: 'Óleo Usado', cor: colors.badgeOleo },
  { label: 'Papel', valor: 'Recicláveis Gerais', cor: colors.badgePapel },
  { label: 'Pilhas', valor: 'Pilhas/Baterias', cor: colors.badgeVidro },
];

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaResiduo | null>(null);

  const pontosFiltrados = MOCK_PONTOS.filter((item) => {
    const termo = busca.toLowerCase().trim();
    const matchBusca =
      item.nome.toLowerCase().includes(termo) ||
      item.bairro.toLowerCase().includes(termo) ||
      item.endereco.toLowerCase().includes(termo);

    const matchCategoria = categoriaSelecionada
      ? item.categoria === categoriaSelecionada
      : true;

    return matchBusca && matchCategoria;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ReciclaSpot</Text>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar coletas por nome ou bairro"
            placeholderTextColor={colors.textMuted}
            value={busca}
            onChangeText={setBusca}
          />
          {busca.length > 0 ? (
            <TouchableOpacity onPress={() => setBusca('')}>
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          ) : (
            <Ionicons name="search" size={20} color={colors.textMuted} />
          )}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.filterRow}>
          {FILTROS.map((filtro) => {
            const ativo = categoriaSelecionada === filtro.valor;
            return (
              <TouchableOpacity
                key={filtro.valor}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: filtro.cor,
                    opacity: ativo || !categoriaSelecionada ? 1 : 0.4,
                    borderWidth: ativo ? 2 : 0,
                    borderColor: colors.darkBg,
                  },
                ]}
                onPress={() =>
                  setCategoriaSelecionada(ativo ? null : filtro.valor)
                }
              >
                <Text style={styles.filterText}>{filtro.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <FlatList
          data={pontosFiltrados}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum ecoponto encontrado para este filtro.</Text>
          }
          renderItem={({ item }) => (
            <EcopontoCard
              ponto={item}
              onPress={() => navigation.navigate('Detalhes', { ponto: item })}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.primary },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: colors.white, marginBottom: 12 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 44,
  },
  searchInput: { flex: 1, fontSize: 15, color: colors.textDark },
  content: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 18, paddingTop: 16 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  filterPill: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 },
  filterText: { color: colors.white, fontWeight: '700', fontSize: 13 },
  emptyText: { textAlign: 'center', color: colors.textMuted, marginTop: 40, fontSize: 15 },
});