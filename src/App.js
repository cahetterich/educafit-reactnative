import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  Switch,
  Platform,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider, useTheme } from "./theme/theme";
import Splash from "./screens/Splash";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Recovery from "./screens/Recovery";
import Manifesto from "./screens/Manifesto";

import { t, setLocale, getLocale } from "./i18n";

const Stack = createNativeStackNavigator();
function Container({ children, style }) {
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(
    width,
    width >= 1024 ? 1024 : width >= 768 ? 768 : 420
  );
  return (
    <View
      style={[
        { alignSelf: "center", width: contentWidth, paddingHorizontal: 16 },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const NavLink = ({ active, label, onPress }) => {
  const { colors, mode } = useTheme();

  const activeBg =
    mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.06)"; // leve contraste
  const activeBorder =
    mode === "dark" ? "rgba(255,255,255,0.18)" : colors.border;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: active ? activeBg : "transparent",
        borderWidth: active ? 1 : 0,
        borderColor: active ? activeBorder : "transparent",
        marginLeft: 6,
      }}
      accessible
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={{ color: colors.text, fontWeight: active ? "800" : "600" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

function NavBar({ routeName, navigation }) {
  const { colors, mode, setMode } = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [open, setOpen] = React.useState(false);
  const topInset = Platform.OS === "android" ? (StatusBar.currentHeight || 0) : 0;

  const links = [
    [t("nav.home"), "Home"],
    [t("nav.login"), "Login"],
    [t("nav.signup"), "Signup"],
    [t("nav.recovery"), "Recovery"],
  ];

  const LangToggle = () => (
    <TouchableOpacity
      onPress={() => {
        const next = getLocale() === "pt-BR" ? "en" : "pt-BR";
        setLocale(next);
        navigation.replace(routeName);
        setOpen(false);
      }}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text style={{ color: colors.text }}>
        {getLocale() === "pt-BR" ? "PT" : "EN"}
      </Text>
    </TouchableOpacity>
  );

  const ThemeToggle = () => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ color: colors.text, marginRight: 6 }}>☀︎</Text>
      <Switch
        value={mode === "dark"}
        onValueChange={() => setMode(mode === "dark" ? "light" : "dark")}
      />
      <Text style={{ color: colors.text, marginLeft: 6 }}>☾</Text>
    </View>
  );

  const LinkRow = ({ vertical = false }) => (
    <View
      style={{
        flexDirection: vertical ? "column" : "row",
        alignItems: vertical ? "stretch" : "center",
        gap: vertical ? 8 : 0,
      }}
    >
      {links.map(([label, key]) => (
        <NavLink
          key={key}
          label={label}
          active={routeName === key}
          onPress={() => {
            navigation.navigate(key);
            setOpen(false);
          }}
        />
      ))}
      {!vertical && <View style={{ width: 8 }} />}
      {!vertical && <LangToggle />}
      {!vertical && <View style={{ width: 12 }} />}
      {!vertical && <ThemeToggle />}
    </View>
  );

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
      }}
    >
      <SafeAreaView style={{ paddingTop: topInset }}>
        <Container>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 12,
            }}
          >
            {/* Logo + título */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../assets/icon.png")}
                style={{ width: 28, height: 28, marginRight: 8 }}
              />
              <Text style={{ fontWeight: "800", color: colors.text }}>
                EducaFit
              </Text>
            </View>

            {/* Desktop = links inline | Mobile = hambúrguer */}
            {!isMobile ? (
              <LinkRow />
            ) : (
              <TouchableOpacity
                onPress={() => setOpen((o) => !o)}
                accessibilityLabel="Abrir menu"
                style={{
                  padding: 8,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.text, fontSize: 18 }}>☰</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Dropdown no mobile */}
          {isMobile && open && (
            <View style={{ marginBottom: 8 }}>
              <View
                style={{
                  marginTop: 8,
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                  borderRadius: 12,
                  padding: 12,
                  gap: 8,
                  shadowColor: "#000",
                  shadowOpacity: 0.2,
                  shadowRadius: 12,
                  elevation: 8,
                }}
              >
                <LinkRow vertical />
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.border,
                    marginVertical: 8,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <LangToggle />
                  <ThemeToggle />
                </View>
              </View>
            </View>
          )}
        </Container>
      </SafeAreaView>
    </View>
  );
}

function Shell({ navigation, route, children }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {route.name !== "Splash" && (
        <NavBar routeName={route.name} navigation={navigation} />
      )}
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}
function StackScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home">
        {(p) => (
          <Shell {...p}>
            <Home {...p} />
          </Shell>
        )}
      </Stack.Screen>
      <Stack.Screen name="Login">
        {(p) => (
          <Shell {...p}>
            <Login {...p} />
          </Shell>
        )}
      </Stack.Screen>
      <Stack.Screen name="Signup">
        {(p) => (
          <Shell {...p}>
            <Signup {...p} />
          </Shell>
        )}
      </Stack.Screen>
      <Stack.Screen name="Recovery">
        {(p) => (
          <Shell {...p}>
            <Recovery {...p} />
          </Shell>
        )}
      </Stack.Screen>
      <Stack.Screen name="Manifesto">
        {(p) => (
          <Shell {...p}>
            <Manifesto {...p} />
          </Shell>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
export default function AppContainer() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StackScreens />
      </NavigationContainer>
    </ThemeProvider>
  );
}
