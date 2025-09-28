// src/screens/Manifesto.js
import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StatusBar,
  Platform,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../theme/theme";
import { t } from "../i18n";
import { Button } from "../components/ui";

export default function Manifesto({ navigation }) {
  const { colors, mode } = useTheme();

  // animação
  const fade = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(ty, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start();
  }, [fade, ty]);

  // helpers de UI
  const Card = ({ style, children }) => (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          borderRadius: 20,
          padding: 16,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  const Bullet = ({ children }) => (
    <View
      style={{ flexDirection: "row", alignItems: "flex-start", marginTop: 6 }}
    >
      <Feather
        name="check-circle"
        size={16}
        color={colors.primary}
        style={{ marginTop: 2, marginRight: 8 }}
      />
      <Text style={{ color: colors.text, lineHeight: 22, flex: 1 }}>
        {children}
      </Text>
    </View>
  );

  // pilares (mantém i18n existente)
  const items = [
    { title: t("home.v1_t"), desc: t("home.v1_d") },
    { title: t("home.v2_t"), desc: t("home.v2_d") },
    { title: t("home.v3_t"), desc: t("home.v3_d") },
    { title: t("home.v4_t"), desc: t("home.v4_d") },
    { title: t("home.v5_t"), desc: t("home.v5_d") },
  ];

  const line = mode === "dark" ? "rgba(255,255,255,0.18)" : "#E2E8F0";
  const badgeBg =
    mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(31,111,235,0.08)";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
      />
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        <View
          style={{
            alignSelf: "center",
            width: "100%",
            maxWidth: 1024,
            paddingHorizontal: 16,
          }}
        >
          <Animated.View
            style={{ opacity: fade, transform: [{ translateY: ty }] }}
          >
            {/* Cabeçalho */}
            <Card style={{ marginBottom: 12 }}>
              <Text
                style={{ color: colors.text, fontWeight: "900", fontSize: 22 }}
              >
                {t("manifesto.title")}
              </Text>
              <Text
                style={{
                  color: colors.textMuted,
                  marginTop: 6,
                  lineHeight: 22,
                }}
              >
                {t("tagline")}
              </Text>
              <Text
                style={{ color: colors.text, marginTop: 10, lineHeight: 22 }}
              >
                {t("manifesto.intro")}{" "}
              </Text>
            </Card>

            {/* Pilares — timeline numerada */}
            <View
              style={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: colors.border,
                overflow: "hidden",
                backgroundColor: colors.card,
              }}
            >
              <View style={{ padding: 16 }}>
                {items.map((it, i) => (
                  <View
                    key={i}
                    style={{ flexDirection: "row", paddingVertical: 10 }}
                  >
                    {/* linha + badge */}
                    <View style={{ width: 28, alignItems: "center" }}>
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          bottom: 0,
                          left: 13,
                          width: 2,
                          backgroundColor: line,
                        }}
                      />
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          backgroundColor: badgeBg,
                          borderWidth: 1,
                          borderColor: line,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: colors.primary,
                            fontWeight: "800",
                            fontSize: 12,
                          }}
                        >
                          {i + 1}
                        </Text>
                      </View>
                    </View>

                    {/* conteúdo */}
                    <View style={{ flex: 1, paddingLeft: 12 }}>
                      <Text
                        style={{
                          color: colors.text,
                          fontWeight: "800",
                          marginBottom: 4,
                        }}
                      >
                        {it.title}
                      </Text>
                      <Text style={{ color: colors.textMuted, lineHeight: 22 }}>
                        {it.desc}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Compromissos — PARÁGRAFO (fluidez) */}
            <Card style={{ marginTop: 12 }}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "900",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                {t("manifesto.commitments_title")}
              </Text>
              <Text style={{ color: colors.text, lineHeight: 22 }}>
                {t("manifesto.commitments_p")}
              </Text>
            </Card>

            {/* Privacidade & dados — BULLETS */}
            <Card style={{ marginTop: 12 }}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "900",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                {t("manifesto.privacy_title")}
              </Text>
              <Bullet>{t("manifesto.privacy_b1")}</Bullet>
              <Bullet>{t("manifesto.privacy_b2")}</Bullet>
              <Bullet>{t("manifesto.privacy_b3")}</Bullet>
              <Bullet>{t("manifesto.privacy_b4")}</Bullet>
            </Card>

            {/* Acessibilidade — BULLETS */}
            <Card style={{ marginTop: 12 }}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "900",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                {t("manifesto.a11y_title")}
              </Text>
              <Bullet>{t("manifesto.a11y_b1")}</Bullet>
              <Bullet>{t("manifesto.a11y_b2")}</Bullet>
              <Bullet>{t("manifesto.a11y_b3")}</Bullet>
              <Bullet>{t("manifesto.a11y_b4")}</Bullet>
            </Card>

            {/* Como medimos impacto — PARÁGRAFO + 2 bullets curtos (equilíbrio) */}
            <Card style={{ marginTop: 12 }}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "900",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                {t("manifesto.impact_title")}
              </Text>
              <Text style={{ color: colors.text, lineHeight: 22 }}>
                {t("manifesto.impact_p")}
              </Text>
              <Bullet>{t("manifesto.impact_b1")}</Bullet>
              <Bullet>{t("manifesto.impact_b2")}</Bullet>
            </Card>

            {/* Tecnologia & confiabilidade — PARÁGRAFO */}
            <Card style={{ marginTop: 12 }}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "900",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                {t("manifesto.tech_title")}
              </Text>
              <Text style={{ color: colors.text, lineHeight: 22 }}>
                {t("manifesto.tech_p")}
              </Text>
            </Card>

            {/* CTA */}
            <View style={{ alignItems: "flex-start", marginTop: 12 }}>
              <Button
                label={t("manifesto.back")}
                variant="ghost"
                onPress={() => navigation.goBack()}
              />
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
