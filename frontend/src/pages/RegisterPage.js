import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Styles from "./Styles";
import i18next from "../../languages/i18n";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const [username, setUsername] = useState("");
  const [Country, setCountry] = useState("");
  const [password, setPassword] = useState("");

  const doUserSignUp = async function () {
    navigation.navigate("Home");
  };

  return (
    <View style={Styles.login_wrapper}>
      <View style={Styles.form}>
        <TextInput
          style={Styles.form_input}
          value={username}
          placeholder={t("Username")}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize={"none"}
          keyboardType={"email-address"}
        />
        <TextInput
          style={Styles.form_input}
          value={Country}
          placeholder={t("Country")}
          onChangeText={(text) => setCountry(text)}
          autoCapitalize={"none"}
        />
        <TextInput
          style={Styles.form_input}
          value={password}
          placeholder={t("Password")}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity onPress={() => doUserSignUp()}>
          <View style={Styles.button}>
            <Text style={Styles.button_label}>{t("Signup")}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={Styles.login_footer_text}>
            {t("HaveAccount")}
            <Text style={Styles.login_footer_link}>{t("Login")}</Text>
          </Text>
        </TouchableOpacity>
      </>
    </View>
  );
}
