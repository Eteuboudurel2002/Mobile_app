import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import i18next from "../../languages/i18n";
import { useTranslation } from "react-i18next";
import { Button, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import CountryFlag from "react-native-country-flag";

const LangOptions = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "Pidjin", value: "cm" },
];

export default function HomePage({ navigation }) {
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
  const PreferedLang = () => {
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
              onPress={() => {
                changeLang(option.value);
              }}
            >
              <CountryFlag
                isoCode={option.value === "en" ? "gb" : option.value}
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

  const Questionnaire = () => {
    const RoundedButton = ({ onPress, iconName }) => {
      return (
        <TouchableOpacity
          style={iconName === "male" ? styles.buttonBlue : styles.buttonPink}
          onPress={onPress}
        >
          <View style={styles.iconContainer}>
            <Icon name={iconName} size={24} color="#fff" style={styles.icon} />
          </View>
        </TouchableOpacity>
      );
    };

    const AgeButton = ({ onPress }) => {
      return (
        <TouchableOpacity style={styles.buttonAge} onPress={onPress}>
          <View style={styles.iconContainer}>
            <Text>{"Age"}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    const handleButtonPress = () => {
      // Function to handle button press
      console.log("Button pressed!");
    };
    return (
      <>
        <View style={[styles.container, styles.questionnaireContainer]}>
          <Icon.Button
            name="language"
            backgroundColor="#4A99E9"
            onPress={() => setSelectedLang(null)}
          >
            <CountryFlag
              isoCode={selectedLang === "en" ? "gb" : selectedLang}
              size={15}
            />
          </Icon.Button>
          <View style={styles.buttonSpacer} />
          <Icon.Button
            name="user"
            backgroundColor="#4A99E9"
            onPress={() => navigation.navigate("Login")}
          ></Icon.Button>
        </View>
        <View style={styles.qcontainer}>
          <Text style={styles.question}>{t("Sex")}</Text>
          <View style={styles.answerContainer}>
            <RoundedButton iconName={"male"} onPress={handleButtonPress} />
            <RoundedButton iconName={"female"} onPress={handleButtonPress} />
          </View>
          <View style={styles.answerContainer}>
            <Text style={styles.buttonLabel}>{"Male"}</Text>
            <Text style={styles.buttonLabel}>{"Female"}</Text>
          </View>
          <Text style={styles.question}>{t("Age")}</Text>
          <View style={styles.answerContainer}>
            <AgeButton onPress={handleButtonPress} />
            <AgeButton onPress={handleButtonPress} />
          </View>
          <View style={styles.answerContainer}>
            <AgeButton onPress={handleButtonPress} />
            <AgeButton onPress={handleButtonPress} />
          </View>
          <Button
            title="Next"
            //onPress={setCurrentPage(CurrentPage + 1)}
          />
          <StatusBar style="auto" />
        </View>
      </>
    );
  };
  return selectedLang ? Questionnaire() : PreferedLang();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qcontainer: {
    flex: 1,
    alignItems: "flex-start",
    padding: 30,
    justifyContent: "center",
  },
  questionnaireContainer: {
    position: "absolute", // Pour placer les boutons en haut à droite
    top: 0,
    right: 0,
    flexDirection: "row", // Pour aligner les boutons horizontalement
    marginRight: 20, // Marge à droite pour l'espacement entre les boutons et le bord de l'écran
    marginTop: 20, // Marge en haut pour l'espacement par rapport au bord supérieur de l'écran
  },
  buttonSpacer: {
    width: 15, // Espacement entre les boutons
  },
  answerContainer: {
    flexDirection: "row",
    justifyContent: "center", // Ensures buttons are spaced evenly
    width: "100%", // Ensures the container takes full width
  },

  question: {
    marginVertical: 35,
    fontSize: 20,
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },

  answer: {
    marginVertical: 15,
    marginHorizontal: 28,
  },

  buttonBlue: {
    backgroundColor: "#007bff",
    borderRadius: 10, // Adjust this value to control the roundness of the edges
    paddingVertical: 20,
    paddingHorizontal: 23,
    marginVertical: 18,
    marginHorizontal: 25,
  },
  buttonPink: {
    backgroundColor: "#ff00a6",
    borderRadius: 10, // Adjust this value to control the roundness of the edges
    paddingVertical: 20,
    paddingHorizontal: 23,
    marginVertical: 18,
    marginHorizontal: 25,
  },

  buttonAge: {
    borderWidth: 2, // Set the border width to create an outline
    borderColor: "#000", // Set the border color to black
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 30,
    marginVertical: 20,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonLabel: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 32,
  },
});
