import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import * as Application from "expo-application"
import { Linking, Platform, TextStyle, View, ViewStyle } from "react-native"
import { Button, ListItem, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { isRTL, TxKeyPath } from "../../i18n"
import { useStores } from "../../models"
import { AppStackScreenProps, navigate, navigationRef } from "./../../../app/navigators"
import { useHeader } from "app/utils/useHeader"

function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

interface GeneralInstructionScreenProps extends AppStackScreenProps<"GeneralInstruction"> {}
export const GeneralInstructionScreen: FC<GeneralInstructionScreenProps> =
  function GeneralInstructionScreen(_props) {
    const {
      authenticationStore: { logout },
    } = useStores()
    const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

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

    const startTestSeries = () => {
      navigate({ name: "TestOverview", params: undefined })
    }

    const numbers = Array.from({ length: 14 }, (_, i) => i + 1)

    const words = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
    ]
    useHeader(
      {
        leftIcon: "back",
        titleTx: "generalInstruction.generalInstructionTitle",
        onLeftPress: () => {
          navigationRef.current?.goBack()
        },
      },
      [],
    )
    return (
      <Screen preset="scroll" safeAreaEdges={["bottom"]} contentContainerStyle={$container}>
        <View style={$itemsContainer}>
          {numbers.map((item, index) => (
            <ListItem
              key={item}
              myKey={item}
              leftIcon="menu"
              LeftComponent={
                <View style={$item}>
                  <Text>* </Text>
                  <Text tx={("generalInstruction." + words[index]) as TxKeyPath}></Text>
                </View>
              }
            />
          ))}
        </View>
        <View style={$buttonContainer}>
          {/* <Button style={$button} tx="demoDebugScreen.reactotron" onPress={demoReactotron} /> */}
          {/* <Text style={$hint} tx={`demoDebugScreen.${Platform.OS}ReactotronHint` as const} /> */}
        </View>
        <View style={$buttonContainer}>
          <Button style={$button} tx="generalInstruction.continue" onPress={startTestSeries} />
        </View>
      </Screen>
    )
  }

const $container: ViewStyle = {
  paddingBottom: spacing.sm,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}

const $reportBugsLink: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: isRTL ? "flex-start" : "flex-end",
}

const $item: ViewStyle = {
  marginBottom: spacing.md,
  flexDirection: "row",
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
}

const $button: ViewStyle = {
  // marginBottom: spacing.xxs,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.xxl,
}

const $hint: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: spacing.lg,
}

// @demo remove-file
