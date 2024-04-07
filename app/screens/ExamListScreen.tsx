import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, Image, ImageStyle } from "react-native"
import * as Application from "expo-application"
import { Button, ListItem, Screen, Text } from "../components"
import { AppStackScreenProps, navigate } from "app/navigators"
import { colors, spacing } from "app/theme"
import { isRTL } from "app/i18n"
import { openLinkInBrowser } from "app/utils/openLinkInBrowser"
const mpsc = require("../../assets/images/mpsc.png")
const mpsc_police = require("../../assets/images/mpsc_police.png")
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ExamListScreenProps extends AppStackScreenProps<"ExamList"> {}

export const ExamListScreen: FC<ExamListScreenProps> = observer(function ExamListScreen() {
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
    "महाराष्ट्र गजेटेड सिव्हिल सेवा परीक्षा - योजना (डिसेंबर-2023)",
    "महाराष्ट्र गजेटेड सिव्हिल सेवा परीक्षा - योजना (फेब्रुवारी-2023)",
    "महिला आणि बाल विकास कमिशनातील भरतीसाठी विभागीय सीमित प्रतिस्पर्धी परीक्षा - योजना आणि अभ्यासक्रम",
    "महाराष्ट्र गजेटेड गट-ब आणि गट-क सेवा परीक्षा - परीक्षेची योजना",
    "महाराष्ट्र गजेटेड तांत्रिक सेवा संयुक्त परीक्षा - सुधारित योजना",
    "महाराष्ट्र गट-क सेवा परीक्षा - योजना",
    "महाराष्ट्र उप-निरीक्षक सेवा असंघटित गट-ब संयुक्त परीक्षा - सुधारित योजना",
    "राज्य सेवा परीक्षा - सुधारित योजना (मे-2022)",
    "महाराष्ट्र गजेटेड तांत्रिक सेवा परीक्षा - परीक्षेची योजना",
    "पोलिस उप-निरीक्षक सीमित विभागीय प्रतिस्पर्धी परीक्षा - ०६ जानेवारी, २०२२",
    "सहायक कक्ष अधिकारी सीमित विभागीय परीक्षा - योजना",
    "न्यायिक मागिस्ट्रेट ज्युनियर डिव्हीझन आणि न्यायिक मजिस्ट्रेट फर्स्ट क्लास परीक्षा - योजना (डिसेंबर २०२१)",
    "महाराष्ट्र गट-क सेवा परीक्षा - सुधारित योजना",
    "महाराष्ट्र उप-निरीक्षक सेवा असंघटित गट-ब परीक्षा (ओक्टोबर २०२१ मध्ये सुधारित)",
    "राज्य सेवा परीक्षा - सुधारित योजना",
    "सहाय्यक कमिशनर / वॉर्ड ऑफिसर, एमसीजीएम, ग्रुप-ए (सुधारित)",
    "सहाय्यक मोटार वाहन इंस्पेक्टर परीक्षा - फेब्रुवारी, २०२०",
    "राज्य सेवा परीक्षा - १५ जानेवारी, २०२०",
    "न्यायिक न्यायाधीश (ज्युनियर डिव्हीझन) न्यायिक मजिस्ट्रेट (फर्स्ट क्लास) प्रतिस्पर्धी मुख्य परीक्षा",
    "महाराष्ट्र अभियांत्रिकी सेवा परीक्षा - एप्रिल, २०१९",
    "पोलिस उप-निरीक्षक सीमित विभागीय प्रतिस्पर्धी परीक्षा - ०७-०७-२०१८",
    "महाराष्ट्र गट-क सेवा परीक्षा - २० मार्च २०१८",
    "महाराष्ट्र अधीनस्थ सेवा गट-ब परीक्षा",
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

  const startTestSeries = () => {
    navigate({ name: "GeneralInstruction", params: undefined })
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text style={$title} preset="heading" tx="examList.testSeriesList" />
      <View style={$itemsContainer}>
        {systemInstructions.map((item, index) => (
          <ListItem
            text={item}
            children={"children"}
            bottomSeparator
            rightIcon={isRTL ? "caretLeft" : "caretRight"}
            height={60}
            LeftComponent={
              <View style={$leftImageContainer}>
                <Image
                  source={item.indexOf("उप-निरीक्षक") >= 0 ? mpsc_police : mpsc}
                  style={$leftImage}
                />
              </View>
            }
            onPress={() => startTestSeries()}
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
