import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StatusBar,
  Platform,
  Animated,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../theme/theme";
import { t } from "../i18n";
import { Button } from "../components/ui";

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login({ navigation }) {
  const { colors, mode } = useTheme();
  const fade = useRef(new Animated.Value(0)).current;

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({ email: "", pass: "" });

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 350, useNativeDriver: true }).start();
  }, [fade]);

  function validate() {
    const next = { email: "", pass: "" };
    if (!emailRx.test(email)) next.email = t("login.email") + " inválido";
    if ((pass || "").length < 4) next.pass = t("login.hint");
    setErrors(next);
    return !next.email && !next.pass;
  }

  function submit() {
    if (!validate()) return;
    // TODO: integrar auth
    // sucesso -> navega ou feedback
  }

  const inputBase = {
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    color: colors.text,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
          <View style={{ alignSelf: "center", width: "100%", maxWidth: 900, paddingHorizontal: 16 }}>
            <Animated.View style={{ opacity: fade }}>
              {/* Header suave */}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                  borderRadius: 20,
                  padding: 16,
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: colors.text, fontWeight: "900", fontSize: 22 }}>{t("login.title")}</Text>
              </View>

              {/* Form */}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                  borderRadius: 20,
                  padding: 16,
                }}
              >
                {/* EMAIL */}
                <Text style={{ color: colors.text, marginBottom: 6 }}>{t("login.email")}</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  placeholder="nome@escola.com"
                  placeholderTextColor={colors.textMuted}
                  style={inputBase}
                  accessibilityLabel={t("login.email")}
                />
                {errors.email ? (
                  <Text style={{ color: "#ef4444", marginTop: 6 }}>{errors.email}</Text>
                ) : null}

                {/* SENHA */}
                <Text style={{ color: colors.text, marginTop: 12, marginBottom: 6 }}>{t("login.pass")}</Text>
                <View style={[inputBase, { flexDirection: "row", alignItems: "center" }]}>
                  <TextInput
                    value={pass}
                    onChangeText={setPass}
                    secureTextEntry={!showPass}
                    placeholder="••••••"
                    placeholderTextColor={colors.textMuted}
                    style={{ flex: 1, color: colors.text }}
                    accessibilityLabel={t("login.pass")}
                  />
                  <TouchableOpacity onPress={() => setShowPass((v) => !v)} accessibilityRole="button">
                    <Feather
                      name={showPass ? "eye-off" : "eye"}
                      size={18}
                      color={colors.textMuted}
                      accessibilityLabel={showPass ? "Ocultar senha" : "Mostrar senha"}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={{ color: colors.textMuted, marginTop: 6 }}>{t("login.hint")}</Text>
                {errors.pass ? <Text style={{ color: "#ef4444", marginTop: 4 }}>{errors.pass}</Text> : null}

                {/* Ações */}
                <View style={{ alignItems: "flex-end", marginTop: 8 }}>
                  <TouchableOpacity onPress={() => navigation.navigate("Recovery")} accessibilityRole="link">
                    <Text style={{ color: colors.primary }}>{t("login.forgot")}</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 12 }}>
                  <Button label={t("login.cta")} variant="primary" onPress={submit} />
                </View>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
