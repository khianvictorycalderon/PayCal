import { Alert, ScrollView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import BackgroundImage from "../Components/BackgroundImage/BackgroundImage";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormInput from "../Components/FormInput/FormInput";
import Button from "../Components/CustomizableButton/CustomizableButton";

const STORAGE_KEY = "@project_list";

interface ListDataProps {
  id: string;
  title: string;
  description: string;
  rate: string;
  currency: string;
}

export default function Manage_Project() {
  const { project_id } = useLocalSearchParams<{ project_id: string }>();

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useState("");
  const [saveProjectFeedback, setSaveProjectFeedback] = useState<
    { type: "error" | "warning" | "success"; message: string } | undefined
  >();
  const [projectList, setProjectList] = useState<ListDataProps[]>([]);

  // Load project list and current project title
  useEffect(() => {
    const loadProjectData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          const parsed: ListDataProps[] = JSON.parse(jsonValue);
          setProjectList(parsed);
          const current = parsed.find((p) => p.id === project_id);
          if (current) {
            setProjectName(current.title);
            setDescription(current.description);
            setRate(current.rate);
            setCurrency(current.currency);
          }
        }
      } catch (e) {
        console.error("Failed to load project data:", e);
      }
    };

    loadProjectData();
  }, [project_id]);

  // Clear feedback on any input change
  useEffect(() => {
    setSaveProjectFeedback(undefined);
  }, [projectName, description, rate, currency]);

  const handleSave = async () => {
    if (!projectName || !description || !rate || !currency) {
      setSaveProjectFeedback({
        type: "error",
        message: "Please fill all fields.",
      });
      return;
    }

    const isDuplicate = projectList.some(
      (p) => p.title === projectName && p.id !== project_id
    );

    if (isDuplicate) {
      setSaveProjectFeedback({
        type: "error",
        message: "A project with the same name already exists.",
      });
      return;
    }

    try {
      const updatedList = projectList.map((p) =>
        p.id === project_id
          ? {
              ...p,
              title: projectName,
              description,
              rate,
              currency,
            }
          : p
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      setSaveProjectFeedback({
        type: "success",
        message: "Successfully Saved!",
      });
    } catch (e) {
      setSaveProjectFeedback({
        type: "error",
        message: `Unable to save: ${e}`,
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
            {
              Label: "Project Description",
              ID: "project_description",
              Type: "text",
              Value: description,
              OnChange: setDescription,
            },
            {
              Label: "Rate Per Hour",
              ID: "project_rate",
              Type: "number",
              Value: rate,
              OnChange: setRate,
            },
            {
              Label: "Currency",
              ID: "project_currency",
              Type: "text",
              Value: currency,
              OnChange: setCurrency,
            },
          ]}
          SubmitLabel="Save"
          FeedbackMessage={saveProjectFeedback}
          OnSubmit={handleSave}
          Style={{
            BackgroundColor: "transparent",
            TextColor: "white",
            ButtonBackgroundColor: "#eab308"
          }}
        />
        <View style={{paddingHorizontal: 18}}>
          <Button color="green">Timer</Button>
        </View>
      </ScrollView>
    </BackgroundImage>
  );
}