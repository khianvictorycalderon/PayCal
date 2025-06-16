import React from "react";
import { ScrollView, Text } from "react-native";
import XText from "./XText";

export default function Usage() {
  return (
    <ScrollView>
      <XText>This is an XText default</XText>
      <XText variant="caption">This is an XText caption variant</XText>
      <XText variant="header">This is an XText header variant</XText>
      <XText variant="subheader">This is an XText sub-header variant</XText>
      <XText variant="small">This is an XText small variant</XText>
      <XText>You can customize XText depending on your project needs</XText>
    </ScrollView>
  );
}
