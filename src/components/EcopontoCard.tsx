import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';
import { PontoColeta } from '../types';

interface Props {
  ponto: PontoColeta;
  onPress: () => void;
  showStatusBadge?: boolean;
}

export function EcopontoCard({ ponto, onPress, showStatusBadge }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <Image source={{ uri: ponto.imagemUri }} style={styles.image} />

      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {ponto.nome}
          </Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{ponto.categoria}</Text>
          </View>
        </View>

        <Text style={styles.address} numberOfLines={1}>
          {ponto.endereco}
        </Text>

        <View style={styles.bottomRow}>
          <MaterialCommunityIcons name="recycle" size={20} color={colors.textDark} />

          {showStatusBadge && ponto.statusProjeto ? (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{ponto.statusProjeto}</Text>
            </View>
          ) : (
            <View style={styles.rightMeta}>
              {ponto.distanciaKm && (
                <Text style={styles.distance}>{ponto.distanciaKm}</Text>
              )}
              <Text style={styles.link}>Ver endereço</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 92,
    height: 92,
    borderRadius: 8,
    backgroundColor: '#DDD',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  address: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  rightMeta: {
    alignItems: 'flex-end',
  },
  distance: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 2,
  },
  link: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  statusBadge: {
    backgroundColor: colors.badgeOleo,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
});