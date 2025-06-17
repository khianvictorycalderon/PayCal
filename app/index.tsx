import { RelativePathString, useRouter } from "expo-router";
import { View } from "react-native";
import BackgroundImage from "./Components/BackgroundImage/BackgroundImage";
import XText from "./Components/XText/XText";
import Button from "./Components/CustomizableButton/CustomizableButton"; // Uses your custom Button

const bgImagePath = require("../assets/Images/background.jpg");
const title = "PayCal";

// Define the buttons array and assert literal types directly
const buttons = [
  {
    title: "Choose Project",
    path: "Tabs/projects",
    color: "yellow",
  },
  {
    title: "Credits",
    path: "Tabs/credits",
    color: "amber",
  },
] as const; // <== This is key to lock the color values as literal strings

export default function Index() {
  const router = useRouter();

  return (
    <BackgroundImage ImagePath={bgImagePath}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <XText
          variant="header"
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 30,
          }}
        >
          {title}
        </XText>

        <View style={{ width: "100%", gap: 15 }}>
          {buttons.map((btn, index) => (
            <Button
              key={index}
              color={btn.color}
              align="full"
              margin={5}
              onPress={() => router.push(btn.path as RelativePathString)}
            >
              {btn.title}
            </Button>
          ))}
        </View>
      </View>
    </BackgroundImage>
  );
}
