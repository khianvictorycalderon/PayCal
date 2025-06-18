import { Linking, ScrollView, View } from "react-native";
import BackgroundImage from "../Components/BackgroundImage/BackgroundImage";
import InfoCard from "../Components/InfoCard/InfoCard";

const bg1 = "#eab308"; // yellow-400
const bg2 = "#f59e0b";  // yellow-500
const textColor = "#FFF"; // Better contrast on yellow
const urlColor = "rgb(17, 0, 255)";

const infoCardData = [
  {
    Title: "PayCal 1.0",
    Sub: "Payment Calculator developed by\nKhian Victory D. Calderon. \n\nVisit website: https://khian.netlify.app.",
    AlignTitle: "center" as const,
    AlignSub: "center" as const,
  },
  {
    Title: "About",
    Sub: "Payment Calculator or PayCal for short, is an experimental Android app that calculates how much a person, specifically freelancers, makes per hour.",
    AlignTitle: "center" as const,
    AlignSub: "justify" as const,
  },
  {
    Title: "How it all started",
    Sub: "Payment Calculator is designed for freelancers who are always on the move and can't dedicate a full hour to a task. It solves that problem by letting you calculate your hourly earnings anytime, anywhere — all with just a click of a button.",
    AlignTitle: "center" as const,
    AlignSub: "justify" as const,
  },
];

export default function Credits() {
  return (
    <BackgroundImage ImagePath={require("../../assets/Images/background.jpg")}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingTop: 80,
          gap: 15,
          height: "100%",
        }}
      >
      <InfoCard Data={infoCardData} BG_A={bg1} BG_B={bg2} Alternate_BG={true} TextColor={textColor} Gap={16} UrlColor={urlColor}/>
      </ScrollView>
    </BackgroundImage>
  );
}
