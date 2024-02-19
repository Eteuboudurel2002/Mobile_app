import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Styles from "./Styles";

import i18next from "../../languages/i18n";
import { useTranslation } from "react-i18next";
export default function UserLogin() {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const UserLoginAttempt = async function () {
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
          value={password}
          placeholder={t("Password")}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => UserLoginAttempt()}>
          <View style={Styles.button}>
            <Text style={Styles.button_label}>{t("Login")}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={Styles.login_footer_text}>
            {t("DontHaveAccont")}
            <Text
              style={Styles.login_footer_link}
              onPress={() => navigation.navigate("Register")}
            >
              {t("CreateAccount")}
            </Text>
          </Text>
        </TouchableOpacity>
      </>
    </View>
  );
}
