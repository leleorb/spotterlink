---
name: Spotter
description: App de treinos de academia para criar, compartilhar e competir.
colors:
  bg-abyss: "#071428"
  surface: "#0c1f3f"
  surface-raised: "#122a54"
  action: "#2563eb"
  action-pressed: "#1d4ed8"
  accent-mid: "#3b82f6"
  accent-light: "#60a5fa"
  accent-faint: "#93c5fd"
  ink-primary: "#ffffff"
  ink-secondary: "#ffffffb3"
  ink-muted: "#ffffff66"
  ink-faint: "#ffffff26"
  border-subtle: "#ffffff12"
  status-go: "#4ade80"
  status-hold: "#fbbf24"
  status-stop: "#f87171"
  status-streak: "#fb923c"
typography:
  display:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
    fontVariant: "tabular-nums"
  headline:
    fontFamily: "Manrope, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Manrope, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Manrope, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.01em"
  label:
    fontFamily: "Manrope, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.01em"
  caption:
    fontFamily: "Manrope, -apple-system, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.02em"
rounded:
  full: "99px"
  xl: "24px"
  lg: "16px"
  md: "14px"
  sm: "12px"
  xs: "10px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "20px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
    typography: "{typography.title}"
  button-primary-active:
    backgroundColor: "{colors.action-pressed}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-secondary:
    backgroundColor: "{colors.border-subtle}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
    typography: "{typography.title}"
  button-icon:
    backgroundColor: "{colors.border-subtle}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.full}"
    size: "40px"
  input-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.sm}"
    padding: "13px 16px"
    typography: "{typography.title}"
  input-focused:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.sm}"
    padding: "13px 16px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.lg}"
    padding: "16px"
  card-raised:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
  chip-go:
    backgroundColor: "#22c55e1a"
    textColor: "{colors.status-go}"
    rounded: "{rounded.full}"
    padding: "5px 12px"
  chip-hold:
    backgroundColor: "#fbbf241a"
    textColor: "{colors.status-hold}"
    rounded: "{rounded.full}"
    padding: "5px 12px"
  chip-stop:
    backgroundColor: "#ef44441a"
    textColor: "{colors.status-stop}"
    rounded: "{rounded.full}"
    padding: "5px 12px"
  filter-pill:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.full}"
    padding: "7px 14px"
  filter-pill-active:
    backgroundColor: "{colors.action}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.full}"
    padding: "7px 14px"
---

# Design System: Spotter

## 1. Overview

**Creative North Star: "Seu Treino na Palma da Mão"**

Spotter existe no bolso do atleta, aberto com uma mão entre séries. O design parte desse cenário físico: academia com luz forte, foco na tarefa, sem tempo para aprender onde está o botão. Cada tela precisa comunicar sua função em dois segundos ou menos. O sistema prioriza clareza absoluta sobre decoração, hierarquia real sobre uniformidade, e identidade que não depende de efeitos visuais para existir.

A paleta é escura e profunda, como a água no fundo de uma piscina olímpica. Não dark por tendência, mas dark porque o atleta está sob luz artificial intensa, e um fundo branco seria hostil. O azul de ação aparece só onde há algo a fazer, tornando cada botão inequívoco. A sensação é de um app que conhece o contexto do seu uso.

O que este sistema rejeita explicitamente: o template SaaS cinza de cards idênticos sem personalidade; interfaces fitness com gradientes roxo-neon que prometem mais do que entregam; tabelas pesadas cheias de números que confundem em vez de motivar.

**Key Characteristics:**
- Fundo profundo azul-marinho; superfícies em camadas tonais, não em sombras
- Um único azul de ação vivo; tudo mais é neutro ou semântico
- Um único tipo sem serifa (Inter) em peso variável: 900 para o que comanda, 400 para o que informa
- Bordas full-rounded em chips e badges; cantos generosos em cards (16px) e botões (14px)
- Animações de estado apenas, nunca coreografia de entrada de página

## 2. Colors

Paleta restrita: três camadas de azul profundo para superfícies, um azul de ação isolado, branco em três opacidades para texto, e quatro cores semânticas para estado.

### Primary
- **Azul Pista de Atletismo** (`#2563eb`): Exclusivo para ações primárias: botão principal, nav ativo, filter pill selecionado, indicador de progresso. Aparece em ≤15% de qualquer tela; sua raridade é o que o torna inequívoco.
- **Azul Elétrico** (`#3b82f6`): Link, ícone de nav ativo, elementos de dado com destaque. Um tom acima do Pista em luminosidade; sinaliza referência mais do que ação.
- **Azul Névoa** (`#60a5fa`): Números de ranking, metadados de destaque, texto de barra de progresso. Frio e legível sobre o fundo abissal.
- **Azul Gelo** (`#93c5fd`): Texto de chip de categoria, acentos muito sutis. Nunca para ação.

### Neutral
- **Azul Meia-Noite da Piscina** (`#071428`): Background absoluto do app e do app-shell.
- **Azul Vestiário** (`#0c1f3f`): Superfície de card padrão. A camada onde vive o conteúdo.
- **Azul Armário** (`#122a54`): Card elevado, aninhado, ou inativo. Terceira camada tonal; mais claro que o vestiário, mais escuro que o action.
- **Branco** (`#ffffff`): Texto primário, ícones ativos, rótulos de botão primário.
- **Branco Névoa** (`rgba(255,255,255,0.7)`): Texto secundário, texto de botão ghost.
- **Branco Mudo** (`rgba(255,255,255,0.4)`): Metadata, timestamps, labels de suporte.
- **Branco Rastro** (`rgba(255,255,255,0.07–0.15)`): Bordas de card, divisórias, backgrounds de hover. Nunca texto.

### Tertiary (semântica de estado)
- **Verde Largada** (`#4ade80`): Badge Iniciante. Toast de sucesso. Único verde no sistema.
- **Âmbar Sinal** (`#fbbf24`): Badge Intermediário. Nunca para texto de corpo.
- **Vermelho Limite** (`#f87171`): Badge Avançado. Ícone de curtida ativo.
- **Laranja Sequência** (`#fb923c`): Exclusivo para streak (dias seguidos). Não reutilizar para outros estados.

### Named Rules
**A Regra do Azul Único.** O Azul Pista de Atletismo (`#2563eb`) aparece em no máximo 15% de qualquer tela. Usá-lo em fundo de card, borda decorativa ou texto de corpo destrói o sinal. Se parece muito azul, está errado.

**A Regra da Cor Semântica.** Cada cor de estado (verde, âmbar, vermelho, laranja) pertence a exatamente uma função. Verde = nível iniciante + sucesso. Laranja = sequência. Usar verde para outros destaques positivos viola o contrato semântico.

## 3. Typography

**Body Font:** Inter (com fallback -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif)

Inter em peso variável é o único tipo da interface. A hierarquia é construída inteiramente por peso e tamanho: 900 para o que comanda a cena, 400 para o que informa. Nenhuma decoração tipográfica adicional.

### Hierarchy
- **Display** (900, 28px, lh 1.1, ls −0.02em): Nome do app no onboarding, números grandes de ranking. Máximo um elemento display por tela.
- **Headline** (800, 18px, lh 1.2, ls −0.01em): Título de seção, nome do treino em card destaque.
- **Title** (700, 15px, lh 1.3): Nome do treino em card padrão, rótulo de botão, input text.
- **Body** (400, 14px, lh 1.5): Descrição de treino, comentário de feed. Máximo 65ch de largura.
- **Label** (600, 12px, lh 1.2, ls 0.01em): Chip de dificuldade, filter pill, tag de exercício.
- **Caption** (600, 10px, lh 1.2, ls 0.02em): Nav label mobile, metadata de tempo, rótulo de eixo.

### Named Rules
**A Regra do Peso Único por Nível.** Não use peso 700 e 800 no mesmo bloco visual sem diferença de tamanho. O peso pesado sem contraste de escala vira ruído.

**A Regra do Caption Mobile.** O caption de 10px é exclusivo para navegação inferior e metadados. Nunca para texto de instrução ou label de input. Abaixo de 12px, o texto deixa de ser lido.

## 4. Elevation

O sistema é plano por padrão. Profundidade é comunicada por camadas tonais, não por sombras. A progressão é: `#071428` (fundo) → `#0c1f3f` (card) → `#122a54` (elemento elevado dentro do card). Não existem três cards aninhados. Dois níveis é o máximo.

A única sombra real do sistema é o toast: `0 8px 32px rgba(0,0,0,0.4)`. Ela existe porque o toast precisa se desprender do conteúdo de fundo; não existe outra justificativa para sombra no produto.

### Shadow Vocabulary
- **Sombra Flutuante** (`box-shadow: 0 8px 32px rgba(0,0,0,0.4)`): Exclusivo para toast e overlays que precisam comunicar elevação sobre conteúdo escuro.

### Named Rules
**A Regra da Camada Tonal.** Antes de adicionar sombra, pergunte: estou criando uma nova camada de fundo? Se sim, use a próxima cor da ramp (`surface` → `surface-raised`). Sombra é o último recurso, não o primeiro.

## 5. Components

### Buttons
Todos os botões são full-width em mobile. No desktop, têm largura natural do conteúdo quando em par lado a lado.

- **Shape:** Cantos generosamente arredondados (14px); nunca pílula, nunca quadrado.
- **Primary (`btn-primary`):** Fundo Azul Pista de Atletismo (`#2563eb`), texto branco, peso 700, 15px. `:active` escurece para `#1d4ed8` e aplica `scale(0.97)`.
- **Secondary (`btn-secondary`):** Fundo `rgba(255,255,255,0.07)`, borda `rgba(255,255,255,0.1)`, texto Branco Névoa. Para ações reversíveis ou de suporte.
- **Icon (`btn-icon`):** Circular (40×40px), mesmo fundo do secondary. Para ações rápidas na topbar.
- **Hover:** Nenhum estado hover explícito em mobile (touch). No desktop, primary clareia 5%, secondary adiciona 5% de opacidade ao fundo.

### Chips (badges de dificuldade)
- **Shape:** Full-rounded (99px), padding 5px 12px, fonte Label (12px, 600).
- **Go (Iniciante):** Fundo verde 10% opacidade, borda verde 25%, texto Verde Largada.
- **Hold (Intermediário):** Fundo âmbar, borda âmbar, texto Âmbar Sinal.
- **Stop (Avançado):** Fundo vermelho, borda vermelha, texto Vermelho Limite.
- Sempre contêm texto além de cor. Nunca apenas cor como indicador.

### Cards / Containers
- **Card padrão (`.card`):** Fundo Azul Vestiário (`#0c1f3f`), borda `rgba(255,255,255,0.07)`, raio 16px, padding 16px. Sem sombra.
- **Card elevado (`.card-sm`):** Fundo Azul Armário (`#122a54`), borda `rgba(255,255,255,0.06)`, raio 12px. Usado dentro de `.card`, nunca isolado.
- Nested cards são proibidos. `.card-sm` vive dentro de `.card`; nada vive dentro de `.card-sm`.

### Inputs / Fields
- **Estilo:** Fundo Azul Vestiário (`#0c1f3f`), borda 1.5px `rgba(255,255,255,0.1)`, raio 12px, padding 13px 16px.
- **Focus:** Borda muda para Azul Elétrico (`#3b82f6`). Sem glow externo.
- **Placeholder:** `rgba(255,255,255,0.28)` — suficiente para 4.5:1 sobre o fundo de input. Não usar opacity menor.
- **Disabled:** Não implementado ainda. Quando implementar: opacidade 40%, cursor não-permitido.

### Navigation
- **Mobile (bottom nav):** Três botões em linha, ícone 22px + caption 10px empilhados. Cor padrão `rgba(255,255,255,0.35)`. Ativo: Azul Elétrico (`#3b82f6`). Fundo `rgba(7,20,40,0.97)` com blur(20px). Altura mínima 56px por target.
- **Desktop (sidebar):** Mesmos itens, orientação coluna, padding 12px 20px, raio 10px. Ativo: fundo `rgba(59,130,246,0.12)`, borda `rgba(59,130,246,0.2)`.
- Nunca um badge numérico de notificação sobre o ícone de nav sem implementar a funcionalidade de notificações.

### Bottom Sheet (componente assinatura)
Padrão de interação primário para ações destrutivas ou formulários. Alternativa a modais centrados.
- **Shape:** Raio 24px nos cantos superiores, zero nos inferiores. Handle bar 36×4px, branco 20% opacidade, centralizado.
- **Fundo:** Azul Vestiário (`#0c1f3f`), borda superior `rgba(255,255,255,0.1)`.
- **Entrada:** `slideUp` 220ms linear. Sem bounce.
- **Dismiss:** Toque no overlay escuro. O overlay é `rgba(0,0,0,0.6)`.
- Máximo 90dvh de altura. Sempre scrollável internamente se o conteúdo vazar.

## 6. Do's and Don'ts

### Do:
- **Do** usar o Azul Pista de Atletismo (`#2563eb`) somente para ações primárias, nav ativo e progresso. Nada de decoração.
- **Do** verificar contraste: texto body (#fff sobre #0c1f3f) deve atingir ≥4.5:1. Texto muted (`rgba(255,255,255,0.4)`) sobre `#0c1f3f` fica em ~3.8:1 — aceitável só para metadata, nunca para conteúdo principal.
- **Do** usar touch targets mínimos de 44×44px em todos os elementos interativos. O atleta usa o app com as mãos suadas.
- **Do** comunicar dificuldade com texto + cor no chip (nunca só cor).
- **Do** usar `.card-sm` dentro de `.card` para criar hierarquia de conteúdo. Não criar um terceiro nível de card.
- **Do** implementar `prefers-reduced-motion` para todas as animações: `fadeUp`, `slideUp`, `likeAnim` devem ter fallback de crossfade ou transição instantânea.
- **Do** usar Inter 900 com `letter-spacing: -0.02em` para números de ranking grandes. A combinação é inconfundível.

### Don't:
- **Não** usar cards idênticos cinzas em grade sem personalidade. O Spotter não é um dashboard SaaS. Cada card tem hierarquia interna clara.
- **Não** usar gradientes roxo-neon, glow colorido ou glassmorphism decorativo. Interfaces "fitness dark" com esses elementos parecem suplemento, não app confiável.
- **Não** replicar o visual do MyFitnessPal: tabelas densas de dados, texto pequeno demais, ausência de hierarquia entre informação primária e secundária.
- **Não** colocar `border-left` colorido como acento em cards ou list items. Nunca. Reescrever com fundo tintado ou sem decoração.
- **Não** usar `background-clip: text` com gradiente para texto colorido. Use cor sólida.
- **Não** animar propriedades de layout (`width`, `height`, `padding`). A barra de progresso usa `transition: width` — único caso tolerado e já existente; não adicionar novos.
- **Não** usar o Laranja Sequência (`#fb923c`) para qualquer coisa além de streak. A associação é semântica e frágil: usá-lo em outro contexto confunde o usuário sobre o que o ícone de fogo significa.
- **Não** colocar texto de corpo abaixo de 13px. O app é usado sob luz de academia, às vezes com óculos no bolso.
