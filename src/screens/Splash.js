import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";
import { t } from "../i18n";
import { useTheme } from "../theme/theme";
export default function Splash({ navigation }) {
  const { colors } = useTheme();
  useEffect(() => {
    const id = setTimeout(() => navigation.replace("Home"), 900);
    return () => clearTimeout(id);
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../assets/icon.png")}
        style={{ width: 128, height: 128, marginBottom: 16 }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 22, fontWeight: "800", color: colors.text }}>
        {t("app")}
      </Text>
      <Text style={{ color: colors.textMuted, marginTop: 6 }}>
        {t("tagline")}
      </Text>
    </View>
  );
}
