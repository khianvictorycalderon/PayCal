import { useEffect, useState, useRef } from "react";
import { View, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import BackgroundImage from "../Components/BackgroundImage/BackgroundImage";
import XText from "../Components/XText/XText";
import Button from "../Components/CustomizableButton/CustomizableButton";
import Card from "../Components/Card/Card";

const STORAGE_KEY = "@project_list";
const ACTIVE_TIMER_KEY = "ACTIVE_TIMER_PROJECT_ID";
const START_TIME_KEY = "ACTIVE_TIMER_START";

interface TimeStamp {
  start: string;
  end: string;
}

export default function Timer() {
  const { project_id } = useLocalSearchParams<{ project_id: string }>();

  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [timestampList, setTimestampList] = useState<TimeStamp[]>([]);
  const [projectName, setProjectName] = useState("");
  const [activeProjectName, setActiveProjectName] = useState("");
  const intervalRef = useRef<number | null>(null);

  const formatTime = (ms: number) => {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const startInterval = (start: Date) => {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      setElapsedTime(formatTime(Date.now() - start.getTime()));
    }, 1000) as any as number;
  };

  const stopInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const load = async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const list = JSON.parse(json);
        const project = list.find((p: any) => p.id === project_id);
        if (project) {
          setProjectName(project.title);
          if (project.timestamp) setTimestampList(project.timestamp);
        }

        const active = await AsyncStorage.getItem(ACTIVE_TIMER_KEY);
        const activeStart = await AsyncStorage.getItem(START_TIME_KEY);

        if (activeStart && active) {
          const start = new Date(activeStart);

          const activeProject = list.find((p: any) => p.id === active);
          if (activeProject) {
            setActiveProjectName(activeProject.title);
          }

          if (active === project_id) {
            setStartTime(start);
            setIsRunning(true);
            startInterval(start);
          }
        }
      }
    };
    load();
    return () => stopInterval();
  }, [project_id]);

  const handleStartStop = async () => {
    if (!isRunning) {
      const active = await AsyncStorage.getItem(ACTIVE_TIMER_KEY);
      if (active && active !== project_id) {
        Alert.alert("Timer Running", `Unable to start: "${activeProjectName}" is already running.`);
        return;
      }

      const now = new Date();
      setStartTime(now);
      setIsRunning(true);
      startInterval(now);

      await AsyncStorage.setItem(ACTIVE_TIMER_KEY, project_id);
      await AsyncStorage.setItem(START_TIME_KEY, now.toISOString());
      setActiveProjectName(projectName);
    } else {
      const now = new Date();
      if (!startTime) return;

      const newTS: TimeStamp = { start: startTime.toISOString(), end: now.toISOString() };
      const updated = [...timestampList, newTS];

      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const list = JSON.parse(json);
        const updatedList = list.map((p: any) =>
          p.id === project_id ? { ...p, timestamp: updated } : p
        );
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      }

      setTimestampList(updated);
      setIsRunning(false);
      setStartTime(null);
      stopInterval();
      setElapsedTime("00:00:00");

      await AsyncStorage.removeItem(ACTIVE_TIMER_KEY);
      await AsyncStorage.removeItem(START_TIME_KEY);
      setActiveProjectName("");
    }
  };

  const formatDisplayDate = (iso: string) =>
    new Date(iso).toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
  });

  return (
    <BackgroundImage ImagePath={require("../../assets/Images/background.jpg")}>
      <View style={{ marginTop: 140, alignSelf: "center", alignItems: "center" }}>
        <XText variant="timer">{elapsedTime}</XText>
        <Button color={isRunning ? "red" : "yellow"} onPress={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </Button>
      </View>

      <View style={{ alignSelf: "center", marginTop: 60, marginBottom: 20 }}>
        <XText variant="header">Timestamps:</XText>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingLeft: 30, paddingRight: 30 }}
        style={{ maxHeight: "45%" }}
      >
        {timestampList.map((item, i) => (
          <Card key={i} Styles={{ backgroundColor: "#f59e0b", borderRadius: 8 }}>
            <XText variant="timestamp">
              {`Start: ${formatDisplayDate(item.start)}\nEnd: ${formatDisplayDate(item.end)}`}
            </XText>
          </Card>
        ))}
      </ScrollView>
    </BackgroundImage>
  );
}