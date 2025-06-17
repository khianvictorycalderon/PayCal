import React from "react";
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StyleSheet,
  ViewStyle,
} from "react-native";

// Define available color variants
const COLORS = [
  "amber",
  "emerald",
  "red",
  "blue",
  "green",
  "yellow",
  "indigo",
  "purple",
  "pink",
  "gray",
] as const;

type ColorVariant = (typeof COLORS)[number];

type AlignOption = "full" | "left" | "right" | "center";

interface ButtonProps {
  color?: ColorVariant;
  margin?: number;
  align?: AlignOption;
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

// Map Tailwind-like color names to hex codes
const colorMap: Record<ColorVariant, string> = {
  amber: "#f59e0b",
  emerald: "#10b981",
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#22c55e",
  yellow: "#eab308",
  indigo: "#6366f1",
  purple: "#8b5cf6",
  pink: "#ec4899",
  gray: "#6b7280",
};

// Generate dynamic color styles
const generateStyles = () => {
  const colorStyles: Record<ColorVariant, ViewStyle> = {} as any;

  for (const color of COLORS) {
    colorStyles[color] = {
      backgroundColor: colorMap[color],
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
    };
  }

  const styles = StyleSheet.create({
    ...colorStyles,
    text: {
      color: "#fff",
      fontWeight: "bold",
    },
    align_full: {
      alignSelf: "stretch",
    },
    align_left: {
      alignSelf: "flex-start",
    },
    align_right: {
      alignSelf: "flex-end",
    },
    align_center: {
      alignSelf: "center",
    },
  });

  return styles;
};

const styles = generateStyles();

export default function Button({
  color = "amber",
  align = "full",
  children,
  margin,
  onPress,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles[color], styles[`align_${align}` as const], {margin: margin ? margin : 0}]}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}
