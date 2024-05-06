import React, { FC, useEffect, useState, useReducer } from "react"
import * as Application from "expo-application"
import { Linking, Platform, TextStyle, View, ViewStyle, ScrollView } from "react-native"
import { Button, AnswerItem, Screen, Text, TextRounded, AutoImage, Icon, AnswerItemProps, AnswerTypes } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { colors, spacing } from "../../theme"
import { isRTL } from "../../i18n"
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "./../../../app/navigators"
import { Question, mockQuestions } from "./../../mocks/demoQuestions"
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

interface QuestionScreenProps extends AppStackScreenProps<"QuestionScreen"> {}

export const QuestionScreen: FC<QuestionScreenProps> = function QuestionScreen(_props) {
  const {
    authenticationStore: { logout },
  } = useStores()
  const [showImage, setShowImage] = useState(false)
  const [myAnswer, setMyAnswer] = useState<string | undefined>(undefined)

  const initialState = mockQuestions[0]
  console.log("🚀 ~ QuestionScreen ~ initialState:", initialState)

  const reducer = (state: any, action: any) => {
    console.log("🚀 ~ reducer ~ state:", state)
    switch (action.type) {
      case "previous":
        if (state.index > 0) {
          return mockQuestions[state.index - 1]
        }
      case "next":
        if (state.index < mockQuestions.length) {
          return mockQuestions[state.index + 1]
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const correctAnswer = state?.correctAns

  const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

  useEffect(() => {
    setTimeout(() => {
      setShowImage(true)
    }, 7000)
  })

  function showResult() {
    navigate({ name: "Score", params: undefined })
  }

  function checkAnswer(answer: string) {
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
  const currentQuestion = state?.index
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <View style={{ flex: 0.1 }}>
        {/* <Text
          style={$reportBugsLink}
          tx="demoDebugScreen.reportBugs"
          onPress={() => {
            // openLinkInBrowser("https://github.com/infinitered/ignite/issues")
          }}
        /> */}
        <Text tx="questionScreen.testSeries" style={$title} preset="heading" />
      </View>
      <View style={$allQuestionView}>
        <ScrollView
          contentContainerStyle={{ alignSelf: "center" }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {mockQuestions?.map((item:Question, index: number) => {
            return <TextRounded
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
              text={String(index+1)}
            />
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
              text={"" + (currentQuestion+1)}
            />
          </View>
          <View style={$currentQuestionView}>
            <Text preset="bold" tx="questionScreen.countDown">
              countdown: 0:53
            </Text>
          </View>
        </View>
        <View style={{ flex: 0.7 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: showImage ? 0.7 : 1 }}>
              <Text preset="bold" size={showImage ? "xxs" : "sm"}>
                Who is the first programmer of the World? If the question contains image then
                question text size will be reduced to this level. Also the image being displayed to
                right side is coming from Nitin's Google Drive.
              </Text>
            </View>
            {showImage && (
              <View style={{ flex: 0.3 }}>
                <AutoImage
                  style={{ width: "99%", height: "99%" }}
                  source={{
                    uri: "https://drive.google.com/uc?export=view&id=14zQPC4_-NeAUVAgvNsAu3OptpR4SBxXM",
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={{ flex: 0.35 }}>
        {state?.ansArr?.map((item:string, index:number) => (
          <AnswerItem
            key={"" + index}
            id={"" + index}
            text={"" + item}
            leftText={index + 1 + "."}
            isCorrect={isCorrectAnswer("" + index) as AnswerTypes}
            topSeparator={true}
            bottomSeparator={true}
            rightIcon={answerIcon("" + index)}
            onPress={() => checkAnswer("" + index)}
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

          {state?.index + 1 === mockQuestions?.length ? (
            <Button style={$button} tx="questionScreen.submit" onPress={showResult} />
          ) : (
            <Button
              style={$button}
              tx="questionScreen.next"
              onPress={() => dispatch({ type: "next" })}
            />
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
