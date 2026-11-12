import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MOCK_USUARIOS } from '../services/mockUsuarios';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }

    const usuarioEncontrado = MOCK_USUARIOS.find(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (usuarioEncontrado && senha === '123456') {
      navigation.replace('MainTabs');
    } else {
      Alert.alert('Erro', 'E-mail ou senha inválidos.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="map-marker-radius" size={90} color={colors.primary} />
        <Text style={styles.logoText}>
          Recicla<Text style={styles.logoHighlight}>Spot</Text>
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotText}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerContainer}>
        <Text style={styles.registerText}>Cadastra-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 28,
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoText: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.darkBg,
    marginTop: 8,
  },
  logoHighlight: {
    color: colors.primary,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 15,
    marginBottom: 16,
    color: colors.textDark,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  forgotText: {
    color: colors.textDark,
    fontSize: 13,
    marginTop: 12,
  },
  registerContainer: {
    alignItems: 'center',
  },
  registerText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
});
