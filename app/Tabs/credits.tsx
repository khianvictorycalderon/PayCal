import { ScrollView } from "react-native";
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
    Sub: "PayCal (short for Payment Calculator) is an experimental Android app designed for individuals with irregular or unpredictable working hours — especially freelancers and project-based workers — who want a simple way to track their time and earnings.",
    AlignTitle: "center" as const,
    AlignSub: "justify" as const,
  },
  {
    Title: "Why it was created",
    Sub: "PayCal was created to help people who don't follow a strict 9-to-5 schedule. Whether you work in short bursts or switch between multiple projects in a day, PayCal lets you easily track how long you worked and how much you’ve earned — anytime, anywhere.",
    AlignTitle: "center" as const,
    AlignSub: "justify" as const,
  },
  {
    Title: "Personal Motivation",
    Sub: "I originally built PayCal for myself. As someone who works on multiple freelance and academic projects, I needed a tool that could help me monitor how much time I was really spending and how it translated to earnings. After realizing others might benefit from it too, I decided to share it publicly.",
    AlignTitle: "center" as const,
    AlignSub: "justify" as const,
  },
  {
    Title: "Features",
    Sub: 
      "- Smart timer that persists even if the app is closed\n" +
      "- Automatically calculates total hours worked\n" +
      "- Computes total earnings based on your hourly rate\n" +
      "- Supports multiple projects with individual timers\n" +
      "- Timestamp history for transparency and review\n" +
      "- Data stored locally for privacy and offline use\n" +
      "- Clean and user-friendly interface with responsive design",
    AlignTitle: "center" as const,
    AlignSub: "left" as const,
  },
  {
    Title: "Changelogs",
    Sub: 
      "1.0 - Released to the public (Initial version)\n",
    AlignTitle: "center" as const,
    AlignSub: "justify" as const,
  }
];

export default function Credits() {
  return (
    <BackgroundImage ImagePath={require("../../assets/Images/background.jpg")}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          gap: 15
        }}
        style={{
          marginTop: 80,
          maxHeight: "80%"
        }}
      >
      <InfoCard Data={infoCardData} BG_A={bg1} BG_B={bg2} Alternate_BG={true} TextColor={textColor} Gap={16} UrlColor={urlColor}/>
      </ScrollView>
    </BackgroundImage>
  );
}
