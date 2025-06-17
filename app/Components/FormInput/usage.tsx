import React, { useState } from "react";
import { SafeAreaView, Alert, ScrollView } from "react-native";
import { FormInput } from "./FormInput"; // adjust import path as needed

export default function Usage() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | null>();
  const [gender, setGender] = useState<string | null>(null);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: "error" | "success" | "warning";
    message: string;
  } | undefined>({
    type: "error",
    message: "",
  });

  const handleSubmit = () => {
    const errors: string[] = [];

    if (!name.trim()) errors.push("Name");
    if (!age) errors.push("Age");
    if (!gender) errors.push("Gender");
    if (!role) errors.push("Role");

    if (errors.length > 0) {
        setFeedbackMessage({
        type: "error",
        message: `Please fill in the following: ${errors.join(", ")}`,
        });
        return;
    }

    if (age && age < 18) {
        setFeedbackMessage({
            type: "warning",
            message: "Form submitted successfully but you are a minor."
        });
    } else {
        setFeedbackMessage({
            type: "success",
            message: "Form submitted successfully!",
        });
    }

    Alert.alert(
        "Submitted",
        `Name: ${name}\nAge: ${age}\nGender: ${gender}\nRole: ${role}\nHobbies: ${hobbies.join(", ")}`
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <FormInput
          Input={[
            {
              Label: "Name",
              ID: "name",
              Type: "text",
              Value: name,
              OnChange: setName
            },
            {
              Label: "Age",
              ID: "age",
              Type: "number",
              Value: age,
              OnChange: setAge
            },
            {
              Label: "Gender",
              ID: "gender",
              Type: "radio",
              Value: gender,
              OnChange: setGender,
              Options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ],
            },
            {
              Label: "Role",
              ID: "role",
              Type: "select",
              Value: role,
              OnChange: setRole,
              Options: [
                { label: "Student", value: "student" },
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
              ],
            },
            {
              Label: "Hobbies",
              ID: "hobbies",
              Type: "checkbox",
              Value: hobbies,
              OnChange: setHobbies,
              Options: [
                { label: "Reading", value: "reading" },
                { label: "Gaming", value: "gaming" },
                { label: "Cooking", value: "cooking" },
              ],
            },
          ]}
          FeedbackMessage={feedbackMessage}
          SubmitLabel="Submit"
          OnSubmit={handleSubmit}
          Style={{
            TextColor: "#000",
            BackgroundColor: "transparent",
            InputTextColor: "#000",
            InputBackgroundColor: "#f0f0f0",
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}