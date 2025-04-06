import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, Image, ImageStyle } from "react-native"
import * as Application from "expo-application"
import { ListItem, Screen, Text } from "../components"
import { AppStackScreenProps, navigate } from "./../../app/navigators"
import { colors, spacing } from "./../../app/theme"
import { isRTL } from "./../../app/i18n"
const mpsc = require("../../assets/images/mpsc.png")
// const mpsc_police = require("../../assets/images/mpsc_police.png")
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
// import { QuizeSnapshotOut } from "app/models/Course"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"

interface SubscriptionsScreenProps extends AppStackScreenProps<"Subscriptions"> {}

export const SubscriptionsScreen: FC<SubscriptionsScreenProps> = observer(
  function SubscriptionsScreen() {
    const systemInstructionsEng = [
      "Maharashtra Gazetted Civil Services Examination - Scheme (December-2023)",
      "Maharashtra Gazetted Civil Services Examination - Scheme (Feb-2023)",
      "Departmental Limited Competitive Examination for recruitments under Commissionerate of Women and Child Development - Scheme and Syllabus",
      "Maharashtra Non Gazetted Group-B and Group - C Services Examination - Scheme of Examination",
      "Maharashtra Gazetted Technical Services Combined Examination - Revised Schem",
      "Maharashtra Group C Services Examination-Scheme	",
      "Maharashtra Sub-Ordinate Services Non-Gazetted Group B Combine Examination-Revised Scheme	",
      "State Services Examination - Revised Scheme (May-2022)	",
      "Maharashtra Gazzetted Technical Services Competitive Examination-Exam Scheme	",
      "Police Sub Inspector Limited Departmental Competitive Examination – 06th January, 2022	",
      "Assistant Section Officer Limited Departmental Examination-Scheme	",
      "CIVIL JUDGE JUNIOR DIVISION AND JUDICIAL MAGISTRATE FIRST CLASS EXAMINATION - SCHEME (DECEMBER 2021)	",
      "Maharashtra Group-C Services Examination - Revised Scheme	",
      "Maharashtra Sub-Ordinate Services Non-Gazetted Group B Examination (Revised in October 2021)	",
      "State Services Examination-Revised Scheme	",
      "Assistant Commissioner / Ward Officer, MCGM, Gr-A (Revised)	",
      "Assistant Motor Vehicle Inspector Examination - February, 2020	",
      "State Services Examination - 15th January, 2020	",
      "CIVIL JUDGES (JUNIOR DIVISION) JUDICIAL MAGISTRATE (FIRST CLASS) COMPETITIVE MAIN EXAMINATION	",
      "Maharashtra Engineering Services Examination - April, 2019	",
      "Police Sub Inspector Limited Departmental Competitive Examination - 07-07-2018	",
      "Maharashtra Group-C Services Examination - 20 March 2018	",
      "Maharashtra Subordinate Services group B Examination	",
    ]

    const systemInstructions = [
      { title: "MPSC Wallah", link: "https://www.youtube.com/channel/UC1Fc-8RLxmoi6Tw9cbNoxxQ" },
      { title: "Unacademy Live - MPSC", link: "https://www.youtube.com/c/UnacademyLiveMPSC" },
      { title: "Dnyanadeep Academy Pune", link: "https://www.youtube.com/@DnyandeepPune" },
      {
        title: "Let's Crack MPSC Exams",
        link: "https://www.youtube.com/channel/UCuqNqk4DwYpD6xVmAqpUqig",
      },
      {
        title: "BYJU'S Exam Prep",
        link: "https://www.youtube.com/@BYJUSExamPrepMPSCOtherGovtExam",
      },
    ]

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

    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
        <Text style={$title} preset="heading" tx="subscriptionList.subscription" />
        <View style={$itemsContainer}>
          {systemInstructions.map((item, index) => (
            <ListItem
              myKey={index}
              key={index}
              text={"" + item?.title}
              children={"children"}
              bottomSeparator
              rightIcon={isRTL ? "caretLeft" : "caretRight"}
              height={60}
              LeftComponent={
                <View style={$leftImageContainer}>
                  <Image source={mpsc} style={$leftImage} />
                </View>
              }
              onPress={() => openLinkInBrowser(item?.link)}
            />
          ))}
        </View>
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  paddingBottom: spacing.sm,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}
const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
}

const $leftImageContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
}

const $leftImage: ImageStyle = {
  height: 35,
  width: 35,
  alignSelf: "center",
}
