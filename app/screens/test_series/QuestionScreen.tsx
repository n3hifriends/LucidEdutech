import React, { FC, useEffect, useState, useReducer, useRef } from "react"
import * as Application from "expo-application"
import {
  Linking,
  Platform,
  TextStyle,
  View,
  ViewStyle,
  ScrollView,
  AppState,
  Alert,
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
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "./../../../app/navigators"
import { Question, mockQuestions } from "./../../mocks/demoQuestions"
import CircularProgressBar from "app/components/CircularProgressBase"
import { useNavigation } from "@react-navigation/core"
import { QuestionObject } from "./../../mocks/demoQuestions"
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
    authenticationStore: { logout },
  } = useStores()
  const [myAnswer, setMyAnswer] = useState<string | undefined>(undefined)
  const [appState, setAppState] = useState(AppState.currentState)
  const [backgroundCount, setBackgroundCount] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)

  const initialState = mockQuestions[0]

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "previous":
        if (state?.index > 0) {
          return mockQuestions[state.index - 1]
        }
      case "next":
        if (state?.index < mockQuestions.length - 1) {
          return mockQuestions[state.index + 1]
        }
      case "index":
        if (action.index < mockQuestions.length - 1) {
          return mockQuestions[action.index]
        }
      case "reset":
        return mockQuestions[0]
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const isReferenceImageAvailable: boolean = state?.referenceImageUrl?.length > 0
  const [showImage, setShowImage] = useState(isReferenceImageAvailable)
  const clearIntervalRef = useRef<any>(null)
  const correctAnswer = state?.correctAns
  var stateChangeUnsubscribe: any = undefined
  var myBackgroundCount: number = 0
  const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

  const [timeLeft, setTimeLeft] = useState(0)
  const currentQuestion: number = state?.index
  function handleNextQuestion() {
    if (state?.index == mockQuestions?.length - 1) {
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

  function submitTest() {
    if (stateChangeUnsubscribe) {
      stateChangeUnsubscribe.remove()
    }
    navigate({ name: "Score", params: undefined })
  }

  function handleAppStateChange(nextAppState: any) {
    if (appState === "active" && nextAppState === "background") {
      setBackgroundCount((prevCount) => prevCount + 1)
      setTimerRunning(true)
      const timeoutId = setTimeout(() => {
        setTimerRunning(false)
        if (backgroundCount === 3) {
          showTestSubmissionPrompt()
        }
      }, 3000) // Adjust timeout as needed
      return () => clearTimeout(timeoutId)
    }
    setAppState(nextAppState)

    // if (appState === "active" && nextAppState === "background") {
    //   // myBackgroundCount += 1
    //   setBackgroundCount((prevCount) => prevCount + 1)
    //   setTimerRunning(true)
    //   const timeoutId = setTimeout(() => setTimerRunning(false)

    //   , 5000) // Adjust timeout as needed
    //   return () => clearTimeout(timeoutId)
    // }
    // setAppState(nextAppState);
    // // if (timerRunning && backgroundCount > 2) {
    // if (myBackgroundCount > 2) {
    // Alert.alert(
    //   "Test Submission",
    //   "The app has been in the background " + backgroundCount + " times.",
    //   [
    //     { text: "Ok", onPress: () => submitTest() }, // Replace with your submit function
    //   ],
    // )
    // }
  }
  const showTestSubmissionPrompt = () => {
    Alert.alert(
      "Test Submission",
      "The app has been in the background " + backgroundCount + " times.",
      [
        { text: "Submit", onPress: () => submittingTest() }, // Replace with your submit function
        // { text: "Cancel", onPress: () => console.log("Test submission cancelled") },
      ],
    )
  }

  const submittingTest = () => {
    console.log("Submitting test...")
  }
  useEffect(() => {
    stateChangeUnsubscribe = AppState.addEventListener("change", handleAppStateChange)
    return () => {
      if (stateChangeUnsubscribe) {
        stateChangeUnsubscribe.remove()
      }
    }
  }, [])

  useEffect(() => {
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

    return () => clearInterval(myInterval) // Cleanup function to clear interval
  }, [state]) // Dependency array: trigger effect only on timeLeft change

  const isLastQuestion = currentQuestion === mockQuestions.length - 1

  function showResult(confirmTest: boolean) {
    clearIntervalRef?.current() // to clear interval from CircularProgressBase
    if (confirmTest) {
      Alert.alert("Confirm Submission", "Are you sure you want to submit the  test?", [
        {
          text: "yes",
          onPress: () => {
            navigate({ name: "Score", params: undefined })
          },
        },
        { text: "no", onPress: () => {}, style: "cancel" },
      ])
    } else {
      navigate({ name: "Score", params: undefined })
    }
  }

  function checkAnswer(currentQue: Question, answer: string) {
    // modify existing array
    let newMockQuestionFilterArr: Question[] = mockQuestions.filter(
      (item, index) => item.index === state.index,
    )

    let newMockQuestion: Question = newMockQuestionFilterArr[0]
    newMockQuestion.attempted = true
    newMockQuestion.isCorrect = answer === newMockQuestion.correctAns
    // mockQuestion = [mockQuestion..., newMockQuestion]
    setMyAnswer(answer)
  }

  function isCorrectAnswer(index: string) {
    const isCorrectAns =
      myAnswer === undefined
        ? undefined
        : myAnswer === correctAnswer && myAnswer === "" + index
        ? "yes"
        : myAnswer != "" + index
        ? undefined
        : "no"
    return isCorrectAns
  }

  function answerIcon(index: string) {
    return myAnswer === undefined
      ? undefined
      : myAnswer === correctAnswer && myAnswer === "" + index
      ? "check"
      : myAnswer != "" + index
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
        <CircularProgressBar
          initialProgress={QuestionObject["totalTime"]}
          maxProgess={QuestionObject["totalTime"]}
          callback={() => {
            if (myInterval) {
              showResult(false)
            }
          }}
          clearIntervalRef={clearIntervalRef}
        />
      </View>

      <View style={$allQuestionView}>
        <ScrollView
          contentContainerStyle={{ alignSelf: "center" }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {mockQuestions?.map((item: Question, index: number) => {
            return (
              <TextRounded
                key={index}
                style={$title}
                backgroundColor={
                  index < currentQuestion
                    ? colors.palette.overlay50
                    : index == currentQuestion
                    ? colors.palette.secondary300
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
            <Text preset="bold" tx="questionScreen.countDown" />
            <Text preset="bold" text={` ${timeLeft}`} />
            {/* <CircularProgressBar initialProgress={5} maxProgess={10} /> */}
          </View>
        </View>
        <View style={{ flex: 0.7 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: showImage ? 0.7 : 1 }}>
              <Text preset="bold" size={showImage ? "xxs" : "sm"}>
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
        {state?.ansArr?.map((item: string, index: number) => (
          <AnswerItem
            key={"" + index}
            id={"" + index}
            text={"" + item}
            leftText={index + 1 + "."}
            isCorrect={isCorrectAnswer("" + index) as AnswerTypes}
            topSeparator={true}
            bottomSeparator={true}
            rightIcon={answerIcon("" + index)}
            onPress={() => checkAnswer(state, item)}
          />
        ))}
      </View>
      {showOnCorrectAnswer() && (
        <View style={{ flex: 0.3 }}>
          <View style={$itemsContainer}>
            <Text preset="bold">Solution: 5</Text>
            <Text preset="bold">52% got it right</Text>
            <Text
              style={{ color: "blue", textDecorationLine: "underline" }}
              preset="formHelper"
              onPress={() => {
                openLinkInBrowser("https://en.wikipedia.org/wiki/Programmer")
              }}
            >
              Reference
            </Text>
          </View>

          <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={true}>
            <Text preset="default">
              British countess and mathematician Ada Lovelace is often considered to be the first
              computer programmer, as she was the first to publish part of a program (specifically
              an algorithm) intended for implementation on Charles Babbage's analytical engine in
              October 1842. The algorithm was used to calculate Bernoulli numbers.[4] Because
              Babbage's machine was never completed as a functioning standard in Lovelace's time,
              she never had the opportunity to see the algorithm in action.
            </Text>
          </ScrollView>
        </View>
      )}
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
            <Button style={$button} tx="questionScreen.submit" onPress={() => showResult} />
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
