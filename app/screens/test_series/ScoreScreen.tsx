import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextRounded } from "./../../../app/components"
import { colors, spacing } from "./../../../app/theme"
import { useNavigation } from "@react-navigation/native"
import { AppStackScreenProps, navigate } from "./../../../app/navigators"
import { CourseSubjectQuize, ScoreBoard, useStores } from "app/models"
import { SaveQuizAndGenerateReportResponse } from "app/services/models/saveQuizAndGenerateReport"
import { translate } from "app/i18n"

// import { useStores } from "app/models"

interface ScoreScreenProps extends AppStackScreenProps<"Score"> {}

export const ScoreScreen: FC<ScoreScreenProps> = observer(function ScoreScreen() {
  const navigation = useNavigation()
  const [totalAchievedMarks, setTotalAchievedMarks] = useState<string>("-1")
  const {
    ongoingQuizeStore: { getCurrentCourseId },
    quizeStore: { getScoreBoard, getCurrentCourse, saveCurrentCourseAttempt },
  } = useStores()

  // const sendResultToBackend = async (result: any) => {
  //   const url = "" // Replace with your backend URL

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(result),
  //     })

  //     if (!response.ok) {
  //       throw new Error(`Error sending result: ${response.statusText}`)
  //     }

  //     const data = await response.json()
  //     console.log("Result submitted successfully:", data) // Handle success response (optional)
  //   } catch (error) {
  //     console.error("Error sending result:", error)
  //     // Handle errors appropriately (e.g., display error message to user)
  //   }
  // }

  async function saveAttemptedQuiz() {
    const quiz: CourseSubjectQuize[] = getCurrentCourse(getCurrentCourseId as number)
    const saveAttemptResponse: SaveQuizAndGenerateReportResponse | undefined =
      await saveCurrentCourseAttempt(quiz)
    if (saveAttemptResponse) {
      setTotalAchievedMarks("" + saveAttemptResponse?.score)
      // return {
      //   totalTimeInMinute,
      //   totalQuestion,
      //   totalMarks,
      //   totalAchievedMarks,
      //   totalCorrectAns,
      //   totalWrongAns,
      //   totalAttempted,
      //   totalNotAttempted,
      // } as ScoreBoard
    }
  }

  // Handle back button
  useEffect(() => {
    // sendResultToBackend(result)

    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      // Check if back button was pressed
      if (e.data.action.type === "GO_BACK") {
        e.preventDefault() // Prevent default back navigation
        // Handle custom action here (optional)
      }
    })
    saveAttemptedQuiz()
    return () => {
      unsubscribe()
    }
  }, [navigation])

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const startTestSeries = () => {
    navigate({ name: "Home", params: undefined })
  }

  function calculateResult(): ScoreBoard {
    let scoreBoard: ScoreBoard = getScoreBoard(getCurrentCourseId as number)
    return scoreBoard
  }

  const result: ScoreBoard = calculateResult()
  // sendResultToBackend(result)

  const sectionList = [
    {
      title: translate("score.totalQuestions"),
      question: "" + result?.totalQuestion,
      symbol: "?",
      color: colors.palette.accent100,
    },
    {
      title: translate("score.correctAnswers"),
      question: "" + result?.totalCorrectAns,
      symbol: "=",
      color: colors.palette.neutral100,
    },
    {
      title: translate("score.wrongAnswers"),
      question: "" + result?.totalWrongAns,
      symbol: "x",
      color: colors.palette.neutral100,
    },
    {
      title: translate("score.partialCorrectAnswers"),
      question: "0",
      symbol: "~",
      color: colors.palette.secondary100,
    },
    {
      title: translate("score.unattemptedQuestion"),
      question: "" + result?.totalNotAttempted,
      symbol: "!",
      color: colors.palette.primary300,
    },
  ]

  type SectionType = {
    srNo: string
    title: string
    question: string
    color: string
    symbol: string
  }

  function SectionItem(obj: SectionType) {
    return (
      <View key={obj.srNo} style={$sectionItemContainer}>
        <View style={{ flex: 0.2, alignSelf: "center" }}>
          <TextRounded
            heightOrWidth={30}
            key={obj.srNo}
            backgroundColor={obj.color}
            preset="default"
            text={obj.symbol}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            flex: 0.7,
            alignSelf: "center",
          }}
        >
          <Text style={$sectionItem} preset="formLabel" text={obj.title} />
        </View>
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={$vals} preset="formLabel" text={obj.question} />
        </View>
      </View>
    )
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text style={$title} preset="heading" tx="score.score" />
      <View style={$line} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon size={20} style={$icon} icon={"lock"} color={"black"} />
        <Text style={$vals} preset="formLabel">
          {result?.totalQuestion}
        </Text>
        <Text style={$duration} preset="formLabel" tx="score.question" />
        <Icon size={20} style={$icon} icon={"heart"} color={"black"} />
        <Text style={$vals} preset="formLabel" text="1" />
        <Text style={$duration} preset="formLabel" tx="score.duration" />
        <Icon size={20} style={$icon} icon={"settings"} color={"black"} />
        <Text style={$vals} preset="formLabel" text="160" />
        <Text style={$duration} preset="formLabel" tx="score.marks" />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={[$section, { marginRight: spacing.sm }]} preset="subheading">
          {"" + totalAchievedMarks ? totalAchievedMarks : result?.totalAchievedMarks}
        </Text>
        <Text style={$section} preset="subheading" tx="score.myscore" />
      </View>
      <View style={$line} />
      {sectionList.map(({ title, question, symbol, color }, index) => (
        <SectionItem
          key={"" + (index + 1)}
          srNo={"" + (index + 1)}
          title={title}
          question={question}
          symbol={symbol}
          color={color}
        />
      ))}
      <View style={$tryagain}>
        <Button style={$button} tx="score.reattempt" onPress={startTestSeries} />
        <Button style={$button} tx="score.home" onPress={startTestSeries} />
      </View>
    </Screen>
  )
})

const $sectionItemContainer: ViewStyle = { flexDirection: "row", flex: 1, paddingTop: spacing.xl }

const $button: ViewStyle = {
  marginTop: spacing.xl,
  marginBottom: spacing.xs,
  marginHorizontal: spacing.xs,
  alignSelf: "center",
}
const $container: ViewStyle = {
  paddingBottom: spacing.sm,
  paddingHorizontal: spacing.lg,
}
const $icon: ImageStyle = {
  alignSelf: "center",
  marginRight: spacing.xxxs,
}
const $title: TextStyle = {}

const $line: TextStyle = {
  height: 2,
  flex: 1,
  backgroundColor: colors.border,
  marginBottom: spacing.xs,
}
const $tryagain: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
}

const $duration: TextStyle = {
  marginRight: spacing.sm,
}
const $vals: TextStyle = {
  marginRight: spacing.xxxs,
}

const $sectionItem: TextStyle = {}
const $section: TextStyle = {
  paddingTop: spacing.sm,
}
const $notChecked: TextStyle = {
  color: colors.error,
}
