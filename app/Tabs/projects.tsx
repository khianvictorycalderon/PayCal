// screens/Projects.tsx

import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import XText from "../Components/XText/XText";
import Button from "../Components/CustomizableButton/CustomizableButton";
import BackgroundImage from "../Components/BackgroundImage/BackgroundImage";

const listColor1 = "#eab308";
const listColor2 = "#f59e0b";

interface ListDataProps {
  title: string;
  sub: string;
  action: () => void;
}

const listData: ListDataProps[] = [
  // Example data
  {
    title: "Project 1",
    sub: "This is a sample project description.",
    action: () => alert("Sample Project Clicked"),
  },
  {
    title: "Project 2",
    sub: "This is another project description.",
    action: () => alert("Second Project Clicked"),
  },
];

export default function Projects() {
  return (
    <BackgroundImage ImagePath={require("../../assets/Images/background.jpg")}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingTop: 60,
          gap: 15,
          minHeight: "100%",
        }}
      >
        {listData.length > 0 ? (
          listData.map((item, index) => (
            <Pressable onPress={item.action} key={index}>
              <View
                style={{
                  padding: 16,
                  backgroundColor:
                    index % 2 === 0 ? listColor1 : listColor2,
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 4,
                    color: "#FFF",
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: "#FFF" }}>{item.sub}</Text>
              </View>
            </Pressable>
          ))
        ) : (
          <XText>You don't have projects yet.</XText>
        )}
        <Button>
          <XText>Add Project</XText>
        </Button>
      </ScrollView>
    </BackgroundImage>
  );
}
