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
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../theme/theme";
import { t } from "../i18n";
import { Button } from "../components/ui";

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Recovery({ navigation }) {
  const { colors } = useTheme();
  const fade = useRef(new Animated.Value(0)).current;

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 350, useNativeDriver: true }).start();
  }, [fade]);

  function submit() {
    if (!emailRx.test(email)) {
      setError(t("recovery.email") + " inválido");
      return;
    }
    setError("");
    // TODO: enviar link de recuperação
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
                  {t("recovery.title")}
                </Text>
              </View>

              {/* Card */}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                  borderRadius: 20,
                  padding: 16,
                }}
              >
                <Text style={{ color: colors.text, marginBottom: 6 }}>{t("recovery.email")}</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  placeholder="nome@escola.com"
                  placeholderTextColor={colors.textMuted}
                  style={inputBase}
                  accessibilityLabel={t("recovery.email")}
                />
                {error ? <Text style={{ color: "#ef4444", marginTop: 6 }}>{error}</Text> : null}

                <View style={{ marginTop: 12 }}>
                  <Button label={t("recovery.send")} variant="primary" onPress={submit} />
                </View>

                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <TouchableOpacity onPress={() => navigation.navigate("Login")} accessibilityRole="link">
                    <Text style={{ color: colors.textMuted }}>{t("recovery.back")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
