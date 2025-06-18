import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Linking,
} from "react-native";

interface InfoCardItem {
  Title: string;
  Sub: string;
  AlignTitle?: "left" | "center" | "right" | "justify";
  AlignSub?: "left" | "center" | "right" | "justify";
}

interface InfoCardProps {
  Data: InfoCardItem[];
  BG_A?: string;
  BG_B?: string;
  Alternate_BG?: boolean;
  TextColor?: string;
  Gap?: number;
  UrlColor?: string;
}

function renderTextWithLinks(text: string, textColor: string = "#000", urlColor: string = "blue") {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <Text
          key={index}
          style={{ color: urlColor, textDecorationLine: "underline" }}
          onPress={() => Linking.openURL(part)}
        >
          {part}
        </Text>
      );
    } else {
      // Handle line breaks inside normal text
      const lines = part.split("\n");
      return lines.map((line, lineIndex) => (
        <Text key={`${index}-${lineIndex}`} style={{ color: textColor }}>
          {line}
          {lineIndex !== lines.length - 1 ? "\n" : null}
        </Text>
      ));
    }
  });
}


export default function InfoCard({
  Data,
  BG_A = "#ffffff",
  BG_B = "#f0f0f0",
  Alternate_BG = false,
  TextColor = "#000000",
  UrlColor = "blue",
  Gap = 8,
}: InfoCardProps) {
  return (
    <View>
      {Data.map((item, index) => {
        const backgroundColor = Alternate_BG
          ? index % 2 === 0
            ? BG_A
            : BG_B
          : BG_A;

        const cardStyle: ViewStyle = {
          backgroundColor,
          padding: 16,
          marginBottom: index === Data.length - 1 ? 0 : Gap,
          borderRadius: 8,
        };

        const titleStyle: TextStyle = {
          color: TextColor,
          fontSize: 18,
          fontWeight: "bold",
          textAlign: item.AlignTitle ?? "left",
          marginBottom: 4,
        };

        const subStyle: TextStyle = {
          fontSize: 14,
          textAlign: item.AlignSub ?? "left",
        };

        return (
          <View key={index} style={cardStyle}>
            <Text style={titleStyle}>{item.Title}</Text>
            <Text style={subStyle}>
              {renderTextWithLinks(item.Sub, TextColor, UrlColor)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
