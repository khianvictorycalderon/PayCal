import { Alert, SafeAreaView } from "react-native";
import Button from "./CustomizableButton";

export default function Usage() {
    return (
        <SafeAreaView>
            <Button color="amber" align="left" onPress={() => Alert.alert("Clicked", "You pressed amber button!")}>Amber Button</Button>
            <Button color="emerald" align="right" onPress={() => Alert.alert("Clicked", "You pressed emerald button!")}>Emerald Button</Button>
            <Button color="red" align="center" onPress={() => Alert.alert("Clicked", "You pressed red button!")}>Red Button</Button>
            <Button color="blue" margin={10} onPress={() => Alert.alert("Clicked", "You pressed blue button!")}>Blue Button</Button>
            <Button color="green" onPress={() => Alert.alert("Clicked", "You pressed green button!")}>Green Button</Button>
            <Button color="yellow" onPress={() => Alert.alert("Clicked", "You pressed yellow button!")}>Yellow Button</Button>
            <Button color="indigo" onPress={() => Alert.alert("Clicked", "You pressed indigo button!")}>Indigo Button</Button>
            <Button color="purple" onPress={() => Alert.alert("Clicked", "You pressed purple button!")}>Purple Button</Button>
            <Button color="pink" onPress={() => Alert.alert("Clicked", "You pressed pink button!")}>Pink Button</Button>
            <Button color="gray" onPress={() => Alert.alert("Clicked", "You pressed gray button!")}>Gray Button</Button>
        </SafeAreaView>
    )
}