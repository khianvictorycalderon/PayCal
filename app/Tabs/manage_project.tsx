import { ScrollView, View } from "react-native";
import { RelativePathString, useLocalSearchParams, useRouter } from "expo-router";
import BackgroundImage from "../Components/BackgroundImage/BackgroundImage";
import { useEffect, useState, useMemo } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormInput from "../Components/FormInput/FormInput";
import Button from "../Components/CustomizableButton/CustomizableButton";
import XText from "../Components/XText/XText";

const STORAGE_KEY = "@project_list";

interface TimeStamp {
  start: string;
  end: string;
}

interface ListDataProps {
  id: string;
  title: string;
  description: string;
  rate: string;
  currency: string;
  timestamp?: TimeStamp[];
}

export default function Manage_Project() {
  const { project_id } = useLocalSearchParams<{ project_id: string }>();
  const router = useRouter();
  const isFocused = useIsFocused();

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useState("");
  const [timestamps, setTimestamps] = useState<TimeStamp[]>([]);
  const [projectList, setProjectList] = useState<ListDataProps[]>([]);

  const [saveFeedback, setSaveFeedback] = useState<{ type: "error"|"success"; message: string }>();

  // Load project data and timestamps
  useEffect(() => {
    const load = async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (!json) return;
      const list: ListDataProps[] = JSON.parse(json);
      setProjectList(list);
      const p = list.find(p => p.id === project_id);
      if (p) {
        setProjectName(p.title);
        setDescription(p.description);
        setRate(p.rate);
        setCurrency(p.currency);
        setTimestamps(p.timestamp || []);
      }
    };

    if (isFocused) {
      load();
    }
  }, [isFocused, project_id]);

  // Reset feedback on input change
  useEffect(() => { setSaveFeedback(undefined); }, [projectName, description, rate, currency]);

  // Format and calculate totals
  const { elapsedTime, totalCost } = useMemo(() => {
    let totalMs = 0;

    timestamps.forEach(({ start, end }) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diff = endDate.getTime() - startDate.getTime();
      if (!isNaN(diff) && diff > 0) {
        totalMs += diff;
      }
    });

    const totalHours = totalMs / (1000 * 60 * 60);
    const totalSeconds = Math.floor(totalMs / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return {
      elapsedTime: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
      totalCost: totalHours * Number(rate || 0),
    };
  }, [timestamps, rate]);


  const handleSave = async () => {
    if (!(projectName && description && rate && currency)) {
      setSaveFeedback({ type: "error", message: "Please fill all fields." });
      return;
    }
    const duplicate = projectList.find(p => p.title === projectName && p.id !== project_id);
    if (duplicate) {
      setSaveFeedback({ type: "error", message: "A project with the same name already exists." });
      return;
    }
    try {
      const updated = projectList.map(p => p.id === project_id
        ? { ...p, title: projectName, description, rate, currency, timestamp: timestamps }
        : p
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaveFeedback({ type: "success", message: "Successfully Saved!" });
      setProjectList(updated);
    } catch (e) {
      setSaveFeedback({ type: "error", message: `Unable to save: ${e}` });
    }
  };

  return (
    <BackgroundImage ImagePath={require("../../assets/Images/background.jpg")}>
      <ScrollView contentContainerStyle={{ paddingTop: 80, gap: 15, height: "100%" }}>
        {/* Project Details Form */}
        <FormInput
          Input={[
            { Label: "Project Name",       ID: "project_name",       Type: "text",   Value: projectName, OnChange: setProjectName },
            { Label: "Project Description",ID: "project_description",Type: "text",   Value: description, OnChange: setDescription },
            { Label: "Rate Per Hour",      ID: "project_rate",       Type: "number", Value: rate, OnChange: setRate },
            { Label: "Currency",           ID: "project_currency",   Type: "text",   Value: currency, OnChange: setCurrency },
          ]}
          SubmitLabel="Save"
          FeedbackMessage={saveFeedback}
          OnSubmit={handleSave}
          Style={{
            BackgroundColor: "transparent",
            TextColor: "white",
            ButtonBackgroundColor: "#eab308"
          }}
        />

        {/* Live Totals */}
        <View style={{ paddingHorizontal: 18 }}>
          <XText variant="info_data" style={{ marginBottom: 10 }}>
            {`Elapsed Time: ${elapsedTime}\nTotal Cost: ${totalCost.toFixed(2)} ${currency || ""}`}
          </XText>
          <Button 
            color="green" 
            onPress={() => router.push(`Tabs/timer?project_id=${project_id}` as RelativePathString)}
          >
            Timer
          </Button>
        </View>
      </ScrollView>
    </BackgroundImage>
  );
}
