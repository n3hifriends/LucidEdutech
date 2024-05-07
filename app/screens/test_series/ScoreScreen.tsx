import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Checkbox, Icon, Screen, Text, TextRounded } from "./../../../app/components"
import { colors, spacing } from "./../../../app/theme"
import { useNavigation } from "@react-navigation/native"
import { AppStackScreenProps, navigate } from "./../../../app/navigators"
import { Question, mockQuestions } from "./../../mocks/demoQuestions"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ScoreScreenProps extends AppStackScreenProps<"Score"> {}

export const ScoreScreen: FC<ScoreScreenProps> = observer(function ScoreScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const startTestSeries = () => {
    navigate({ name: "QuestionScreen", params: undefined })
  }
  
  const [showScore, setShowScore] = useState(false);
  const [myAnswer, setMyAnswer] = useState<string | undefined>(undefined)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const handleNextQuestion = () => {
    if (currentQuestion + 1 < mockQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const calculateResult = () => {
    let correctAnswers:number = 0;
    let wrongAnswers:number = 0;
    let notAttempted:number = 0;
    let totalScore:number = 0;
    mockQuestions.forEach((answer) => {
      if(answer?.attempted === true){
      if (answer?.isCorrect === true) {
        correctAnswers++;
        totalScore += answer?.maxScore;
      } else {
        wrongAnswers++;
      }
    }else{
      notAttempted++;
    }
    });
    return { correctAnswers, wrongAnswers, notAttempted, totalScore };
  };

  const result = calculateResult();
  const sectionList = [
    { title: "एकूण प्रश्न", question: ""+mockQuestions.length, symbol: "?", color: colors.palette.accent100 },
    { title: "बरोबर उत्तरे", question: ""+result?.correctAnswers, symbol: "=", color: colors.palette.neutral100 },
    { title: "चुकीची उत्तरे", question: ""+result?.wrongAnswers, symbol: "x", color: colors.palette.neutral100 },
    {
      title: "अंशतः बरोबर उत्तरे",
      question: "0",
      symbol: "~",
      color: colors.palette.secondary100,
    },
    {
      title: "प्रयत्न न केलेले प्रश्न",
      question: ""+result?.notAttempted,
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
        <Text style={$vals} preset="formLabel">{mockQuestions.length}</Text>
        <Text style={$duration} preset="formLabel" tx="score.question" />
        <Icon size={20} style={$icon} icon={"heart"} color={"black"} />
        <Text style={$vals} preset="formLabel" text="1" />
        <Text style={$duration} preset="formLabel" tx="score.duration" />
        <Icon size={20} style={$icon} icon={"settings"} color={"black"} />
        <Text style={$vals} preset="formLabel" text="160" />
        <Text style={$duration} preset="formLabel" tx="score.marks" />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={[$section, { marginRight: spacing.sm }]} preset="subheading">{""+result?.totalScore}</Text>
        <Text style={$section} preset="subheading" tx="score.myscore" />
      </View>
      <View style={$line} />
      {sectionList.map(({ title, question, symbol, color }, index) => (
        <SectionItem
          srNo={"" + (index + 1)}
          title={title}
          question={question}
          symbol={symbol}
          color={color}
        />
      ))}
      <Button style={$button} tx="score.reattempt" onPress={startTestSeries} />
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
