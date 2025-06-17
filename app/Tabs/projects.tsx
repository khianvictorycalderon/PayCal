import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { generateUniqueID } from "../Utility/unique_ID_generator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundImage from "../Components/BackgroundImage/BackgroundImage";
import Card from "../Components/Card/Card";
import XText from "../Components/XText/XText";
import Button from "../Components/CustomizableButton/CustomizableButton";

const listColor1 = "#eab308";
const listColor2 = "#f59e0b";

interface ListDataProps {
  id: string;
  title: string;
}

const STORAGE_KEY = "@project_list";

export default function Projects() {
  const [projectList, setProjectList] = useState<ListDataProps[]>([]);

  // Load saved projects on mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          setProjectList(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Failed to load projects:", e);
      }
    };
    loadProjects();
  }, []);

  // Save to storage when projectList changes
  useEffect(() => {
    const saveProjects = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(projectList));
      } catch (e) {
        console.error("Failed to save projects:", e);
      }
    };
    saveProjects();
  }, [projectList]);

  const addProject = () => {
    const existingIDs = projectList.map(project => project.id);
    const newID = generateUniqueID(9, existingIDs);

    setProjectList([
      ...projectList,
      {
        id: newID,
        title: "Untitled"
      }
    ]);
  };

const deleteProject = (itemID: string) => {
  Alert.alert(
    "Delete Project",
    "Are you sure you want to delete this project?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setProjectList(prevList => prevList.filter(item => item.id !== itemID));
        }
      }
    ]
  );
};

  return (
    <BackgroundImage ImagePath={require("../../assets/Images/background.jpg")}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingTop: 80,
          gap: 15,
          minHeight: "100%",
        }}
      >
      {projectList.length > 0 ? (
        <>
          <XText>
            Click the project to edit.
          </XText>
          {projectList.map((item, index) => (
            <Pressable onPress={() => Alert.alert("Clicked", `Clicked ${item.title}`)} key={item.id}>
              <Card Styles={{backgroundColor: index % 2 == 0 ? listColor1 : listColor2, margin: 2}}>
                <View style={{display: "flex", flexDirection: "row"}}>
                  <XText variant="project_title" style={{flex: 1}}>{item.title}</XText>
                  <Button margin={0} align="center" color="red" onPress={() => deleteProject(item.id)}>Delete</Button>
                </View>
              </Card>
            </Pressable>
          ))}
        </>
      ) : (
        <XText> You don't have any projects yet.</XText>
      )}
      <Button color="pink" onPress={addProject}>
        Add Project
      </Button>
      {/* Extra spacing so user doesn't accidentally click the home button */}
      <View style={{ marginTop: 250 }} />
      </ScrollView>
    </BackgroundImage>
  );
}