import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Linking, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { ListItem, Screen, Text } from "app/components"
import { spacing } from "app/theme"
import { GovernmentExams, useStores } from "app/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ReferencePdfScreenProps extends AppStackScreenProps<"ReferencePdf"> {}

export const ReferencePdfScreen: FC<ReferencePdfScreenProps> = observer(
  function ReferencePdfScreen() {
    // Pull in one of our MST stores
    const {
      govermentExamsStore: { allExams },
    } = useStores()
    // Pull in navigation via hook
    // const navigation = useNavigation()
    const [exams, setExams] = useState<GovernmentExams[]>(allExams)
    const systemInstructionsEng = [
      { name: "CGL", url: "https://drive.google.com/file/d/1a_7nvBcmkET7MHKW3PkQ1bFqM8q6tic8" },
      { name: "CHSL", uri: "https://drive.google.com/file/d/11EKkz_W29ljpMBhqcdBS6M6m3OIZe0-Y" },
      {
        name: "STENO C & D",
        url: "https://drive.google.com/file/d/1LnQBpQ5R_ze8QIfoeD_7ytMSloZZonhk",
      },
      { name: "JE", url: "https://drive.google.com/file/d/12fqQonLIpurKcwZbI-2QMVMtxYxYxvEQ" },
      { name: "CAPF", url: "https://drive.google.com/file/d/1a_7nvBcmkET7MHKW3PkQ1bFqM8q6tic8" },
      { name: "MTS(NT)", url: "https://drive.google.com/file/d/1chXndLCGCHtMyWBpOG7QewHXp5muoOQ8" },
      { name: "JHT", url: "https://drive.google.com/file/d/1ubyPEoBeuC5sMlNntPxORwGtL9g61H5r" },
    ]
    // Pull in navigation via hook
    // const navigation = useNavigation()
    let noUpcomingExams: boolean = exams?.length == 0
    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
        <Text style={$title} preset="heading" tx="referenceMaterial.references" />
        <View style={$itemsContainer}>
          {noUpcomingExams && (
            <Text
              style={$noUpcomingTitle}
              preset="default"
              tx="referenceMaterial.noExamsAvailable"
            />
          )}
          {exams.map((item, index) => (
            <ListItem
              myKey={index}
              key={index}
              text={"" + item?.eventName}
              children={"children"}
              bottomSeparator
              rightIcon={"caretRight"}
              height={60}
              onPress={() => {
                try {
                  const myUrl = "" + item?.eventLink
                  Linking.canOpenURL(myUrl)
                    .then(() => {
                      Linking.openURL(myUrl).catch((err) => {
                        console.log("🚀 ~ .then ~ err:", err)
                      })
                    })
                    .catch((err) => {
                      console.log("🚀 ~ ReferenceMaterialScreen ~ err:", err)
                    })
                } catch (error) {
                  console.log("🚀 ~ ReferenceMaterialScreen ~ error:", error)
                }
              }}
              // onPress={() => openLinkInBrowser("https://rn.live/")}
            />
          ))}
        </View>
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  paddingBottom: spacing.sm,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
}

const $noUpcomingTitle: TextStyle = {
  marginTop: spacing.xxl,
  alignSelf: "center",
}
