import { Alert, ScrollView } from "react-native";
import { RelativePathString, useLocalSearchParams, useRouter } from "expo-router";
import BackgroundImage from "../Components/BackgroundImage/BackgroundImage";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormInput from "../Components/FormInput/FormInput";

const STORAGE_KEY = "@project_list";

interface ListDataProps {
  id: string;
  title: string;
}

export default function Manage_Project() {
  const { project_id } = useLocalSearchParams<{ project_id: string }>();
  const router = useRouter();

  const [projectName, setProjectName] = useState("");
  const [saveProjectFeedback, setSaveProjectFeedback] = useState<{type: "error" | "warning" | "success", message: string} | undefined>();
  const [projectList, setProjectList] = useState<ListDataProps[]>([]);

  // Load project list and current project title
  useEffect(() => {
    const loadProjectData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          const parsed: ListDataProps[] = JSON.parse(jsonValue);
          setProjectList(parsed);
          const current = parsed.find(p => p.id === project_id);
          if (current) {
            setProjectName(current.title);
          }
        }
      } catch (e) {
        console.error("Failed to load project data:", e);
      }
    };

    loadProjectData();
  }, [project_id]);

  // Remove feedback on any input change
  useEffect(() => {
    setSaveProjectFeedback(undefined);
  },[projectName]);

  const handleSave = async () => {

    if(!projectName) {
        setSaveProjectFeedback({
            type: "error",
            message: "Please fill all fields."
        });
        return;
    }

    // Check for duplicate project name (excluding the current one)
    const isDuplicate = projectList.some(
        p => p.title === projectName && p.id !== project_id
    );

    if (isDuplicate) {
        setSaveProjectFeedback({
        type: "error",
        message: "A project with the same name already exists."
        });
        return;
    }

    try {
      const updatedList = projectList.map(p =>
        p.id === project_id ? { ...p, title: projectName } : p
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      setSaveProjectFeedback({
        type: "success",
        message: "Successfully Saved!"
      });
    } catch (e) {
      setSaveProjectFeedback({
        type: "error",
        message: `Unable to save: ${e}`
      });
    }
  };

  return (
    <BackgroundImage ImagePath={require("../../assets/Images/background.jpg")}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 80,
          gap: 15,
          minHeight: "100%",
        }}
      >
        <FormInput
          Input={[
            {
              Label: "Project Name",
              ID: "project_name",
              Type: "text",
              Value: projectName,
              OnChange: setProjectName,
            },
          ]}
          SubmitLabel="Save"
          FeedbackMessage={saveProjectFeedback}
          OnSubmit={handleSave}
          Style={{
            BackgroundColor: "transparent",
          }}
        />
      </ScrollView>
    </BackgroundImage>
  );
}