import { Alert, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import BackgroundImage from "../Components/BackgroundImage/BackgroundImage";
import { useEffect } from "react";

export default function Manage_Project() {
    const { project_id } = useLocalSearchParams();

    useEffect(() => {
        Alert.alert("Clicked", `You have clicked ${project_id}`);
    }, [project_id]);

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
                {/* Your UI goes here */}
            </ScrollView>
        </BackgroundImage>
    );
}
