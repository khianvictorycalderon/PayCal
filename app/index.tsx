import { SafeAreaView, StyleSheet } from "react-native";
import {Color1, Color2, Color3, Color4, Color5} from "./colors"; 
import Button from "./Components/CustomizableButton/CustomizableButton";
import XText from "./Components/XText/XText";
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    color: "white"
  }
});

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <XText variant="header">Payment Calculator</XText>
      <Button style={[styles.button, {backgroundColor: Color2}]} textStyle={{color: Color5}}>Choose Project</Button>
      <Button style={[styles.button, {backgroundColor: Color2}]} textStyle={{color: Color5}}>Tutorial</Button>
      <Button style={[styles.button, {backgroundColor: Color2}]} textStyle={{color: Color5}} onPress={() => router.push("/Tabs/credits")}>Credits</Button>
    </SafeAreaView>
  );
}
