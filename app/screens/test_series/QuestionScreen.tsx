import React, { FC, useEffect, useState, useReducer, useRef, useMemo } from "react"
import * as Application from "expo-application"
import {
  Linking,
  Platform,
  TextStyle,
  View,
  ViewStyle,
  ScrollView,
  TouchableOpacity,
  Alert,
  AppState,
} from "react-native"
import {
  Button,
  AnswerItem,
  Screen,
  Text,
  TextRounded,
  AutoImage,
  Icon,
  AnswerItemProps,
  AnswerTypes,
} from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { colors, spacing } from "../../theme"
import { isRTL } from "../../i18n"
import {
  CourseSubjectQuize,
  CourseSubjectQuizMultiAnswer,
  CourseSubjectQuizQuestion,
  useStores,
} from "../../models"
import { AppStackScreenProps, navigate } from "./../../../app/navigators"
import {
  AnsAndId,
  Question,
  QuestionObject,
  initialQuestion,
  mockQuestions,
} from "./../../mocks/demoQuestions"
import CircularProgressBar from "app/components/CircularProgressBase"
import { useNavigation } from "@react-navigation/core"
import { Quize } from "app/models/Course"
import { number, reference } from "mobx-state-tree/dist/internal"
function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

/**
 * TODO:
 * 1. Convert countdound, previous, next text english & marathi
 * 2. Work on countdown logic
 * 3. Make all this screen logic dynamically using hardcoded values
 *    1.
 */
var myInterval: any

interface QuestionScreenProps extends AppStackScreenProps<"QuestionScreen"> {}

export const QuestionScreen: FC<QuestionScreenProps> = function QuestionScreen(_props) {
  const {
    ongoingQuizeStore: { getCurrentCourseId },
    quizeStore: { getAllQuizes, attendQuestion },
  } = useStores()

  const [allQuestions, setAllQuestions] = useState<Question[]>([])
  const [totalTimeLimit, setTotalTimeLimit] = useState<number>(25)

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "previous":
        if (state?.index > 0) {
          return allQuestions[state.index - 1]
        }
      case "next":
        if (state?.index < allQuestions.length - 1) {
          return allQuestions[state.index + 1]
        }
      case "index":
        if (action.index < allQuestions.length) {
          return allQuestions[action.index]
        }
      case "reset":
        return allQuestions[0]
      default:
        return state
    }
  }

  const [statex, dispatch] = useReducer(reducer, initialQuestion)
  const state: Question = statex
  const [myAnswer, setMyAnswer] = useState<string | undefined>(state?.userAnswer)

  const isReferenceImageAvailable: boolean = state?.referenceImageUrl
    ? state?.referenceImageUrl?.length > 0
    : false
  const [showImage, setShowImage] = useState(isReferenceImageAvailable)
  const clearIntervalRef = useRef<any>(null)
  const [appState, setAppState] = useState(AppState.currentState)
  const [backgroundCount, setBackgroundCount] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)

  const correctAnswer = state?.correctAns
  var stateChangeUnsubscribe: any = undefined

  const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

  const [timeLeft, setTimeLeft] = useState(0)
  const currentQuestion: number = state?.index
  const handleNextQuestion = () => {
    if (state?.index == allQuestions?.length - 1) {
      // dispatch({ type: "reset" })
      clearInterval(myInterval)
      setTimeout(() => {
        showResult(false)
      }, 1000)
      return
    }
    resetTimer() // Reset timer for the next question
    dispatch({ type: "next" })
  }

  function resetTimer() {
    setTimeLeft(0) // Set time to 0 to stop the interval
  }

  // function submitTest() {
  //   if (stateChangeUnsubscribe) {
  //     stateChangeUnsubscribe.remove()
  //   }
  //   navigate({ name: "Score", params: undefined })
  // }
  const handleAppStateChange = (nextAppState: any) => {
    if (appState === "active" && nextAppState === "inactive") {
      setBackgroundCount((prevCount) => prevCount + 1)
      setTimerRunning(true)
      const timeoutId = setTimeout(() => {
        setTimerRunning(false)
        if (backgroundCount === 3) {
          showTestSubmissionPrompt()
        }
      }, 5000) // Adjust timeout as needed
      return () => clearTimeout(timeoutId)
    }
    setAppState(nextAppState)
  }

  const showTestSubmissionPrompt = () => {
    Alert.alert(
      "Test Submission",
      "The app has been in the background 3 times. Are you sure you want to submit the test?",
      [
        { text: "Submit", onPress: () => submitTest() }, // Replace with your submit function
        { text: "Cancel", onPress: () => console.log("Test submission cancelled") },
      ],
    )
  }

  // Replace with your actual test submission logic
  const submitTest = () => {
    showResult(true)
  }

  useMemo(() => {
    const unsubscribe = AppState.addEventListener("change", handleAppStateChange)
    const courseSubjects: Quize[] = getAllQuizes?.filter(
      (quize) => quize?.courseId == getCurrentCourseId,
    )
    let allQuizOfCourseId: CourseSubjectQuize[] =
      courseSubjects?.[0].courseSubjects?.[0]?.courseSubjectQuiz
    if (allQuizOfCourseId == undefined) {
      allQuizOfCourseId = []
    }
    let timeInMinute: number = 0
    let allQues: Question[] = []
    allQuizOfCourseId.map((currentQuiz: CourseSubjectQuize, index: number) => {
      timeInMinute += Number(currentQuiz?.timeInMinute)
      let quizes: CourseSubjectQuizQuestion[] = currentQuiz?.courseSubjectQuizQuestion
      let groupwiseQues: Question[] = quizes?.map(
        (myQuiz: CourseSubjectQuizQuestion, index: number) => {
          let findCorrectAns: string = ""
          let ansArr: AnsAndId[] = myQuiz?.courseSubjectQuizMultiAnswer?.map(
            (item: CourseSubjectQuizMultiAnswer) => {
              if (item?.isCorrectAnswer === true) {
                findCorrectAns = "" + item.value
              }
              return {
                answer: "" + item.value,
                answerId: item.courseSubjectQuizMultiAnsId as number,
              }
            },
          )
          let convertIntoQuiz: Question = {
            index: allQues.length, // increase index by 1 (before allQues.push(convertIntoQuiz))
            countdown: 0,
            title: "" + myQuiz?.question,
            referenceUrl: undefined,
            referenceImageUrl:
              "https://drive.google.com/uc?export=view&id=14zQPC4_-NeAUVAgvNsAu3OptpR4SBxXM",
            ansArr: ansArr,
            // correctAns: "" + myQuiz?.correctAnswer,
            correctAns: findCorrectAns,
            answerExplanation: "" + myQuiz?.answerExplanation,
            attemptTimestamp: undefined,
            userAnswer: "" + myQuiz?.userAnswer,
            attempted: false,
            isCorrect: false,
            maxScore: 10,
            courseSubjectQuizQuestionId: myQuiz?.courseSubjectQuizQuestionId as number,
            attemptedCourseSubjectQuizMultiAnsId: 0,
          }
          allQues.push(convertIntoQuiz)
          return convertIntoQuiz
        },
      )
    })
    setAllQuestions(allQues)
    setTotalTimeLimit(timeInMinute)
    // setAllQuestions(mockQuestions)
    dispatch({ type: "index", index: 0 })

    return () => unsubscribe.remove()
  }, [])

  useEffect(() => {
    if (state?.countdown > 0) {
      setTimeLeft(state?.countdown)
      if (myInterval) {
        clearInterval(myInterval)
      }
      myInterval = setInterval(() => {
        setTimeLeft((prevTime: any) => {
          const remTime = Math.max(prevTime - 1, 0)
          if (remTime === 0) {
            handleNextQuestion()
          }
          return remTime
        }) // Ensure time doesn't go below 0
      }, 1000) // Update every second
    }
    return () => clearInterval(myInterval) // Cleanup function to clear interval
  }, [state]) // Dependency array: trigger effect only on timeLeft change

  useEffect(() => {
    if (state?.attempted) {
      checkAnswer(state, state?.userAnswer)
    }
  }, [state])

  const isLastQuestion = currentQuestion === allQuestions.length - 1

  function showResult(confirmTest: boolean) {
    if (confirmTest) {
      Alert.alert("खा‍त्री करा", "तुम्हाला खात्री आहे की तुम्ही चाचणी सबमिट करू इच्छिता?", [
        // Alert.alert("Confirm Submission", "Are you sure you want to submit the  test?", [
        {
          text: "होय",
          onPress: () => {
            navigate({ name: "Score", params: undefined })
          },
        },
        { text: "नाही", onPress: () => {}, style: "cancel" },
      ])
    } else {
      navigate({ name: "Score", params: undefined })
    }
  }

  function checkAnswer(currentQue: Question, answer: string) {
    // modify existing array
    let newMockQuestionFilterArr: Question[] = allQuestions.filter(
      (item, index) => item?.index === state?.index,
    )
    let newMockQuestion: Question = newMockQuestionFilterArr[0]

    newMockQuestion.attempted = true
    newMockQuestion.userAnswer = answer
    let isCorrect: boolean = answer === newMockQuestion.correctAns
    newMockQuestion.isCorrect = isCorrect
    let currentCourseId: number = getCurrentCourseId as number
    const myAns: AnsAndId[] = newMockQuestion?.ansArr?.filter(
      (item: AnsAndId, index: number) => item?.answer == answer,
    )
    const attemptedCourseSubjectQuizMultiAnsId: number = myAns[0]?.answerId
    attendQuestion(
      currentCourseId,
      newMockQuestion?.courseSubjectQuizQuestionId,
      attemptedCourseSubjectQuizMultiAnsId,
      isCorrect,
      answer,
    )
    setMyAnswer(answer)
  }

  function isCorrectAnswer(state: Question, index: string, option: string) {
    let ans = myAnswer
    // if (state?.attempted) {
    //   return state?.userAnswer === "" + option ? "yes" : "no"
    // }

    const isCorrectAns =
      ans === undefined
        ? undefined
        : ans === correctAnswer && ans === "" + option
        ? "yes"
        : ans != "" + option
        ? undefined
        : "no"

    return isCorrectAns
  }

  function answerIcon(index: string, option: string) {
    let ans = myAnswer
    // if (state?.attempted) {
    //   return state?.isCorrect && state?.userAnswer === "" + option ? "check" : "x"
    // }

    return ans === undefined
      ? undefined
      : ans === correctAnswer && ans === "" + option
      ? "check"
      : ans != "" + option
      ? undefined
      : "x"
  }

  function showOnCorrectAnswer() {
    return myAnswer === undefined ? false : myAnswer === correctAnswer ? true : false
  }

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

  //progress bar
  const calculateProgress = () => {
    return 1 - timeLeft / state?.countdown
  }
  const bigQuestionLength = state?.title?.length > 200
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* <Text
          style={$reportBugsLink}
          tx="demoDebugScreen.reportBugs"
          onPress={() => {
            // openLinkInBrowser("https://github.com/infinitered/ignite/issues")
          }}
        /> */}
        <Text tx="questionScreen.testSeries" style={$title} preset="heading" />
        <CircularProgressBar initialProgress={totalTimeLimit} maxProgess={totalTimeLimit} />
      </View>

      <View style={$allQuestionView}>
        <ScrollView
          contentContainerStyle={{ alignSelf: "center" }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {allQuestions?.map((item: Question, index: number) => {
            return (
              <TextRounded
                key={index}
                style={$title}
                backgroundColor={
                  index == currentQuestion
                    ? colors.palette.secondary300
                    : item?.attempted
                    ? colors.palette.overlay50
                    : undefined
                }
                preset="default"
                text={String(index + 1)}
                onPress={() => {
                  dispatch({ type: "index", index })
                }}
              />
            )
          })}
        </ScrollView>
      </View>

      <View style={$currentQuestion}>
        <View style={$currentQuestionRoundView}>
          <View style={$currentQuestionView}>
            <TextRounded
              backgroundColor={colors.palette.secondary300}
              style={$title}
              preset="default"
              text={"" + (currentQuestion + 1)}
            />
          </View>
          <View style={$currentQuestionView}>
            {state?.countdown > 0 && (
              <>
                <Text preset="bold" tx="questionScreen.countDown" />
                <Text preset="bold" text={` ${timeLeft}`} />
              </>
            )}
            {/* <CircularProgressBar initialProgress={5} maxProgess={10} /> */}
          </View>
        </View>
        <View style={{ flex: 0.7 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: showImage ? 0.7 : 1 }}>
              <Text preset="bold" size={showImage || bigQuestionLength ? "xxs" : "sm"}>
                {state?.title}
              </Text>
            </View>
            {showImage && (
              <View style={{ flex: 0.3 }}>
                <AutoImage
                  style={{ width: "99%", height: "99%" }}
                  source={{
                    uri: state?.referenceImageUrl,
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={{ flex: 0.35 }}>
        {state?.ansArr?.map((item: AnsAndId, index: number) => {
          if (item?.answer.startsWith("http")) {
            return (
              <TouchableOpacity
                style={{
                  width: "12%",
                  height: "15%",
                  margin: 10,
                  padding: 2,
                  backgroundColor:
                    isCorrectAnswer(state, "" + index, item?.answer) == undefined
                      ? undefined
                      : isCorrectAnswer(state, "" + index, item?.answer) === "yes"
                      ? colors.palette.green60
                      : colors.palette.red60,
                }}
                onPress={() => {
                  checkAnswer(state, item?.answer)
                }}
              >
                <AutoImage
                  style={{ width: "100%", height: "100%" }}
                  source={{
                    uri: item?.answer,
                  }}
                />
              </TouchableOpacity>
            )
          }
          return (
            <AnswerItem
              key={"" + index}
              id={"" + index}
              text={"" + item?.answer}
              leftText={index + 1 + "."}
              isCorrect={isCorrectAnswer(state, "" + index, item?.answer) as AnswerTypes}
              topSeparator={true}
              bottomSeparator={true}
              rightIcon={answerIcon("" + index, item?.answer)}
              onPress={() => checkAnswer(state, item?.answer)}
            />
          )
        })}
      </View>
      {showOnCorrectAnswer() && (
        <View style={{ flex: 0.3 }}>
          <View style={$itemsContainer}>
            {/* <Text preset="bold">Solution: 5</Text>
            <Text preset="bold">52% got it right</Text> */}
            <Text
              style={{ color: "blue", textDecorationLine: "underline" }}
              preset="formHelper"
              onPress={() => {
                openLinkInBrowser("" + state?.referenceUrl)
              }}
            >
              Reference: Ketan to provide
            </Text>
          </View>

          <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={true}>
            <Text preset="default" text={state?.answerExplanation} />
          </ScrollView>
        </View>
      )}

      {/* <View style={{ flex: 0.15, justifyContent: "flex-start", paddingTop: spacing.xxxs }}>
        <View style={$buttonContainer}>
           <Button style={$button} tx="demoDebugScreen.reactotron" onPress={demoReactotron} />
           <Text style={$hint} tx={`demoDebugScreen.${Platform.OS}ReactotronHint` as const} />
        </View>
        <View style={$buttonContainer}>
          <Button
            style={$button}
            tx="questionScreen.previous"
            onPress={() => dispatch({ type: "previous" })}
          />

          {isLastQuestion ? (
            <Button style={$button} tx="questionScreen.submit" onPress={() => showResult} />
          ) : (
            <Button style={$button} tx="questionScreen.next" onPress={handleNextQuestion} />
          )}
        </View>
      </View> */}

      <View style={{ flex: 0.15, justifyContent: "flex-start", paddingTop: spacing.xxxs }}>
        {/* <View style={$buttonContainer}>
           <Button style={$button} tx="demoDebugScreen.reactotron" onPress={demoReactotron} /> 
           <Text style={$hint} tx={`demoDebugScreen.${Platform.OS}ReactotronHint` as const} /> 
        </View> */}
        <View style={$buttonContainer}>
          <Button
            style={$button}
            tx="questionScreen.previous"
            onPress={() => dispatch({ type: "previous" })}
          />

          {isLastQuestion ? (
            <Button style={$button} tx="questionScreen.submit" onPress={() => submitTest()} />
          ) : (
            <Button style={$button} tx="questionScreen.next" onPress={handleNextQuestion} />
          )}
        </View>
      </View>
    </Screen>
  )
}

const $currentQuestionView: ViewStyle = { flex: 0.5, flexDirection: "row" }

const $currentQuestionRoundView: ViewStyle = {
  flex: 0.3,
  alignItems: "center",
  flexDirection: "row",
}
const $currentQuestion: ViewStyle = { flex: 0.25, backgroundColor: colors.palette.primary100 }

const $allQuestionView: ViewStyle = { flex: 0.07, flexDirection: "row" }

const $container: ViewStyle = {
  paddingTop: spacing.xxxs,
  paddingBottom: spacing.xxxs,
  paddingHorizontal: spacing.xxxs,
  flex: 1,
}

const $title: TextStyle = {
  marginBottom: spacing.xxxs,
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
  flexDirection: "row",
  justifyContent: "space-between",
}

const $button: ViewStyle = {
  flex: 0.5,
}

const $buttonContainer: ViewStyle = {
  flexDirection: "row",
  alignSelf: "flex-end",
}

// @demo remove-file
