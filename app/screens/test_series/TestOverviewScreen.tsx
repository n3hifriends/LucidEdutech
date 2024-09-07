import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Checkbox, Icon, Screen, Text, TextRounded } from "./../../../app/components"
import { colors, spacing } from "./../../../app/theme"
import { useNavigation } from "@react-navigation/native"
import { AppStackScreenProps, navigate } from "./../../../app/navigators"
import { Question, mockQuestions } from "../../../app/mocks/demoQuestions"
import { QuestionObject } from "../../../app/mocks/demoQuestions"
import { useStores } from "app/models"
// import { useStores } from "app/models"
interface TestOverviewScreenProps extends AppStackScreenProps<"TestOverview"> {}

export const TestOverviewScreen: FC<TestOverviewScreenProps> = observer(
  function TestOverviewScreen() {
    const [checked, setChecked] = useState(false)
    // Pull in one of our MST stores
    const {
      ongoingQuizeStore: { getCurrentQuize },
    } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const startTestSeries = () => {
      if (!checked) {
        return
      }
      navigate({ name: "QuestionScreen", params: undefined })
    }

    const sectionList = [
      { title: "विभाग अ सामान्य बुद्धिमत्ता आणि तर्क", question: "45", marks: "45" },
      { title: "विभाग ब सामान्य ज्ञान आणि सामान्य जागरूकता", question: "45", marks: "45" },
      { title: "विभाग क प्राथमिक गणित", question: "45", marks: "45" },
      { title: "विभाग ड हिंदी", question: "45", marks: "45" },
    ]

    type SectionType = {
      srNo: string
      title: string
      question: string
      marks: string
    }

    const calculateResult = () => {
      let totalScore: number = 0

      mockQuestions.forEach((answer) => {
        totalScore += answer?.maxScore
      })
      return { totalScore }
    }

    const result = calculateResult()

    function SectionItem(obj: SectionType) {
      return (
        <View key={obj.srNo} style={$sectionItemContainer}>
          <View style={{ flex: 0.2, alignSelf: "center" }}>
            <TextRounded
              heightOrWidth={40}
              key={obj.srNo}
              backgroundColor={colors.palette.secondary200}
              preset="default"
              text={obj.srNo}
            />
          </View>
          <View style={{ flexDirection: "column", flex: 0.8 }}>
            <Text style={$sectionItem} preset="formLabel" text={obj.title} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon size={20} style={$icon} icon={"heart"} color={"black"} />
              <Text style={$vals} preset="formLabel" text={obj.question} />
              <Text style={$duration} preset="formLabel" tx="testOverview.question" />
              <Icon size={20} style={$icon} icon={"settings"} color={"black"} />
              <Text style={$vals} preset="formLabel" text={obj.marks} />
              <Text style={$duration} preset="formLabel" tx="testOverview.marks" />
            </View>
          </View>
        </View>
      )
    }

    return (
      <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
        <Text
          style={$title}
          preset="heading"
          text="एसएससी जीडी मॉक चाचणी"
          // tx="testOverview.testName"
        />
        <View style={$line} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon size={20} style={$icon} icon={"lock"} color={"black"} />
          <Text style={$vals} preset="formLabel" text={`${mockQuestions.length}`} />
          <Text style={$duration} preset="formLabel" tx="testOverview.question" />
          <Icon size={20} style={$icon} icon={"heart"} color={"black"} />
          <Text style={$vals} preset="formLabel" text={`${QuestionObject["totalTime"]}`} />
          <Text style={$duration} preset="formLabel" tx="testOverview.duration" />
          <Icon size={20} style={$icon} icon={"settings"} color={"black"} />
          <Text style={$vals} preset="formLabel" text={`${result?.totalScore}`} />
          <Text style={$duration} preset="formLabel" tx="testOverview.marks" />
        </View>
        <Text style={$section} preset="subheading" tx="testOverview.section" />
        <View style={$line} />
        {sectionList.map(({ title, question, marks }, index) => (
          <SectionItem
            key={index}
            srNo={"" + (index + 1)}
            title={title}
            question={question}
            marks={marks}
          />
        ))}
        <View style={{ marginTop: spacing.xxxl }}>
          <View style={$line} />
          {!checked && <Text style={$notChecked} preset="formLabel" tx="testOverview.accept" />}
          <Checkbox
            text={
              "मी सूचना वाचल्या आणि समजल्या आहेत. मी सहमत आहे की सूचनांचे पालन न केल्यास, मला या चाचणीपासून व/किंवा शिस्तभंगाच्या कारवाईपासून वगळण्यात येईल, ज्यामध्ये भविष्यातील चाचण्यांवरील बंदी समाविष्ट असू शकते."
            }
            multiline={true}
            value={checked}
            onToggle={(isChecked) => {
              setChecked(isChecked)
            }}
          />
          <Button style={$button} tx="testOverview.attempt" onPress={startTestSeries} />
        </View>
      </Screen>
    )
  },
)

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
