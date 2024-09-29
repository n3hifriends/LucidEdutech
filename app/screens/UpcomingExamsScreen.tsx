import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Linking, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { ListItem, Screen, Text } from "app/components"
import { spacing } from "app/theme"
import { openLinkInBrowser } from "app/utils/openLinkInBrowser"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface UpcomingExamsScreenProps extends AppStackScreenProps<"UpcomingExams"> {}

export const UpcomingExamsScreen: FC<UpcomingExamsScreenProps> = observer(
  function UpcomingExamsScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const systemInstructionsEng = [
      {
        name: "NDA",
        url: "https://upsc.gov.in/examinations/active-exams",
        date: "01-Sep-2024",
      },
      {
        name: "SBI PO",
        url: "https://upsc.gov.in/examinations/active-exams",
        date: "23-Nov-2024",
      },
      {
        name: "IBPS SO",
        url: "https://upsc.gov.in/examinations/active-exams",
        date: "10-Dec-2024",
      },
    ]
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
        <Text style={$title} preset="heading" tx="referenceMaterial.referenceMaterialTxt" />
        <View style={$itemsContainer}>
          {systemInstructionsEng.map((item, index) => (
            <ListItem
              myKey={index}
              key={index}
              text={item?.name}
              children={"children"}
              bottomSeparator
              RightComponent={<Text style={$date} preset="formHelper" text={item?.date} />}
              rightIcon={"caretRight"}
              height={60}
              onPress={() => openLinkInBrowser(item?.url)}
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

const $date: TextStyle = {
  fontSize: 12,
  marginTop: spacing.xs,
  alignSelf: "baseline",
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
}
