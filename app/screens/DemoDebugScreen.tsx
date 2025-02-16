import React, { FC, useState } from "react"
import * as Application from "expo-application"
import { Linking, Platform, TextStyle, View, ViewStyle } from "react-native"
import { Button, ListItem, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import I18n from "i18n-js"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { navigate } from "app/navigators"

/**
 * @param {string} url - The URL to open in the browser.
 * @returns {void} - No return value.
 */
function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

export const DemoDebugScreen: FC<DemoTabScreenProps<"DemoDebug">> = function DemoDebugScreen(
  _props,
) {
  const {
    authenticationStore: { logout, authEmail, firstName, lastName, mobileNumber },
    // profileStore: { getProfile, userPassword },
  } = useStores()
  const [currentLanguage, setNewLanguage] = useState<string>("en")
  const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null
  // @ts-expect-error
  const usingFabric = global.nativeFabricUIManager != null

  const demoReactotron = React.useMemo(
    () => async () => {
      if (__DEV__) {
        console.tron.display({
          name: "DISPLAY",
          value: {
            appId: Application.applicationId,
            appName: Application.applicationName,
            appVersion: Application.nativeApplicationVersion,
            appBuildVersion: Application.nativeBuildVersion,
            hermesEnabled: usingHermes,
          },
          important: true,
        })
      }
    },
    [],
  )
  const handleBugpress = () => {
    const recipientEmail = "agastiguidance@gmail.com" // Replace with the desired recipient email
    const subject = "Subject of the email" // Optional subject line (can be left blank)
    const body = "Body of the email" // Optional email body (can be left blank)

    const url = `mailto:${recipientEmail}${subject ? `?subject=${subject}` : ""}${
      body ? `&body=${body}` : ""
    }`

    Linking.openURL(url).catch((err) => console.error("Error opening email:", err))
  }

  async function changeLanguage(lang: string) {
    let currentLang: string | null = await AsyncStorage.getItem("language")
    if (currentLang == null) {
      currentLang = "en"
    }
    setNewLanguage("" + currentLang)
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text
        style={$reportBugsLink}
        tx="demoDebugScreen.reportBugs"
        onPress={() => {
          // openLinkInBrowser("https://github.com/infinitered/ignite/issues")
          handleBugpress()
        }}
      />
      <Text style={$title} preset="heading" tx="demoDebugScreen.title" />
      <View style={$itemsContainer}>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text tx="welcomeScreen.yourName" preset="bold" />
              <Text>{firstName + " " + lastName}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text tx="welcomeScreen.emailFieldLabel" preset="bold" />
              <Text>{authEmail}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text tx="welcomeScreen.mobileNumber" preset="bold" />
              <Text>{mobileNumber}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Build Version</Text>
              <Text>{Application.nativeBuildVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Change Language</Text>
              <Text>{currentLanguage}</Text>
            </View>
          }
          onPress={() => navigate("Language", { lastScreen: "Profile" })}
        />
      </View>
      <View style={$buttonContainer}>
        {/* <Button style={$button} tx="demoDebugScreen.reactotron" onPress={demoReactotron} /> */}
        {/* <Text style={$hint} tx={`demoDebugScreen.${Platform.OS}ReactotronHint` as const} /> */}
      </View>
      <View style={$buttonContainer}>
        <Button style={$button} tx="common.logOut" onPress={logout} />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.xxl,
}

const $reportBugsLink: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: isRTL ? "flex-start" : "flex-end",
}

const $item: ViewStyle = {
  marginBottom: spacing.md,
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
}

const $button: ViewStyle = {
  marginBottom: spacing.xs,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.md,
}

const $hint: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: spacing.lg,
}

// @demo remove-file
