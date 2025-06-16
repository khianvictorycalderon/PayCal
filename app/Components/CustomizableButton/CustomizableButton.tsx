import React from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle, GestureResponderEvent } from "react-native";

interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function Button({ style, textStyle, children, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
}
