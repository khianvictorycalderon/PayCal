import { Linking, ScrollView, Text, View } from "react-native";

const infoData = [
  {
    title: "PayCal 1.0",
    sub: (
      <Text style={{ color: "#E5E7EB" }}>
        Payment Calculator by {" "}
        <Text
          style={{ color: "#3B82F6", textDecorationLine: "underline" }}
          onPress={() => Linking.openURL("https://khian.netlify.app/")}
        >Khian Victory D. Calderon
        </Text>
        .
      </Text>
    ),
  },
  {
    title: "About",
    sub: "Payment Calculator or PayCal for short, is a an experimental android app that calculates how much a person, specifically freelancers, makes per hour.",
  },
  {
    title: "Why",
    sub: "Payment Calculator is designed for freelancers who are always on the move and can't dedicate a full hour to a task. It solves that problem by letting you calculate your hourly earnings anytime, anywhere — all with just a click of a button.",
  }
];

export default function Credits() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 80, gap: 15, backgroundColor: "#1E293B", height: "100%" }}>
      {infoData.map((item, index) => (
        <View
          key={index}
          style={{
            padding: 16,
            backgroundColor: "#e8a70e",
            borderRadius: 12,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF", marginBottom: 6 }}>
            {item.title}
          </Text>
          {typeof item.sub === "string" ? (
            <Text style={{ color: "#FEF3C7" }}>{item.sub}</Text>
          ) : (
            item.sub
          )}
        </View>
      ))}
    </ScrollView>
  );
}
