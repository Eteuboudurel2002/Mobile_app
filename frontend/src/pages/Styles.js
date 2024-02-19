import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  login_container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  login_header: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 50,
    backgroundColor: "#208AEC",
  },
  login_header_logo: {
    width: 220,
    resizeMode: "contain",
  },
  login_header_text: {
    marginTop: 15,
    color: "#f0f0f0",
    fontSize: 16,
  },
  login_header_text_bold: {
    color: "#fff",
    fontWeight: "bold",
  },
  login_wrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 40,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    marginTop: -10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  form: {
    width: "100%",
    maxWidth: 280,
  },
  form_input: {
    height: 44,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#EDF0F7",
    borderRadius: 50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    backgroundColor: "#4A99E9",
    borderRadius: 50,
  },
  button_label: {
    color: "#fff",
    fontSize: 15,
  },
  login_social: {
    width: "100%",
    maxWidth: 280,
    marginTop: 20,
  },
  login_footer_text: {
    flexDirection: "row",
    alignItems: "center",
    color: "#808080",
    fontSize: 15,
  },
  login_footer_link: {
    color: "#208AEC",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Styles;
