import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../theme/colors';
import { Usuario } from '../types';

export default function PerfilScreen() {
  const [usuario, setUsuario] = useState<Usuario>({
    id: 'u1',
    nome: 'Mariana',
    username: 'Eco-mariana1234',
    email: 'mariana@reciclaspot.com',
    pontosReciclagem: 450,
    descartesRealizados: 45,
    kgsReciclados: 12.3,
    fotoPerfilUri: 'https://unsplash.com',
  });

    async function abrirCamera(modo: 'avatar' | 'descarte') {
    try {
      const permissao = await ImagePicker.requestCameraPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          'Permissão necessária',
          'Ative a permissão da câmera nas configurações do celular para tirar fotos.'
        );
        return;
      }

      const resultado = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1,1],
        quality: 0.7,
      });

      if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
        const novaUri = resultado.assets[0].uri;

        if (modo === 'avatar') {
          setUsuario((prev) => ({ ...prev, fotoPerfilUri: novaUri }));
          Alert.alert('Sucesso', 'Foto de perfil atualizada!');
        } else {
          setUsuario((prev) => ({
            ...prev,
            descartesRealizados: (prev.descartesRealizados ?? 0) + 1,
            pontosReciclagem: prev.pontosReciclagem + 10,
          }));
          Alert.alert('Descarte Registrado!', 'Você ganhou +10 pontos de reciclagem.');
        }
      }
    } catch (erro) {
      Alert.alert('Erro ao abrir câmera', 'Verifique se o Expo Go tem permissão de câmera no aparelho.');
      console.log(erro);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBanner} />

      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={() => abrirCamera('avatar')}>
          <Image source={{ uri: usuario.fotoPerfilUri }} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.name}>{usuario.nome}</Text>
        <Text style={styles.username}>{usuario.username}</Text>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Descartes</Text>
          <Text style={styles.statValue}>{usuario.descartesRealizados}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Kgs Reciclados</Text>
          <Text style={styles.statValue}>{usuario.kgsReciclados}</Text>
        </View>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => abrirCamera('descarte')}
        >
          <View style={styles.menuLeft}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={22} color={colors.textDark} />
            <Text style={styles.menuText}>Registrar Descarte (Foto)</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            Alert.alert('Pontos Acumulados', `Você possui ${usuario.pontosReciclagem} pontos!`)
          }
        >
          <View style={styles.menuLeft}>
            <Ionicons name="logo-usd" size={22} color={colors.textDark} />
            <Text style={styles.menuText}>Pontos Acumulados ({usuario.pontosReciclagem})</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <View style={styles.cameraWrapper}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => abrirCamera('descarte')}
        >
          <Ionicons name="camera-outline" size={28} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  topBanner: { height: 110, backgroundColor: colors.primary },
  profileHeader: { alignItems: 'center', marginTop: -50 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.white,
    backgroundColor: '#DDD',
  },
  name: { fontSize: 22, fontWeight: '700', color: colors.textDark, marginTop: 8 },
  username: { fontSize: 13, color: colors.primary, marginTop: 2 },
  statsCard: { flexDirection: 'row', backgroundColor: '#F3F5F4', marginHorizontal: 28, marginTop: 20, borderRadius: 12, paddingVertical: 14,},
  statBox: { flex: 1, alignItems: 'center' },
  divider: { width: 1, backgroundColor: colors.border },
  statLabel: { fontSize: 12, color: colors.textMuted },
  statValue: { fontSize: 22, fontWeight: '700', color: colors.textDark, marginTop: 4 },
  menu: { marginTop: 24, paddingHorizontal: 28 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border,},
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuText: { fontSize: 15, color: colors.textDark, fontWeight: '500' },
  cameraWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cameraButton: { backgroundColor: colors.primary, width: 68, height: 46, borderRadius: 10, justifyContent: 'center', alignItems: 'center',},
});