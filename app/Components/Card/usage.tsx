import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import Card from "./Card";

export default function Usage() {
  return (
    <SafeAreaView>
        <ScrollView>
            <Card><Text>This a Card 1</Text></Card>
            <Card Styles={{backgroundColor: "rgb(175, 181, 225)"}}><Text>This also another Card</Text></Card>
            <Card Styles={{backgroundColor: "rgb(35, 162, 171)"}}><Text>This also another Card 2</Text></Card>
            <Card Styles={{backgroundColor: "rgb(35, 171, 44)"}}><Text>This also the last card</Text></Card>
        </ScrollView>
    </SafeAreaView>
  );
}