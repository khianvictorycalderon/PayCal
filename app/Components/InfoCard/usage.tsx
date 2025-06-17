import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import InfoCard from "./InfoCard";

const bg1 = "rgb(68, 170, 34)";
const bg2 = "rgb(149, 42, 166)";
const textColor = "white";
const urlColor = "rgb(17, 0, 255)";

const infoCardData = [
  {
    Title: "About",
    Sub: "App created by: Khian Victory D. Calderon. Website: https://khian.netlify.app. It auto detects URLs.",
    AlignTitle: "center" as const,
    AlignSub: "left" as const,
  },
  {
    Title: "How",
    Sub: "This is the How section",
    AlignTitle: "left" as const,
    AlignSub: "right" as const,
  },
  {
    Title: "Why",
    Sub: "This is the Why section",
    AlignTitle: "center" as const,
    AlignSub: "justify" as const,
  },
];

export default function Usage() {
  return (
    <SafeAreaView>
        <ScrollView style={{padding: 16}}>
            <InfoCard Data={infoCardData} BG_A={bg1} BG_B={bg2} Alternate_BG={true} TextColor={textColor} Gap={16} UrlColor={urlColor}/>
        </ScrollView>
    </SafeAreaView>
  );
}