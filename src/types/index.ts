export type CategoriaResiduo =
  | 'Eletrônicos'
  | 'Óleo Usado'
  | 'Pilhas/Baterias'
  | 'Recicláveis Gerais'
  | 'Medicamentos';

export interface PontoColeta {
  id: string;
  nome: string;
  categoria: CategoriaResiduo;
  endereco: string;
  bairro: string;
  horarioFuncionamento: string;
  latitude: number;
  longitude: number;
  imagemUri: any;
  telefoneContato: string;
  aceitaEntulho: boolean;
  // Campos visuais do protótipo Figma
  distanciaKm?: string;
  verificado?: boolean;
  materiaisAceitos?: string[];
  regras?: string[];
  statusProjeto?: string;
}

export interface Usuario {
  id: string;
  nome: string;
  username?: string;
  email: string;
  pontosReciclagem: number;
  descartesRealizados?: number;
  kgsReciclados?: number;
  fotoPerfilUri: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTabs: undefined;
  Detalhes: { ponto: PontoColeta };
};

export type TabParamList = {
  Home: undefined;
  Mapa: undefined;
  Favoritos: undefined;
  Perfil: undefined;
};
