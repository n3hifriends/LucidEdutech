import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, StyleSheet, TextStyle } from "react-native"
import { AppStackScreenProps, navigate, navigationRef } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { colors } from "app/theme/colors"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { spacing } from "app/theme/spacing"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { useLanguage } from "app/i18n/LanguageContext"
import { useStores } from "app/models"

interface LanguageScreenProps extends AppStackScreenProps<"Language"> {}

export const LanguageScreen: FC<LanguageScreenProps> = observer(function LanguageScreen({ route }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const { changeLanguage } = useLanguage()
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()
  const handleLanguageSelection = (language: string) => {
    changeLanguage(language)
    setSelectedLanguage(language)
    const callFrom = route?.params?.lastScreen
    if (callFrom && callFrom === "Profile") {
      // if (navigationRef.canGoBack()) {
      //   navigationRef.goBack()
      // } else {
      navigate("Demo", { screen: "Home" })
      // }
    } else if (isAuthenticated) {
      // this is workaround,not the sulution
      navigate("Demo", { screen: "Home" })
    } else {
      navigate({ name: "Login" })
    }
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={$container}>
        <TouchableOpacity
          style={[
            $languageButton,
            selectedLanguage === "english" && $selectedButton, // Highlight selected
          ]}
          onPress={() => handleLanguageSelection("en")}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={$letterStyle}>A</Text>
            <Text style={$languageButtonText}>English </Text>
            <Text style={$languageButtonText}>अंग्रेज़ी</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            $languageButton,
            selectedLanguage === "hindi" && $selectedButton, // Highlight selected
          ]}
          onPress={() => {
            // handleLanguageSelection("hi")
          }}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={$letterStyle}>अ</Text>
            <Text style={$languageButtonText}>हिंदी</Text>
            <Text style={$languageButtonText}>Hindi (coming soon)</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            $languageButton,
            selectedLanguage === "marathi" && $selectedButton, // Highlight selected
          ]}
          onPress={() => handleLanguageSelection("mr")}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={$letterStyle}>म</Text>
            <Text style={$languageButtonText} tx="languageChange.Marathi"></Text>
            <Text style={$languageButtonText}>Marathi</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View
        style={[$bottomContainer, $bottomContainerInsets, { backgroundColor: colors.background }]}
      >
        <Button style={$languageButtonText}>Get Started</Button>
        <View style={$languageButtonSelection}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigate({ name: "LoginScreen" })}>
            <Text style={{ color: "blue", marginLeft: 10 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
const $safeArea: ViewStyle = {
  // Style for SafeAreaView
  flex: 1,
  backgroundColor: "#f0f0f0", // Example background color
}
const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
const $title: ViewStyle = {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 20,
}
const $languageButton: ViewStyle = {
  backgroundColor: colors.palette.neutral600, // Example button colorrgb(53, 59, 65)rgb(42, 49, 49)
  padding: 15,
  borderRadius: 8,
  marginVertical: 10,
  width: "80%", // Make buttons wider
  alignItems: "flex-start", // Center text horizontally
}
const $selectedButton: ViewStyle = {
  // Style for selected button
  backgroundColor: "#0056b3", // Darker blue when selected
}
const $languageButtonText: ViewStyle = {
  color: "white",
  fontSize: 16,
  // marginLeft: 10,
  margin: 10,
}
const $selectedLanguageText: ViewStyle = {
  // Style for displaying selected language
  marginTop: 20,
  fontSize: 18,
  fontWeight: "bold",
}
const $touchableView: ViewStyle = {}
const $login: TextStyle = {
  color: colors.palette.blue,
}
const $buttonContainer: ViewStyle = {
  marginBottom: spacing.md,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "10%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
  marginBottom: spacing.xl,
}

const $languageButtonSelection: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "center",
}
const $letterStyle: ViewStyle = {
  color: "orange",
  alignSelf: "center",
  paddingHorizontal: 8,
  backgroundColor: "white",
  borderRadius: 2,
}

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xl,
  height: "100%",
  paddingHorizontal: spacing.lg,
}
