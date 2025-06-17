import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import XText from "../Components/XText/XText";
import Button from "../Components/CustomizableButton/CustomizableButton";
import BackgroundImage from "../Components/BackgroundImage/BackgroundImage";

const listColor1 = "#eab308";
const listColor2 = "#f59e0b";

interface ListDataProps {
  title: string;
  sub: string;
}

const STORAGE_KEY = "@projects_list";

export default function Projects() {
  const [projects, setProjects] = useState<ListDataProps[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setProjects(JSON.parse(storedData));
      }
    } catch (e) {
      console.error("Failed to load projects.", e);
    }
  };

  const saveProjects = async (data: ListDataProps[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save projects.", e);
    }
  };

  const addProject = () => {
    const newProjects = [
      ...projects,
      { title: "Untitled", sub: "No description yet." },
    ];
    setProjects(newProjects);
    saveProjects(newProjects);
  };

  const deleteProject = (index: number) => {
    Alert.alert("Delete Project", "Are you sure you want to delete this?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updated = [...projects];
          updated.splice(index, 1);
          setProjects(updated);
          saveProjects(updated);
        },
      },
    ]);
  };

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
        {projects.length > 0 ? (
          projects.map((item, index) => (
            <Pressable onLongPress={() => deleteProject(index)} key={index}>
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

        <Button color="pink" onPress={addProject}>
          <XText>Add Project</XText>
        </Button>
      </ScrollView>
    </BackgroundImage>
  );
}