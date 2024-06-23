import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import * as Application from "expo-application"
import { Linking, Platform, TextStyle, View, ViewStyle } from "react-native"
import { Button, ListItem, Screen, Text } from "../../components"
import { colors, spacing } from "../../theme"
import { isRTL } from "../../i18n"
import { useStores } from "../../models"
import { AppStackScreenProps, navigate } from "./../../../app/navigators"
// q: On the first row, we write a 0. Now in every subsequent row, we look at the previous row and replace each occurrence of 0 with 01, and each occurrence of 1 with 10. Given row number A and index B, return the Bth indexed symbol in row A. (The values of B are 0-indexed.).
// a:

function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

interface GeneralInstructionScreenProps extends AppStackScreenProps<"GeneralInstruction"> {}
export const GeneralInstructionScreen: FC<GeneralInstructionScreenProps> =
  function GeneralInstructionScreen(_props) {
    const {
      authenticationStore: { logout },
    } = useStores()

    const systemInstructionsEng = [
      "This is a timed test; the running time is displayed on top left corner of the screen.",
      "The bar above the question text displays the question numbers in the current section of the test. You can move to any question by clicking on the respective number.",
      "The question screen displays the question number along with the question and respective options.",
      "The top right of section above the question has an option to mark the question for review. You can later view the marked question.",
      "You can mark or unmark any option you have chosen by tapping on the respective option.",
      "The bottom left corner contains the option to move to the previous question.",
      "The bottom right corner contains the option to move to the next question.",
      "You can jump between sections(if allowed by tutor) by choosing the section in bottom centre drop down.",
      "You can submit the test at any point of time by clicking the Submit button on top right corner of the screen.",
      "Before submission, the screen shows a confirmation pop-up with the total number of questions in the test, questions answered and questions marked for review.",
      "Test must be completed in one attempt. Test once submitted cannot be re-attempted or started again.",
      "You should not change or close the test screen while attempting test.",
      "If the app is closed or screen is changed more than three times by any means, the test will be submitted automatically.",
      "After completion of test, a test summary screen will be displayed with section details & solutions.",
      "If something goes wrong, contact your tutor and communicate the problem.",
    ]
    const systemInstructions = [
      "ही एक कालबद्ध चाचणी आहे; चालू वेळ स्क्रीनच्या वरच्या डाव्या कोपर्यात प्रदर्शित केला जातो.",
      "प्रश्न मजकुराच्या वरील पट्टी परीक्षेच्या वर्तमान विभागातील प्रश्न क्रमांक प्रदर्शित करते. तुम्ही संबंधित क्रमांकावर क्लिक करून कोणत्याही प्रश्नाकडे जाऊ शकता.",
      "प्रश्न स्क्रीन प्रश्न आणि संबंधित पर्यायांसह प्रश्न क्रमांक प्रदर्शित करते.",
      "प्रश्नाच्या वरील विभागाच्या वरच्या उजव्या बाजूला प्रश्नावर पुनरावलोकनासाठी चिन्हांकित करण्याचा पर्याय आहे. तुम्ही नंतर चिन्हांकित प्रश्न पाहू शकता.",
      "संबंधित पर्यायावर टॅप करून तुम्ही निवडलेला कोणताही पर्याय तुम्ही चिन्हांकित किंवा अचिन्हांकित करू शकता.",
      "खालील डाव्या कोपर्यात मागील प्रश्नाकडे जाण्याचा पर्याय आहे.",
      "खालील उजव्या कोपर्यात पुढील प्रश्नाकडे जाण्याचा पर्याय आहे.",
      "खालील मध्यभागी ड्रॉप डाउन विभाग निवडून तुम्ही विभागांमध्ये (शिक्षकाने परवानगी दिल्यास) उडी मारू शकता.",
      "स्क्रीनच्या वरच्या उजव्या कोपर्यात सबमिट बटणावर क्लिक करून तुम्ही कोणत्याही वेळी चाचणी सबमिट करू शकता.",
      "सबमिशन करण्यापूर्वी, स्क्रीन चाचणीमधील प्रश्नांची एकूण संख्या, प्रश्नांची उत्तरे आणि पुनरावलोकनासाठी चिन्हांकित प्रश्नांसह एक पुष्टीकरण पॉप-अप दर्शविते.",
      "चाचणी एका प्रयत्नात पूर्ण करणे आवश्यक आहे. एकदा सबमिट केल्यावर चाचणी पुन्हा प्रयत्न करता येत नाही किंवा पुन्हा सुरू करता येत नाही.",
      "चाचणीचा प्रयत्न करताना तुम्ही चाचणी स्क्रीन बदलू किंवा बंद करू नये.",
      "अ‍ॅप बंद असल्यास किंवा स्क्रीन कोणत्याही प्रकारे तीनपेक्षा जास्त वेळा बदलल्यास, चाचणी स्वयंचलितपणे सबमिट केली जाईल.",
      "चाचणी पूर्ण झाल्यानंतर, विभाग तपशील आणि उपायांसह चाचणी सारांश स्क्रीन प्रदर्शित केली जाईल.",
      "काही चूक झाल्यास, तुमच्या ट्यूटरशी संपर्क साधा आणि समस्या सांगा.",
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
      navigate({ name: "TestOverview", params: undefined })
    }

    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
        <Text style={$title} preset="heading" tx="generalInstruction.generalInstructionTitle" />
        <View style={$itemsContainer}>
          {systemInstructions.map((item, index) => (
            <ListItem
              key={item}
              myKey={item}
              leftIcon="menu"
              LeftComponent={
                <View style={$item}>
                  <Text>* </Text>
                  <Text>{item}</Text>
                </View>
              }
            />
          ))}
        </View>
        <View style={$buttonContainer}>
          {/* <Button style={$button} tx="demoDebugScreen.reactotron" onPress={demoReactotron} /> */}
          {/* <Text style={$hint} tx={`demoDebugScreen.${Platform.OS}ReactotronHint` as const} /> */}
        </View>
        <View style={$buttonContainer}>
          <Button style={$button} tx="generalInstruction.continue" onPress={startTestSeries} />
        </View>
      </Screen>
    )
  }

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

const $hint: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: spacing.lg,
}

// @demo remove-file
