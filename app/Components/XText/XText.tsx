import React from 'react';
import {
  StyleProp,
  Text,
  TextProps,
  TextStyle
} from 'react-native';

//
// === Customizable Part ===
// You can freely edit the variants and their styles below
//
type Variant = "default" | "header" | "project_title" | "project_delete" | "url";

const variantStyles: Record<Variant, TextStyle> = {
  default: { fontSize: 18, color: "white", alignSelf: "center" },
  project_title: { fontSize: 18, color: "white", alignSelf: "center" },
  project_delete: { fontSize: 18, color: "white", alignSelf: "center" },
  header: { fontSize: 24, color: "white", fontWeight: "bold" },
  url: { color: "blue", textDecorationLine: "underline"}
};
//
// === End of Customizable Part ===
//


// Internal types and logic (usually no need to change this)
interface XTextProps extends TextProps {
  variant?: Variant;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

// Base styling applied to all variants
const baseStyle: TextStyle = {
  fontFamily: 'Segoe UI',
  color: '#222',
};

export default function XText({
  variant = 'default',
  style,
  children,
  ...props
}: XTextProps) {
  return (
    <Text style={[baseStyle, variantStyles[variant], style]} {...props}>
      {children}
    </Text>
  );
}
