import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { ListItem, Screen, Text } from "app/components"
import { spacing } from "app/theme"
import { openLinkInBrowser } from "app/utils/openLinkInBrowser"
// import { useNavigation } from "@react-navigation/native"
import { GovernmentExams, useStores } from "app/models"
import { formatDate } from "app/utils/formatDate"

interface UpcomingExamsScreenProps extends AppStackScreenProps<"UpcomingExams"> {}

export const UpcomingExamsScreen: FC<UpcomingExamsScreenProps> = observer(
  function UpcomingExamsScreen() {
    const {
      govermentExamsStore: { upcomingExams },
    } = useStores()

    const [exams, setExams] = useState<GovernmentExams[]>(upcomingExams)
    // Pull in navigation via hook
    // const navigation = useNavigation()
    let noUpcomingExams: boolean = exams?.length == 0
    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
        <Text style={$title} preset="heading" tx="referenceMaterial.upcomingExams" />
        <View style={$itemsContainer}>
          {noUpcomingExams && (
            <Text
              style={$noUpcomingTitle}
              preset="default"
              tx="referenceMaterial.noUpcomingExams"
            />
          )}
          {exams?.map((item, index) => (
            <ListItem
              myKey={index}
              key={index}
              text={"" + item?.eventName}
              bottomSeparator
              RightComponent={
                <Text style={$date} preset="formHelper" text={formatDate("" + item?.startDate)} />
              }
              rightIcon={"caretRight"}
              height={60}
              onPress={() => openLinkInBrowser("" + item?.eventLink)}
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

const $noUpcomingTitle: TextStyle = {
  marginTop: spacing.xxl,
  alignSelf: "center",
}

const $date: TextStyle = {
  fontSize: 12,
  // marginTop: spacing.xs,
  // alignSelf: "baseline",
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
}
