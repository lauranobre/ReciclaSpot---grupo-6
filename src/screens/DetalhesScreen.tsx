import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;
type PontoType = RootStackParamList['Detalhes']['ponto'];

const FAVORITOS_KEY = '@reciclaspot:favoritos';

export default function DetalhesScreen({ route, navigation }: Props) {
  const { ponto } = route.params;
  const [isFavorito, setIsFavorito] = useState(false);
  const [salvandoFavorito, setSalvandoFavorito] = useState(false);

  const materiais = ponto.materiaisAceitos ?? [ponto.categoria, 'Plástico', 'Vidro'];
  const regras = ponto.regras ?? [
    'Entregue os materiais limpos e previamente separados.',
    'Limite de descarte diário de 1m³ por cidadão.',
    'Não são aceitos resíduos hospitalares ou lixo orgânico.',
  ];

  useEffect(() => {
    async function verificarFavorito() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(FAVORITOS_KEY);
        if (dadosSalvos) {
          const listaFavoritos: PontoType[] = JSON.parse(dadosSalvos);
          const existe = listaFavoritos.some((item) => item.id === ponto.id);
          setIsFavorito(existe);
        }
      } catch (error) {
        console.log('Erro ao ler favoritos:', error);
      }
    }
    verificarFavorito();
  }, [ponto.id]);

  async function toggleFavorito() {
    setSalvandoFavorito(true);
    try {
      const dadosSalvos = await AsyncStorage.getItem(FAVORITOS_KEY);
      const listaAtual: PontoType[] = dadosSalvos ? JSON.parse(dadosSalvos) : [];

      let novaLista: PontoType[];

      if (isFavorito) {
        novaLista = listaAtual.filter((item) => item.id !== ponto.id);
        setIsFavorito(false);
      } else {
        novaLista = [...listaAtual, ponto];
        setIsFavorito(true);
      }

      await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(novaLista));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar seus favoritos offline.');
      console.log(error);
    } finally {
      setSalvandoFavorito(false);
    }
  }

  function abrirRotaNoMapa() {
    const { latitude, longitude, nome } = ponto;
    const label = encodeURIComponent(nome);
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`,
    });

    if (url) {
      Linking.openURL(url).catch(() => {
        Linking.openURL(
          `https://google.com{latitude},${longitude}`
        );
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={
            typeof ponto.imagemUri === 'string'
              ? { uri: ponto.imagemUri }
              : ponto.imagemUri
          }
          style={styles.coverImage}
        />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.topFavoriteButton}
          onPress={toggleFavorito}
          disabled={salvandoFavorito}
        >
          <Ionicons
            name={isFavorito ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorito ? '#E53935' : colors.white}
          />
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

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[
              styles.favoriteActionButton,
              isFavorito && styles.favoriteActionButtonActive,
            ]}
            onPress={toggleFavorito}
            disabled={salvandoFavorito}
          >
            {salvandoFavorito ? (
              <ActivityIndicator size="small" color={isFavorito ? colors.white : colors.primary} />
            ) : (
              <>
                <Ionicons
                  name={isFavorito ? 'star' : 'star-outline'}
                  size={20}
                  color={isFavorito ? colors.white : colors.primary}
                />
                <Text
                  style={[
                    styles.favoriteActionText,
                    isFavorito && styles.favoriteActionTextActive,
                  ]}
                >
                  {isFavorito ? 'Remover dos Favoritos' : 'Favoritar Ponto'}
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.routeButton} onPress={abrirRotaNoMapa}>
            <Text style={styles.routeButtonText}>Traçar Rota</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  imageWrapper: { position: 'relative' },
  coverImage: { width: '100%', height: 220, backgroundColor: '#CCC' },
  backButton: {
    position: 'absolute',
    top: 44,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 20,
    padding: 6,
  },
  topFavoriteButton: {
    position: 'absolute',
    top: 44,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 20,
    padding: 7,
  },
  body: { padding: 20 },
  title: { fontSize: 22, fontWeight: '700', color: colors.textDark, marginBottom: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  infoText: { fontSize: 13, color: colors.textDark },
  badgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 14 },
  materialBadge: {
    backgroundColor: colors.badgePapel,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  materialText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  rulesContainer: { marginTop: 4, marginBottom: 24 },
  ruleItem: { fontSize: 13, color: colors.textMuted, marginBottom: 6, lineHeight: 18 },
  actionsContainer: { gap: 12 },
  favoriteActionButton: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
  },
  favoriteActionButtonActive: {
    backgroundColor: colors.primary,
  },
  favoriteActionText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  favoriteActionTextActive: {
    color: colors.white,
  },
  routeButton: {
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeButtonText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});