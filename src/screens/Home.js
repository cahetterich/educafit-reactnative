import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  Platform,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Button, Card, Tag } from "../components/ui";
import { t, tx } from "../i18n";
import { useTheme } from "../theme/theme";
import { RADIUS } from "../theme/tokens";

/* HERO — responsivo */
function HeroPro({ navigation }) {
  const { colors, mode } = useTheme();
  const { width } = useWindowDimensions();
  const twoCols = width >= 768;

  return (
    <View style={{ marginBottom: 12 }}>
      <LinearGradient
        colors={
          mode === "dark" ? ["#0B1220", "#0B122000"] : ["#EAF2FF", "#FFFFFF"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 16,
        }}
      >
        <View
          style={{
            flexDirection: twoCols ? "row" : "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Texto + CTAs */}
          <View style={{ flex: 1 }}>
            <View
              style={{
                alignSelf: "flex-start",
                backgroundColor:
                  mode === "dark" ? "rgba(255,255,255,0.08)" : "#E0EAFF",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 999,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  color: mode === "dark" ? "#E2E8F0" : "#1F6FEB",
                  fontWeight: "800",
                  fontSize: 12,
                }}
              >
                {t("home.badge_beta")}
              </Text>
            </View>

            <Text
              style={{ fontSize: 24, fontWeight: "900", color: colors.text }}
            >
              {t("app")}
            </Text>
            <Text
              style={{ color: colors.textMuted, marginTop: 6, lineHeight: 22 }}
            >
              {t("tagline")}
            </Text>

            <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
              <Button
                label={t("home.hero_login")}
                onPress={() => navigation.navigate("Login")}
                variant="primary"
                accessibilityLabel="Entrar"
              />
              <Button
                label={t("home.hero_signup")}
                variant="ghost"
                onPress={() => navigation.navigate("Signup")}
                accessibilityLabel="Criar conta"
              />
            </View>
          </View>

          {/* Visual decorativo com a marca */}
          <View
            style={{
              width: twoCols ? 220 : 160,
              height: twoCols ? 220 : 160,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: twoCols ? "auto" : "center",
            }}
          >
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: 999,
                backgroundColor:
                  mode === "dark" ? "rgba(255,255,255,0.04)" : "#F1F5F9",
                borderWidth: 1,
                borderColor: colors.border,
                transform: [{ scale: 1.02 }],
              }}
            />
            <Image
              source={require("../../assets/icon.png")}
              style={{ width: twoCols ? 110 : 88, height: twoCols ? 110 : 88 }}
              resizeMode="contain"
              accessibilityIgnoresInvertColors
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

/*PLANOS — cards responsivos (1/2/3 colunas)*/
function PlanCard({
  title,
  bullets,
  cta,
  subtitle,
  highlight = false,
  tone = "blue",
  onPress,
  style,
}) {
  const { colors, mode } = useTheme();
  const accent = tone === "orange" ? "#F97316" : colors.primary;

  const [planName, planPrice] = String(title)
    .split("•")
    .map((s) => s?.trim());
  const items = String(bullets)
    .split("•")
    .map((s) => s.trim())
    .filter(Boolean);

  const CardBox = ({ children }) => (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: highlight ? accent : colors.border,
          borderRadius: 20,
          padding: 16,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  const CTA = () =>
    highlight ? (
      <TouchableOpacity
        onPress={onPress}
        accessible
        accessibilityRole="button"
        accessibilityLabel={cta}
        style={{ borderRadius: RADIUS.xl, overflow: "hidden", marginTop: 6 }}
      >
        <LinearGradient
          colors={["#FB923C", "#F97316"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: "800" }}>{cta}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    ) : (
      <Button
        label={cta}
        onPress={onPress}
        style={{ marginTop: 6, backgroundColor: accent }}
      />
    );

  return (
    <CardBox>
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: "900", color: colors.text }}>
            {planName || title}
          </Text>
          {planPrice ? (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "900",
                color: accent,
                marginTop: 2,
              }}
            >
              {planPrice}
            </Text>
          ) : null}
        </View>
        {highlight && <Tag tone="info" text={t("home.most_popular")} />}
      </View>

      {/* divider */}
      <View
        style={{
          height: 1,
          backgroundColor: colors.border,
          marginVertical: 10,
          opacity: mode === "dark" ? 0.2 : 1,
        }}
      />

      {/* features */}
      <View style={{ gap: 6 }}>
        {items.map((it, idx) => (
          <Text key={idx} style={{ color: colors.text, fontSize: 14 }}>
            • {it}
          </Text>
        ))}
      </View>

      <CTA />

      {subtitle ? (
        <Text style={{ color: colors.textMuted, marginTop: 10 }}>
          {subtitle}
        </Text>
      ) : null}
    </CardBox>
  );
}

function PlansGrid() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const columns = width >= 1024 ? 3 : width >= 768 ? 2 : 1;

  const [gridW, setGridW] = useState(0);
  const GAP = 12;
  const cardW =
    columns === 1
      ? "100%"
      : Math.floor((gridW - (columns - 1) * GAP) / columns);

  return (
    <View
      onLayout={(e) => setGridW(e.nativeEvent.layout.width)}
      style={{ width: "100%" }}
    >
      <View style={{ marginTop: 10, marginBottom: 6 }}>
        <Text style={{ fontSize: 18, fontWeight: "800", color: colors.text }}>
          {t("home.title")}
        </Text>
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: GAP }}>
        <PlanCard
          title={t("home.basic")}
          bullets={t("home.bullets_basic")}
          cta={t("home.cta_basic")}
          subtitle={t("home.subtitle_basic")}
          tone="blue"
          style={{ width: cardW }}
        />
        <PlanCard
          title={t("home.pro")}
          bullets={t("home.bullets_pro")}
          cta={t("home.cta_pro")}
          subtitle={t("home.subtitle_pro")}
          highlight
          tone="orange"
          style={{ width: cardW }}
        />
        <PlanCard
          title={t("home.schools")}
          bullets={t("home.bullets_schools")}
          cta={t("home.cta_schools")}
          subtitle={t("home.subtitle_schools")}
          tone="blue"
          style={{ width: cardW }}
        />
      </View>
    </View>
  );
}

/* NOSSOS VALORES — Manifesto (timeline)*/
function ValuesManifesto({ navigation }) {
  const { colors, mode } = useTheme();

  const items = [
    { t: t("home.v1_t"), d: t("home.v1_d") },
    { t: t("home.v2_t"), d: t("home.v2_d") },
    { t: t("home.v3_t"), d: t("home.v3_d") },
    { t: t("home.v4_t"), d: t("home.v4_d") },
    { t: t("home.v5_t"), d: t("home.v5_d") },
  ];

  const line = mode === "dark" ? "rgba(255,255,255,0.18)" : "#E2E8F0";
  const badgeBg =
    mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(31,111,235,0.08)";

  return (
    <View style={{ marginTop: 16 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "800",
          color: colors.text,
          marginBottom: 6,
        }}
      >
        {t("home.values")}
      </Text>

      <View
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={["#FFFFFF00", mode === "dark" ? "#0D1424" : "#F8FAFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 16 }}
        >
          {items.map((it, i) => (
            <View key={i} style={{ flexDirection: "row", paddingVertical: 10 }}>
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

              <View style={{ flex: 1, paddingLeft: 12 }}>
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: "800",
                    marginBottom: 4,
                  }}
                >
                  {it.t}
                </Text>
                <Text style={{ color: colors.textMuted, lineHeight: 22 }}>
                  {it.d}
                </Text>
              </View>
            </View>
          ))}

          {/* Link "Saiba mais" */}
          <View style={{ alignItems: "flex-start", marginTop: 6 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Manifesto")}
              accessibilityRole="link"
              accessibilityLabel={tx("home.learn_more", {
                defaultValue: "Saiba mais",
              })}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "800",
                  textDecorationLine: "underline",
                }}
              >
                {tx("home.learn_more", { defaultValue: "Saiba mais" })} →
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

/* DIFERENCIAIS — grade de cards com ícone*/
function FeatureCard({ icon, title, desc, style }) {
  const { colors, mode } = useTheme();
  const halo = mode === "dark" ? "rgba(255,255,255,0.06)" : "#F1F5F9";
  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 16,
          padding: 12,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 999,
          backgroundColor: halo,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        {icon}
      </View>
      <Text style={{ color: colors.text, fontWeight: "800", marginBottom: 4 }}>
        {title}
      </Text>
      <Text style={{ color: colors.textMuted }}>{desc}</Text>
    </View>
  );
}

function FeaturesGrid() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const cols = width >= 1024 ? 3 : width >= 768 ? 2 : 1;
  const [wrapW, setWrapW] = useState(0);
  const GAP = 12;
  const itemW =
    cols === 1 ? "100%" : Math.floor((wrapW - (cols - 1) * GAP) / cols);

  const ic = (el) =>
    React.cloneElement(el, { size: 22, color: colors.primary });

  const features = [
    {
      icon: ic(<Feather name="target" />),
      title: t("home.f_gamification_t"),
      desc: t("home.f_gamification_d"),
    },
    {
      icon: ic(<Feather name="users" />),
      title: t("home.f_tracking_t"),
      desc: t("home.f_tracking_d"),
    },
    {
      icon: ic(<Feather name="bar-chart-2" />),
      title: t("home.f_reports_t"),
      desc: t("home.f_reports_d"),
    },
    {
      icon: ic(<Feather name="zap" />),
      title: t("home.f_onboarding_t"),
      desc: t("home.f_onboarding_d"),
    },
    {
      icon: ic(<Ionicons name="phone-portrait-outline" />),
      title: t("home.f_pwa_t"),
      desc: t("home.f_pwa_d"),
    },
    {
      icon: ic(<MaterialCommunityIcons name="shield-check" />),
      title: t("home.f_privacy_t"),
      desc: t("home.f_privacy_d"),
    },
  ];

  return (
    <View style={{ marginTop: 12 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "800",
          color: colors.text,
          marginBottom: 6,
        }}
      >
        {t("home.diffs")}
      </Text>
      <View
        onLayout={(e) => setWrapW(e.nativeEvent.layout.width)}
        style={{ width: "100%" }}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} style={{ width: itemW }} />
          ))}
        </View>
      </View>
    </View>
  );
}

/* Propósito (editorial) */
function PurposeHome() {
  const { colors, mode } = useTheme();
  const halo = mode === "dark" ? "rgba(255,255,255,0.06)" : "#F1F5F9";

  return (
    <View style={{ marginTop: 12 }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          borderRadius: 20,
          padding: 16,
        }}
      >
        {/* título com chip/ícone */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              backgroundColor: halo,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 8,
            }}
          >
            <Feather name="heart" size={16} color={colors.primary} />
          </View>
          <Text style={{ color: colors.text, fontWeight: "900", fontSize: 18 }}>
            {tx("home.purpose_title", { defaultValue: "Nosso propósito" })}
          </Text>
        </View>

        {/* texto */}
        <Text style={{ color: colors.text, lineHeight: 22 }}>
          {tx("home.purpose_text", {
            defaultValue:
              "Democratizar experiências de movimento com significado pedagógico. Valorizamos pequenas vitórias diárias: atividades curtas, feedback claro e progresso visível. Queremos que cada turma — em qualquer contexto — sinta pertencimento e evolução, sem depender de infraestrutura complexa.",
          })}
        </Text>
      </View>
    </View>
  );
}


/* FOOTER */
function Footer({ navigation }) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const threeCols = width >= 1024;
  const twoCols = width >= 768;

  const LinkItem = ({ label, to }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(to)}
      accessibilityRole="link"
      accessibilityLabel={label}
      style={{ paddingVertical: 6 }}
    >
      <Text style={{ color: colors.textMuted }}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        marginTop: 24,
        borderTopWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
      }}
    >
      <View
        style={{
          alignSelf: "center",
          width: "100%",
          maxWidth: 1024,
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
      >
        <View
          style={{
            flexDirection: threeCols ? "row" : "column",
            gap: 16,
            justifyContent: "space-between",
          }}
        >
          {/* Coluna 1: marca */}
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Image
                source={require("../../assets/icon.png")}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <Text style={{ fontWeight: "800", color: colors.text }}>
                EducaFit
              </Text>
            </View>
            <Text style={{ color: colors.textMuted, lineHeight: 20 }}>
              {t("footer.tagline")}
            </Text>
          </View>

          {/* Coluna 2: navegação */}
          <View style={{ flex: 1, flexDirection: "row", gap: 24 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "800",
                  marginBottom: 6,
                }}
              >
                {t("footer.nav_title")}
              </Text>
              <LinkItem label={t("nav.home")} to="Home" />
              <LinkItem label={t("nav.login")} to="Login" />
              <LinkItem label={t("nav.signup")} to="Signup" />
              <LinkItem label={t("nav.recovery")} to="Recovery" />
            </View>

            {/* Coluna 3: contato / redes */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "800",
                  marginBottom: 6,
                }}
              >
                {t("footer.contact_title")}
              </Text>
              <Text style={{ color: colors.textMuted, marginBottom: 6 }}>
                {t("footer.email")}
              </Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Feather
                  name="globe"
                  size={18}
                  color={colors.textMuted}
                  accessibilityLabel={t("footer.social_website")}
                />
                <Feather
                  name="instagram"
                  size={18}
                  color={colors.textMuted}
                  accessibilityLabel={t("footer.social_instagram")}
                />
                <Feather
                  name="github"
                  size={18}
                  color={colors.textMuted}
                  accessibilityLabel={t("footer.social_github")}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            borderTopWidth: 1,
            borderColor: colors.border,
            paddingTop: 12,
            flexDirection: twoCols ? "row" : "column",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <Text style={{ color: colors.textMuted }}>
            {tx("footer.copyright", { year: new Date().getFullYear() })}
          </Text>
          <Text style={{ color: colors.textMuted }}>
            {t("footer.made_in_br")}
          </Text>
        </View>
      </View>
    </View>
  );
}

/* HOME — Hero + Planos + Valores + Diferenciais + Footer */
export default function Home({ navigation }) {
  const { colors } = useTheme();
  const fade = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fade]);

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
          {/* HERO novo */}
          <Animated.View style={{ opacity: fade }}>
            <HeroPro navigation={navigation} />
          </Animated.View>

          {/* Planos */}
          <PlansGrid />

          {/* Nossos valores (manifesto/timeline) */}
          <ValuesManifesto navigation={navigation} />

          {/* Diferenciais (cards com ícones) */}
          <FeaturesGrid />
          
        {/* Propósito (editorial) */}
        <PurposeHome />
        </View>


        {/* Footer global */}
        <Footer navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
