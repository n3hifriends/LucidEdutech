import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Checkbox, Icon, Screen, Text, TextRounded } from "./../../../app/components"
import { colors, spacing } from "./../../../app/theme"
import { useNavigation } from "@react-navigation/native"
import { AppStackScreenProps, navigate } from "./../../../app/navigators"
import { Question, mockQuestions } from "../../../app/mocks/demoQuestions"
import { QuestionObject } from "../../../app/mocks/demoQuestions"
import { CourseSubjectQuize, useStores } from "app/models"
import { Quize } from "app/models/Course"
// import { useStores } from "app/models"
interface TestOverviewScreenProps extends AppStackScreenProps<"TestOverview"> {}

export const TestOverviewScreen: FC<TestOverviewScreenProps> = observer(
  function TestOverviewScreen() {
    const [checked, setChecked] = useState(false)
    // Pull in one of our MST stores
    const {
      ongoingQuizeStore: { getCurrentCourseId, getCurrentCourseName },
      quizeStore: { getAllQuizes },
    } = useStores()
    const [totalQuestion, setTotalQuestion] = useState(0)
    const [timeInMinute, setTimeInMinute] = useState(0)
    const [totalMarks, setTotalMarks] = useState(0)
    const [sectionList, setSectionList] = useState<SectionType[]>()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const startTestSeries = () => {
      if (!checked) {
        return
      }
      navigate({ name: "QuestionScreen", params: undefined })
    }

    // const sectionList = [
    //   { title: "विभाग अ सामान्य बुद्धिमत्ता आणि तर्क", question: "45", marks: "45" },
    //   { title: "विभाग ब सामान्य ज्ञान आणि सामान्य जागरूकता", question: "45", marks: "45" },
    //   { title: "विभाग क प्राथमिक गणित", question: "45", marks: "45" },
    //   { title: "विभाग ड हिंदी", question: "45", marks: "45" },
    // ]

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

    useEffect(() => {
      const courseSubjects: Quize[] = getAllQuizes?.filter(
        (quize) => quize?.courseId == getCurrentCourseId,
      )
      let allQuizOfCourseId: CourseSubjectQuize[] =
        courseSubjects?.[0].courseSubjects?.[0]?.courseSubjectQuiz // always first index would be the currentCourseId
      if (allQuizOfCourseId == undefined) {
        allQuizOfCourseId = []
      }
      var myTotalQuestion: number = 0
      var myTimeInMinute: number = 0
      var myTotalMarks: number = 0
      let mySectionList: SectionType[] = []
      allQuizOfCourseId.map((currentQuiz: CourseSubjectQuize, index: number) => {
        let currentQuestions: number = currentQuiz?.totalQuestion as number
        let currentMarks: number = currentQuiz?.totalMarks as number
        myTotalQuestion += currentQuestions
        myTimeInMinute += currentQuiz?.timeInMinute as number
        myTotalMarks += currentMarks

        let mySectionType: SectionType = {
          title: "" + currentQuiz?.quizName,
          question: currentQuestions > 0 ? "" + currentQuestions : "0",
          marks: currentMarks > 0 ? "" + currentMarks : "0",
          srNo: "" + index + 1,
        }
        mySectionList.push(mySectionType)
      })

      setSectionList(mySectionList)
      setTotalQuestion(myTotalQuestion)
      setTimeInMinute(myTimeInMinute)
      setTotalMarks(myTotalMarks)
    }, [])
    const sections: boolean = sectionList && sectionList?.length > 0 ? true : false
    return (
      <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
        <Text
          style={$title}
          preset="heading"
          text={"" + getCurrentCourseName}
          // tx="testOverview.testName"
        />
        <View style={$line} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon size={20} style={$icon} icon={"lock"} color={"black"} />
          <Text style={$vals} preset="formLabel" text={`${totalQuestion}`} />
          <Text style={$duration} preset="formLabel" tx="testOverview.question" />
          <Icon size={20} style={$icon} icon={"heart"} color={"black"} />
          <Text style={$vals} preset="formLabel" text={`${timeInMinute}`} />
          <Text style={$duration} preset="formLabel" tx="testOverview.duration" />
          <Icon size={20} style={$icon} icon={"settings"} color={"black"} />
          <Text style={$vals} preset="formLabel" text={`${totalMarks}`} />
          <Text style={$duration} preset="formLabel" tx="testOverview.marks" />
        </View>
        <Text style={$section} preset="subheading" tx="testOverview.section" />
        <View style={$line} />
        {sections == true &&
          sectionList?.map(({ title, question, marks }, index) => (
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
            tx="testOverview.checkbox"
            multiline={true}
            value={checked}
            onToggle={(isChecked) => {
              setChecked(isChecked)
            }}
          />
          <Button
            style={$button}
            disabled={sectionList?.length == 0}
            tx="testOverview.attempt"
            onPress={startTestSeries}
          />
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
