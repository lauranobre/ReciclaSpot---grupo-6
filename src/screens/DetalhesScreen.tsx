import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

export default function DetalhesScreen({ route, navigation }: Props) {
  const { ponto } = route.params;

  const materiais = ponto.materiaisAceitos ?? [ponto.categoria, 'Plástico', 'Vidro'];
  const regras = ponto.regras ?? [
    'Entregue os materiais limpos e previamente separados.',
    'Limite de descarte diário de 1m³ por cidadão.',
    'Não são aceitos resíduos hospitalares ou lixo orgânico.',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: ponto.imagemUri }} style={styles.coverImage} />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>{ponto.nome}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color={colors.textDark} />
          <Text style={styles.infoText}>
            {ponto.endereco} - {ponto.bairro}
          </Text>
        </View>

        {ponto.verificado !== false && (
          <View style={styles.infoRow}>
            <Ionicons name="checkmark" size={16} color={colors.verifiedBlue} />
            <Text style={[styles.infoText, { color: colors.verifiedBlue }]}>Verificado</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color={colors.textDark} />
          <Text style={styles.infoText}>{ponto.horarioFuncionamento}</Text>
        </View>

        <View style={styles.badgesRow}>
          {materiais.map((mat, index) => (
            <View key={index} style={styles.materialBadge}>
              <Text style={styles.materialText}>{mat}</Text>
            </View>
          ))}
        </View>

        <View style={styles.rulesContainer}>
          {regras.map((regra, idx) => (
            <Text key={idx} style={styles.ruleItem}>
              • {regra}
            </Text>
          ))}
        </View>

        <TouchableOpacity
          style={styles.routeButton}
          onPress={() =>
            Alert.alert('Rota', `Coordenadas: ${ponto.latitude}, ${ponto.longitude}`)
          }
        >
          <Text style={styles.routeButtonText}>Traçar Rota</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  imageWrapper: { position: 'relative' },
  coverImage: { width: '100%', height: 220, backgroundColor: '#CCC' },
  backButton: { position: 'absolute', top: 44, left: 16, backgroundColor: 'rgba(0,0,0,0.45)', borderRadius: 20, padding: 6, },
  body: { padding: 20 },
  title: { fontSize: 22, fontWeight: '700', color: colors.textDark, marginBottom: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  infoText: { fontSize: 13, color: colors.textDark },
  badgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 14 },
  materialBadge: { backgroundColor: colors.badgePapel, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, },
  materialText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  rulesContainer: { marginTop: 4, marginBottom: 24 },
  ruleItem: { fontSize: 13, color: colors.textMuted, marginBottom: 6, lineHeight: 18 },
  routeButton: { backgroundColor: colors.primary, height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', },
  routeButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});