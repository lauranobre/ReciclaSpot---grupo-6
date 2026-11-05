# 🎨 Documentação do Design System — Sprint 0 (Figma)

Esta seção documenta as especificações de interface e o kit de componentes reutilizáveis (UI Kit) projetados e validados no protótipo de alta fidelidade do aplicativo **ReciclaSpot**. Todas as escolhas técnicas visam garantir acessibilidade, consistência de marca e facilidade na transição do design para o código em React Native.

---

## 💻 1. Paleta de Cores Sustentável

A escolha cromática do projeto alinha a temática ambiental e ecológica à solidez e segurança de uma solução voltada a *Smart Cities*. Todas as combinações críticas de texto e fundo atendem aos critérios de alto contraste das diretrizes de acessibilidade **WCAG AA**.

| Amostra | Elemento de Interface | Código Hexadecimal | Aplicação no Protótipo |
| :---: | :--- | :---: | :--- |
| 🟢 | **Verde Esmeralda/Folha** | `#00A86B` | Cor de marca principal: Botões de ação (*Primary Button*), cabeçalhos de perfil e destaques positivos. |
| 🔵 | **Azul Petróleo Escuro** | `#0A2F35` | Fundo institucional: Identidade visual da *Splash Screen* e ícone de marca. |
| 🟠 | **Laranja Âmbar** | `#FF9F1C` | Alerta e categorias: Destaques de horários, pílulas de filtros rápidos para resíduos especiais (Óleo). |
| ⚪ | **Fundo Neutro (Claro)** | `#F8F9FA` | Fundo principal das telas de fluxo diário para alta legibilidade e leveza visual. |
| 🧾 | **Texto Escuro Principal** | `#212529` | Textos de títulos, corpos de regras de descarte e descrições gerais. |
| 🏳️ | **Texto Claro Principal** | `#FFFFFF` | Textos internos de botões de ação e telas institucionais escuras. |

---

## 🔤 2. Tipografia e Hierarquia Visual

Para garantir uma interface limpa, moderna e altamente legível em telas de diferentes densidades de pixels (smartphones), adotou-se a família tipográfica **Poppins** como padrão do projeto.

*   **Títulos de Destaque (Splash/Boas-Vindas):** `Poppins Bold` — **32px** (Alto impacto, centralizado com o slogan).
*   **Títulos das Telas (Cabeçalhos):** `Poppins SemiBold` — **24px** (Exemplo: Título "ReciclaSpot" e "Ecoponto Central").
*   **Subtítulos / Nomes de Estabelecimentos:** `Poppins Medium` — **18px** (Utilizado nos títulos dos cards e nomes dos ecopontos).
*   **Texto de Corpo (Instruções e Regras):** `Poppins Regular` — **14px** (Usado nos inputs de formulário, endereço e regras de descarte).
*   **Legendas / Elementos de Apoio:** `Poppins Light/Regular` — **12px** (Indicadores de distância em `km`, tags e rótulos secundários).

---

## 📦 3. UI Kit — Componentes Reutilizáveis

Todos os elementos de interface foram componentizados no Figma utilizando *Auto Layout* e variantes para reaproveitamento ágil no desenvolvimento das telas.

### 🔘 Botões de Ação Rápida
*   **Primary Button (`Entrar` / `Traçar Rota`):** Botão com cantos arredondados, preenchimento sólido em *Verde Esmeralda* e texto em negrito na cor branca. Ocupa a largura total da área de ação para facilitar o clique.
*   **Secondary/Text Button (`Esqueci a senha` / `Cadastra-se`):** Links baseados apenas em texto estilizado, sem bordas ou fundos, otimizando a limpeza visual da tela de autenticação.
*   **Interactive / Floating Toggle:** Ícone de coração vazado/preenchido em *Verde Esmeralda*, posicionado de forma ergonômica ao lado da rota nas telas de detalhes, acionando a persistência local offline de favoritos.

### 🔍 Elementos de Entrada e Filtragem
*   **Campos de Busca (Search Input):** Caixa de texto cinza claro com cantos arredondados, placeholder `"Buscar coletas"` e alinhamento à esquerda, acompanhado por um ícone sutil de lupa para identificação imediata da funcionalidade.
*   **Pílulas / Badges de Filtro Rápido:** Etiquetas de canto arredondado utilizadas na Home e nos Favoritos para filtragem instantânea de materiais (`E-lixo`, `Óleo`, `Papel`, `Vidro`). Apresentam cores alternadas conforme a categoria para acelerar a triagem visual.

### 🃏 Card de Ponto de Coleta (`PontoColetaCard`)
Componente estruturado para listagens dinâmicas com rolagem, contendo os seguintes elementos obrigatórios fixados no protótipo:
*   **Foto do Local:** Miniatura lateral mostrando a fachada física ou os coletores organizados do ecoponto.
*   **Identificação Tonal:** Nome destacado do local (ex: `Ecoponto` ou `Scapento`) e o endereço resumido.
*   **Metadados de Proximidade:** Distância em quilômetros recalculada a partir do sensor do GPS (ex: `2km`, `6km`).
*   **Selo de Validação:** Indicador textual de endereço ou status verificado integrado às APIs ambientais.
*   **Badges de Suporte:** Ícones ou tags compactas indexando quais tipos de materiais aquela unidade específica está operando no momento.

### 🗺️ Barra de Navegação Inferior (`Bottom Navigation Bar`)
Elemento fixo e estilizado posicionado no rodapé das telas principais (Home, Mapa, Favoritos e Perfil). 
*   **Estrutura:** Composta por um container sólido com fundo na cor *Verde Esmeralda* e ícones brancos altamente contrastantes.
*   **Comportamento:** Mapeia de forma direta a jornada do usuário pelas Sprints, oferecendo alternância rápida entre os modos de visualização em lista, mapa geolocalizado e repositório local.


Link figma: https://www.figma.com/proto/57mVjI1hTPCE4grYhURNnh/ReciclaSpot?node-id=1-2&p=f&t=WnCN4jVWzqU2Zhdp-1&scaling=scale-downcontent-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2