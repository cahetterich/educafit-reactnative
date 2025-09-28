import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useTheme } from "../theme/theme";
import { RADIUS } from "../theme/tokens";
let LinearGradient = null;
try {
  LinearGradient = require("expo-linear-gradient").LinearGradient;
} catch (e) {}
export const Button = ({
  label,
  onPress,
  variant = "primary",
  size = "md",
  style,
  disabled,
  accessibilityLabel,
}) => {
  const { colors } = useTheme();
  const paddings = {
    sm: { py: 8, px: 12, fs: 13 },
    md: { py: 12, px: 16, fs: 14 },
    lg: { py: 14, px: 18, fs: 16 },
  }[size];
  const baseStyle = {
    borderRadius: RADIUS.xl,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: paddings.py,
    paddingHorizontal: paddings.px,
    minHeight: 44,
  };
  const map = {
    primary: { bg: colors.primary, fg: "#FFF", border: null },
    accent: { bg: colors.accent, fg: "#FFF", border: null },
    outline: { bg: "transparent", fg: colors.text, border: colors.border },
    subtle: { bg: "#F1F5F9", fg: colors.text, border: "transparent" },
    ghost: { bg: "transparent", fg: colors.text, border: null },
  };
  const cfg = map[variant] || map.primary;
  const withGradient = variant === "primary" && LinearGradient;
  const Content = (
    <Text style={{ color: cfg.fg, fontWeight: "700", fontSize: paddings.fs }}>
      {label}
    </Text>
  );
  if (withGradient) {
    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || label}
        disabled={disabled}
        onPress={onPress}
        style={[
          { borderRadius: RADIUS.xl, overflow: "hidden" },
          style,
          disabled && { opacity: 0.6 },
        ]}
      >
        <LinearGradient
          colors={colors.gradientPrimary || ["#0C3A74", "#1F6FEB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[baseStyle]}
        >
          {Content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      disabled={disabled}
      onPress={onPress}
      style={[
        baseStyle,
        {
          backgroundColor: cfg.bg,
          borderWidth: cfg.border ? 1 : 0,
          borderColor: cfg.border || "transparent",
        },
        style,
        disabled && { opacity: 0.6 },
      ]}
    >
      {Content}
    </TouchableOpacity>
  );
};
export const Input = ({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
  accessibilityLabel,
}) => {
  const { colors } = useTheme();
  return (
    <View style={{ marginBottom: 12 }}>
      {label ? (
        <Text style={{ color: colors.text, marginBottom: 6, fontSize: 14 }}>
          {label}
        </Text>
      ) : null}
      <TextInput
        accessibilityLabel={accessibilityLabel || label || placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={colors.textMuted}
        style={{
          backgroundColor: "#FFF",
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: RADIUS.xl,
          paddingHorizontal: 12,
          paddingVertical: Platform.select({ ios: 12, android: 10, web: 12 }),
          color: colors.text,
          minHeight: 44,
        }}
      />
    </View>
  );
};
export const Card = ({ title, children, footer, style }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 20,
          padding: 16,
        },
        style,
      ]}
    >
      {title ? (
        <Text
          style={{ fontWeight: "700", color: colors.text, marginBottom: 8 }}
        >
          {title}
        </Text>
      ) : null}
      {children}
      {footer ? (
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: colors.border,
            marginTop: 12,
            paddingTop: 12,
          }}
        >
          {footer}
        </View>
      ) : null}
    </View>
  );
};
export const Tag = ({ tone = "info", text }) => {
  const map = {
    info: ["#E0EAFF", "#1F6FEB"],
    success: ["#D1FAE5", "#065F46"],
    warning: ["#FEF3C7", "#92400E"],
    error: ["#FEE2E2", "#991B1B"],
  };
  const [bg, fg] = map[tone] || map.info;
  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: bg,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
      }}
    >
      <Text style={{ color: fg, fontSize: 12, fontWeight: "700" }}>{text}</Text>
    </View>
  );
};
export const Progress = ({ value = 0 }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: 8,
        backgroundColor: "#E5E7EB",
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          backgroundColor: colors.primary,
          height: "100%",
        }}
      />
    </View>
  );
};
