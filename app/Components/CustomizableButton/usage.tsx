import { SafeAreaView } from "react-native";
import Button from "./CustomizableButton";

export default function Usage() {
    return (
        <SafeAreaView>
            <Button
                style={{ backgroundColor: "rgb(0, 119, 255)", padding: 10, borderRadius: 8, marginTop: 12, marginLeft: 12, marginRight: 12 }}
                textStyle={{ color: "white", fontWeight: "bold", textAlign: "center" }}
                onPress={() => alert("Button 1 clicked!")}
            >Button 1</Button>
            <Button
                style={{ backgroundColor: "rgb(36, 35, 35)", padding: 10, alignSelf: "center", borderRadius: 8, marginTop: 12, marginLeft: 12, marginRight: 12 }}
                textStyle={{ color: "white", fontWeight: "bold", textAlign: "center" }}
                onPress={() => alert("BUtton 2 clicked!")}
            >Button 2</Button>
        </SafeAreaView>
    )
}