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
import { useStores } from "app/models"
import { QuizeSnapshotOut } from "app/models/Course"
import { useLanguage } from "app/i18n/LanguageContext"

interface ExamListScreenProps extends AppStackScreenProps<"ExamList"> {}

export const ExamListScreen: FC<ExamListScreenProps> = observer(function ExamListScreen() {
  const {
    ongoingQuizeStore: { setCurrentCouserId, setCurrentCourseName },
    quizeStore: { fetchQuize, getAllQuizes },
  } = useStores()
  const { language } = useLanguage()
  const [isExamLoaded, setExamLoaded] = useState<boolean>(false)

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

  async function fetchAllExamination() {
    await fetchQuize()
    setExamLoaded(true)
  }

  useEffect(() => {
    fetchAllExamination()
  }, [language])

  // useEffect(() => {
  //   if (isExamLoaded == false) {
  //     fetchAllExamination()
  //   }
  // }, [isExamLoaded, language])

  // set object values for objects as mapping is done
  const startTestSeries = (currentCourseId: number, currentCourseName: string) => {
    const quizeModelProps: QuizeSnapshotOut = {
      courseId: 123, // Replace with an actual course ID
      courseSubjects: [
        {
          courseSubjectId: 456,
          courseSubjectMedia: [
            "https://example.com/image1.jpg",
            "https://example.com/video2.mp4",
          ] as any,
          courseSubjectQuize: [
            { question: "What is the capital of France?", answer: "Paris" },
            { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
          ] as any,
          courseId: 123,
          subjectName: "Introduction to Programming",
          subjectDescription: "A beginner's guide to programming concepts",
          subjectHeader: "Programming 101",
          created_by: "John Doe",
          created_date: "2023-12-31",
          updated_by: "Jane Smith",
          updatedDate: "2024-01-15",
        },
        // Add more course subjects as needed
      ] as any,
      courseName: "Web Development Fundamentals",
      courseDescription: "Learn the basics of HTML, CSS, and JavaScript",
      start_date: "2024-02-01",
      end_date: "2024-03-31",
      days: "7",
      hours: "10",
      created_by: "John Doe",
      created_date: "2023-12-31",
      updated_by: "Jane Smith",
      updatedDate: "2024-01-15",
    }
    setCurrentCouserId(currentCourseId)
    setCurrentCourseName(currentCourseName)
    navigate({ name: "GeneralInstruction", params: undefined })
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text style={$title} preset="heading" tx="examList.testSeriesList" />
      <View style={$itemsContainer}>
        {getAllQuizes.map((item, index) => (
          <ListItem
            myKey={index}
            key={index}
            text={"" + item?.courseName}
            children={"children"}
            bottomSeparator
            rightIcon={isRTL ? "caretLeft" : "caretRight"}
            height={60}
            LeftComponent={
              <View style={$leftImageContainer}>
                <Image source={mpsc} style={$leftImage} />
              </View>
            }
            onPress={() => startTestSeries(item?.courseId as number, "" + item?.courseName)}
            // onPress={() => openLinkInBrowser("https://rn.live/")}
          />
        ))}
      </View>
      {/* <View style={$buttonContainer}> */}
      {/* <Button style={$button} tx="demoDebugScreen.reactotron" onPress={demoReactotron} /> */}
      {/* <Text style={$hint} tx={`demoDebugScreen.${Platform.OS}ReactotronHint` as const} /> */}
      {/* </View> */}
      {/* <View style={$buttonContainer}>
        <Button style={$button} tx="generalInstruction.continue" onPress={startTestSeries} />
      </View> */}
    </Screen>
  )
})

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
  marginBottom: spacing.xs,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.md,
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

const $hint: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: spacing.lg,
}
