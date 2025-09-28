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
import { useTheme } from "../theme/theme";
import { t } from "../i18n";
import { Button } from "../components/ui";

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup({ navigation }) {
  const { colors } = useTheme();
  const fade = useRef(new Animated.Value(0)).current;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("student"); // "student" | "teacher"
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", pass: "", confirm: "" });

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 350, useNativeDriver: true }).start();
  }, [fade]);

  function validate() {
    const next = { name: "", email: "", pass: "", confirm: "" };
    if ((name || "").trim().length < 2) next.name = t("signup.name") + " inválido";
    if (!emailRx.test(email)) next.email = t("signup.email") + " inválido";
    if ((pass || "").length < 6) next.pass = t("signup.pass_ph");
    if (confirm !== pass) next.confirm = t("signup.pass_mismatch");
    setErrors(next);
    return !next.name && !next.email && !next.pass && !next.confirm;
  }

  function submit() {
    if (!validate()) return;
    // TODO: integrar cadastro (e persistir 'role' se desejar)
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

  const Pill = ({ active, label, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 14,
        height: 36,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: active ? colors.primary : colors.border,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: active ? "rgba(31,111,235,0.08)" : "transparent",
      }}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
    >
      <Text style={{ color: active ? colors.primary : colors.text }}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
          <View style={{ alignSelf: "center", width: "100%", maxWidth: 900, paddingHorizontal: 16 }}>
            <Animated.View style={{ opacity: fade }}>
              {/* Header */}
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
                <Text style={{ color: colors.text, fontWeight: "900", fontSize: 22 }}>
                  {t("signup.title")}
                </Text>
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
                {/* Name */}
                <Text style={{ color: colors.text, marginBottom: 6 }}>{t("signup.name")}</Text>
                <TextInput
                  value={name}
                  onChangeText={(v) => {
                    setName(v);
                    if (errors.name) setErrors((e) => ({ ...e, name: "" }));
                  }}
                  placeholder={t("signup.name")}
                  placeholderTextColor={colors.textMuted}
                  style={inputBase}
                  accessibilityLabel={t("signup.name")}
                />
                {errors.name ? <Text style={{ color: "#ef4444", marginTop: 6 }}>{errors.name}</Text> : null}

                {/* Email */}
                <Text style={{ color: colors.text, marginTop: 12, marginBottom: 6 }}>{t("signup.email")}</Text>
                <TextInput
                  value={email}
                  onChangeText={(v) => {
                    setEmail(v);
                    if (errors.email) setErrors((e) => ({ ...e, email: "" }));
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  placeholder="nome@escola.com"
                  placeholderTextColor={colors.textMuted}
                  style={inputBase}
                  accessibilityLabel={t("signup.email")}
                />
                {errors.email ? <Text style={{ color: "#ef4444", marginTop: 6 }}>{errors.email}</Text> : null}

                {/* Password */}
                <Text style={{ color: colors.text, marginTop: 12, marginBottom: 6 }}>{t("signup.pass")}</Text>
                <View style={[inputBase, { flexDirection: "row", alignItems: "center" }]}>
                  <TextInput
                    value={pass}
                    onChangeText={(v) => {
                      setPass(v);
                      if (errors.pass) setErrors((e) => ({ ...e, pass: "" }));
                      if (errors.confirm && confirm === v) setErrors((e) => ({ ...e, confirm: "" }));
                    }}
                    secureTextEntry={!showPass}
                    placeholder={t("signup.pass_ph")}
                    placeholderTextColor={colors.textMuted}
                    style={{ flex: 1, color: colors.text }}
                    accessibilityLabel={t("signup.pass")}
                  />
                  <TouchableOpacity onPress={() => setShowPass((v) => !v)} accessibilityRole="button">
                    <Text style={{ color: colors.textMuted }}>{showPass ? "Ocultar" : "Mostrar"}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{ color: colors.textMuted, marginTop: 6 }}>{t("signup.pass_ph")}</Text>
                {errors.pass ? <Text style={{ color: "#ef4444", marginTop: 4 }}>{errors.pass}</Text> : null}

                {/* Confirm Password */}
                <Text style={{ color: colors.text, marginTop: 12, marginBottom: 6 }}>
                  {t("signup.pass_confirm")}
                </Text>
                <View style={[inputBase, { flexDirection: "row", alignItems: "center" }]}>
                  <TextInput
                    value={confirm}
                    onChangeText={(v) => {
                      setConfirm(v);
                      if (errors.confirm) setErrors((e) => ({ ...e, confirm: "" }));
                    }}
                    secureTextEntry={!showConfirm}
                    placeholder={t("signup.pass_confirm")}
                    placeholderTextColor={colors.textMuted}
                    style={{ flex: 1, color: colors.text }}
                    accessibilityLabel={t("signup.pass_confirm")}
                  />
                  <TouchableOpacity onPress={() => setShowConfirm((v) => !v)} accessibilityRole="button">
                    <Text style={{ color: colors.textMuted }}>{showConfirm ? "Ocultar" : "Mostrar"}</Text>
                  </TouchableOpacity>
                </View>
                {errors.confirm ? <Text style={{ color: "#ef4444", marginTop: 6 }}>{errors.confirm}</Text> : null}

                {/* Role */}
                <Text style={{ color: colors.text, marginTop: 12, marginBottom: 6 }}>{t("signup.profile")}</Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <Pill
                    active={role === "student"}
                    label={t("signup.student")}
                    onPress={() => setRole("student")}
                  />
                  <Pill
                    active={role === "teacher"}
                    label={t("signup.teacher")}
                    onPress={() => setRole("teacher")}
                  />
                </View>

                <View style={{ marginTop: 16 }}>
                  <Button label={t("signup.cta")} variant="primary" onPress={submit} />
                </View>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
