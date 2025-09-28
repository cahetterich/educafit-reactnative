# EducaFit — movimento, jogo e aprendizado

Aplicativo **Expo/React Native** (com **React Native Web**) focado em atividades físicas com propósito pedagógico.  
Design simples, acessível e com privacidade em primeiro lugar.

> **Páginas**: Home, Manifesto (Nossos valores), Login, Cadastro, Recuperar  
> **UI**: Design System próprio (Button, Card, Tag), dark mode, i18n (pt-BR/en)

---

## Sumário
- [Stack & requisitos](#stack--requisitos)
- [Como rodar](#como-rodar)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Internacionalização (i18n)](#internacionalização-i18n)
- [Tema & Design System](#tema--design-system)
- [Páginas principais](#páginas-principais)
- [Build Web (PWA) & Deploy](#build-web-pwa--deploy)
- [Build Nativo (EAS)](#build-nativo-eas)
- [Qualidade & Acessibilidade](#qualidade--acessibilidade)
- [Dicas & Troubleshooting](#dicas--troubleshooting)
- [Roadmap](#roadmap)
- [Licença](#licença)

---

## Stack & requisitos

**Tecnologias**
- Expo + React Native (+ **react-native-web**)
- **i18n-js** + `expo-localization`
- `expo-linear-gradient`, `@expo/vector-icons`
- Tema customizado via `src/theme/`
- (Opcional) AsyncStorage para lembretes de perfil

**Requisitos**
- Node 18+ e npm (ou yarn/pnpm)
- Expo CLI (`npm i -g expo-cli`) – opcional, você pode usar `npx expo`
- Conta Expo (para build nativo)

---

## Como rodar

```bash
# 1) instalar deps
npm install

# 2) rodar em dev (menu interativo)
npm run start
# atalhos:
npm run web     # abre no navegador
npm run android # emulador/dispositivo Android
