import React, { useEffect, useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { RelativePathString, useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import generateUniqueID from "../Utility/unique_ID_generator";
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
  const router = useRouter();

  // Load saved projects on mount
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const loadProjects = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
          if (jsonValue != null) {
            setProjectList(JSON.parse(jsonValue));
          }
        } catch (e) {
          Alert.alert("Load Failed", `Unable to load projects: ${e}`);
        }
      };
      loadProjects();
    }
  }, [isFocused]);

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
  const currentItem = projectList.find(item => item.id === itemID);
  const projectTitle = currentItem?.title || "this project";

  Alert.alert(
    "Delete Project",
    `Are you sure you want to delete project "${projectTitle}" ?`,
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
      <View style={{ flex: 1 }}>
        {projectList.length > 0 && (
          <>
            <XText style={{ paddingHorizontal: 20, paddingTop: 80, textAlign: "center" }}>
              Click and hold a project to drag.
            </XText>
            <XText style={{ paddingHorizontal: 20, textAlign: "center" }}>
              Tap to edit.
            </XText>
          </>
        )}

        <View style={{ flex: 1, paddingBottom: 80 }}>
          {projectList.length === 0 ? (
            <View style={{ padding: 20, paddingTop: 80 }}>
              <XText>You don't have any projects yet.</XText>
            </View>
          ) : (
            <DraggableFlatList<ListDataProps>
              data={projectList}
              keyExtractor={(item) => item.id}
              onDragEnd={({ data }) => setProjectList(data)}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingTop: 10,
                paddingBottom: 20,
                gap: 10
              }}
              renderItem={({ item, drag, isActive }: RenderItemParams<ListDataProps>) => {
                const itemIndex = projectList.findIndex((p) => p.id === item.id);

                return (
                  <Pressable
                    onPress={() =>
                      router.push(
                        `Tabs/manage_project?project_id=${item.id}` as RelativePathString
                      )
                    }
                    onLongPress={drag}
                    disabled={isActive}
                  >
                    <Card
                      Styles={{
                        backgroundColor: itemIndex % 2 === 0 ? listColor1 : listColor2,
                        margin: 2,
                        opacity: isActive ? 0.8 : 1,
                      }}
                    >
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <XText variant="project_title" style={{ flex: 1 }}>
                          {item.title}
                        </XText>
                        <Button
                          margin={0}
                          align="center"
                          color="red"
                          onPress={() => deleteProject(item.id)}
                        >
                          Delete
                        </Button>
                      </View>
                    </Card>
                  </Pressable>
                );
              }}
            />
          )}
        </View>

        {/* Floating Add Button */}
        <View style={{
          position: "absolute",
          bottom: 100,
          left: 10,
          right: 10,
        }}>
          <Button color="pink" onPress={addProject}>
            Add Project
          </Button>
        </View>
      </View>
    </BackgroundImage>
  );
}