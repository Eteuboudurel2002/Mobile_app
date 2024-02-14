import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import i18next from "./languages/i18n";
import { useTranslation } from "react-i18next";
import { Button } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import CountryFlag from "react-native-country-flag";
const LangOptions = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "Pidjin", value: "cm" },
];
export default function App() {
  //test
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(null);

  /**
   *
   * @param {string} lang
   * Change user prefered language
   */
  const changeLang = async (lang) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
    // Store the prefered language locally
    try {
      await AsyncStorage.setItem("i2hm-lang", lang);
    } catch (e) {
      // saving error
    }
  };
  const PreferedLangComponent = () => {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {" "}
          {t("WelcomeText")}
        </Text>
        <View style={{ marginBottom: 50 }} />
        <Icon.Button name="language" backgroundColor="#4A99E9">
          <Text style={{ color: "white", fontSize: 20, margin: 10 }}>
            {t("ChooseLang")}
          </Text>
        </Icon.Button>
        <View style={{ marginBottom: 50 }} />
        {LangOptions.map((option, index) => (
          <>
            <Icon.Button
              key={option.value}
              backgroundColor={
                selectedLang === option.value ? "#4A99E9" : "#eee"
              }
              onPress={() => changeLang(option.value)}
            >
              <CountryFlag
                isoCode={option.value === "en" ? "us" : option.value}
                size={25}
              />
              <Text
                style={{
                  color: selectedLang === option.value ? "white" : "black",
                  fontSize: 20,
                  margin: 10,
                  width: 150,
                }}
              >
                {option.label}
              </Text>
            </Icon.Button>
            <View style={{ marginBottom: 10 }} />
          </>
        ))}
        <StatusBar style="auto" />
      </View>
    );
  };
  const QuestionnaireComponent = () => {
    return (
      <View style={styles.container}>
        <Text>{t("QuestionnairePage")}</Text>
        <Button title="Back" onPress={() => setSelectedLang(null)} />
      </View>
    );
  };
  return selectedLang ? QuestionnaireComponent() : PreferedLangComponent();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
