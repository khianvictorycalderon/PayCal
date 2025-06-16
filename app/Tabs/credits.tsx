import { SafeAreaView, StyleSheet, Linking, Alert, ScrollView, View } from "react-native";
import {Color1, Color2, Color3, Color4, Color5} from "../colors"; 
import Card from "../Components/Card/Card";
import XText from "../Components/XText/XText";

export default function Credits() {

  const handleOpenURL = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <XText children=" " /> {/* Spacing, like <br/> */}
        <XText children=" " /> {/* Spacing, like <br/> */}
        <Card center>
            <XText variant="header">
                PayCal
            </XText>
            <XText variant="subheader">
                (Payment Calculator V1.0)
            </XText>
            <XText children=" " /> {/* Spacing, like <br/> */}
            <XText>
                Developed by{" "}
                <XText
                    variant="url"
                    onPress={() => handleOpenURL("https://khian.netlify.app/")}
                >
                    Khian Victory D. Calderon
                </XText>
            </XText>
        </Card>
        <Card>
            <XText variant="subtitle">
                Application
            </XText>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
