import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => navigation.replace('Login')}
    >
      <MaterialCommunityIcons name="leaf-circle" size={110} color={colors.accentGreen} />
      <Text style={styles.logoText}>
        Recicla<Text style={styles.logoHighlight}>Spot</Text>
      </Text>
      <Text style={styles.subtitle}>
        Conectando o cidadão ao descarte consciente
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoText: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.white,
    marginTop: 16,
  },
  logoHighlight: {
    color: colors.accentGreen,
  },
  subtitle: {
    fontSize: 14,
    color: '#D0D7D5',
    textAlign: 'center',
    marginTop: 8,
  },
});