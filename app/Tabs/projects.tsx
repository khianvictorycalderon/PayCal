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
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

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

  const importProjects = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const fileUri = result.assets[0].uri;
      const fileContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const cleaned = fileContent.replace(/^\uFEFF/, "").trim(); // Remove BOM
      const importedProjects = JSON.parse(cleaned);

      if (!Array.isArray(importedProjects)) {
        Alert.alert("Import Failed", "Invalid file format. Expected a list of projects.");
        return;
      }

      // Filter out duplicates by ID
      const existingIDs = new Set(projectList.map((p) => p.id));
      const newProjects = importedProjects.filter((p) => !existingIDs.has(p.id));

      if (newProjects.length === 0) {
        Alert.alert("No New Projects", "All imported projects already exist.");
        return;
      }

      // Merge existing + new
      setProjectList((prevList) => [...prevList, ...newProjects]);
      Alert.alert("Import Successful", `${newProjects.length} new project(s) added.`);
    } catch (err) {
      Alert.alert("Import Error", `Could not import projects: ${err}`);
    }
  };

  const exportProjects = async () => {
    try {
      if (projectList.length === 0) {
        Alert.alert("Export Failed", "There are no projects to export.");
        return;
      }

      const jsonData = JSON.stringify(projectList, null, 2); // Pretty-print with 2 spaces
      const fileUri = FileSystem.documentDirectory + "projects_export.json";

      await FileSystem.writeAsStringAsync(fileUri, jsonData, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (!isSharingAvailable) {
        Alert.alert("Sharing Not Available", "Your device does not support sharing this file.");
        return;
      }

      await Sharing.shareAsync(fileUri, {
        mimeType: "application/json",
        dialogTitle: "Export Your Projects",
        UTI: "public.json", // For iOS
      });
    } catch (error) {
      Alert.alert("Export Error", `Failed to export projects: ${error}`);
    }
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
                gap: 10
              }}
              style={{marginTop: 10, height: "70%"}}
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
          gap: 10
        }}>
          <Button color="pink" onPress={addProject}>
            Add Project
          </Button>
          <Button color="red" onPress={importProjects}>
            Import Projects
          </Button>
          <Button color="green" onPress={exportProjects}>
            Export Projects
          </Button>
        </View>
      </View>
    </BackgroundImage>
  );
}