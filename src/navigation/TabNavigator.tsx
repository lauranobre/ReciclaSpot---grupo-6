import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { TabParamList } from '../types';

import FavoritosScreen from '../screens/FavoritosScreen';
import HomeScreen from '../screens/HomeScreen';
import MapaScreen from '../screens/MapaScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: '#0A3D2E',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Mapa') iconName = 'search-circle-outline';
          else if (route.name === 'Favoritos') iconName = 'heart-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mapa" component={MapaScreen} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}