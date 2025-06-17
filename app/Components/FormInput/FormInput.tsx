import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

type ValidInputTypes = "text" | "number" | "radio" | "checkbox" | "select";

type Option = {
  label: string;
  value: string;
};

type FormField = {
  Label: string;
  ID: string;
  Type: ValidInputTypes;
  Value: any;
  OnChange: (val: any) => void;
  Options?: Option[];
};

type FeedbackType = "error" | "success" | "warning";

type FormInputProps = {
  Input: FormField[];
  SubmitLabel: string;
  OnSubmit: () => void;
  FeedbackMessage?: { type: FeedbackType; message: string };
  Style?: {
    TextColor?: string;
    BackgroundColor?: string;
    InputTextColor?: string;
    InputBackgroundColor?: string;
  };
};

export const FormInput = ({
  Input,
  SubmitLabel,
  OnSubmit,
  FeedbackMessage,
  Style: customStyle = {},
}: FormInputProps) => {
  const textColor = customStyle.TextColor || "#000";
  const bgColor = customStyle.InputBackgroundColor || "#fff";
  const inputTextColor = customStyle.InputTextColor || "#000";

  const [selectModal, setSelectModal] = useState<{
    visible: boolean;
    field?: FormField;
  }>({ visible: false });

  const renderInput = (input: FormField, index: number) => {
    switch (input.Type) {
      case "text":
      case "number":
        return (
          <View key={index} style={styles.field}>
            <Text style={[styles.label, { color: textColor }]}>
              {input.Label}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: bgColor,
                  color: inputTextColor,
                },
              ]}
              value={input.Value}
              keyboardType={input.Type === "number" ? "numeric" : "default"}
              onChangeText={input.OnChange}
              placeholder={input.Label}
              placeholderTextColor="#999"
            />
          </View>
        );

      case "radio":
        return (
          <View key={index} style={styles.field}>
            <Text style={[styles.label, { color: textColor }]}>
              {input.Label}
            </Text>
            {input.Options?.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.option}
                onPress={() => input.OnChange(option.value)}
              >
                <View style={styles.radioCircle}>
                  {input.Value === option.value && (
                    <View style={styles.radioDot} />
                  )}
                </View>
                <Text style={{ color: textColor }}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case "checkbox":
        return (
          <View key={index} style={styles.field}>
            <Text style={[styles.label, { color: textColor }]}>
              {input.Label}
            </Text>
            {input.Options?.map((option, idx) => {
              const selected = input.Value.includes(option.value);
              return (
                <TouchableOpacity
                  key={idx}
                  style={styles.option}
                  onPress={() => {
                    const updated = selected
                      ? input.Value.filter((v: string) => v !== option.value)
                      : [...input.Value, option.value];
                    input.OnChange(updated);
                  }}
                >
                  <View
                    style={[
                      styles.checkboxBox,
                      selected && { backgroundColor: "#007bff" },
                    ]}
                  />
                  <Text style={{ color: textColor }}>{option.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );

      case "select":
        return (
          <View key={index} style={styles.field}>
            <Text style={[styles.label, { color: textColor }]}>
              {input.Label}
            </Text>
            <TouchableOpacity
              style={[styles.input, { backgroundColor: bgColor }]}
              onPress={() => setSelectModal({ visible: true, field: input })}
            >
              <Text style={{ color: input.Value ? inputTextColor : "#999" }}>
                {input.Options?.find((opt) => opt.value === input.Value)
                  ?.label || `Select ${input.Label}`}
              </Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

    const alertTextColors: Record<FeedbackType, string> = {
        error: "#721c24",
        success: "#155724",
        warning: "#856404"
    };

    const alertBackgrounds: Record<FeedbackType, string> = {
        error: "#f8d7da",
        success: "#d4edda",
        warning: "#fff3cd"
    };

    const alertBorders: Record<FeedbackType, string> = {
        error: "#f5c6cb",
        success: "#c3e6cb",
        warning: "#ffeeba"
    };

  return (
    <View style={[styles.container, { backgroundColor: customStyle.BackgroundColor || "#fff" }]}>
      {Input.map((input, idx) => renderInput(input, idx))}

      {FeedbackMessage?.message ? (
        <View
            style={{
            backgroundColor: alertBackgrounds[FeedbackMessage.type],
            padding: 10,
            borderRadius: 8,
            marginBottom: 12,
            borderLeftColor: alertBorders[FeedbackMessage.type],
            alignItems: "center"
            }}
        >
            <Text style={{ color: alertTextColors[FeedbackMessage.type] }}>
                {FeedbackMessage.message}
            </Text>
        </View>
        ) : null}


      <TouchableOpacity style={styles.submitButton} onPress={OnSubmit}>
        <Text style={styles.submitText}>{SubmitLabel}</Text>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={selectModal.visible}
        onRequestClose={() => setSelectModal({ visible: false })}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectModal.field?.Label || "Select"}
            </Text>
            {selectModal.field?.Options?.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.modalItem}
                onPress={() => {
                  selectModal.field?.OnChange(option.value);
                  setSelectModal({ visible: false });
                }}
              >
                <Text
                  style={{
                    fontWeight:
                      selectModal.field?.Value === option.value
                        ? "bold"
                        : "normal",
                    fontSize: 16,
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setSelectModal({ visible: false })}
            >
              <Text style={{ color: "#dc3545", fontWeight: "bold" }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#555",
  },
  checkboxBox: {
    height: 18,
    width: 18,
    borderWidth: 1,
    borderColor: "#555",
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 8,
  },
  modalCancel: {
    marginTop: 16,
    alignItems: "center",
  },
});