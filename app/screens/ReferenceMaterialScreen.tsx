import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, Linking, TextStyle, View, ViewStyle } from "react-native"
import { ListItem, Screen, Text } from "app/components"
import { DemoTabScreenProps } from "app/navigators/DemoNavigator"
import { spacing } from "app/theme"
import { TxKeyPath } from "./../i18n"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { navigate } from "./../../app/navigators"

interface ReferenceMaterialScreenProps extends DemoTabScreenProps<"ReferenceMaterial"> {}

export const ReferenceMaterialScreen: FC<ReferenceMaterialScreenProps> = observer(
  function ReferenceMaterialScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    const systemInstructionsEng: TxKeyPath[] = [
      "referenceMaterial.references",
      "referenceMaterial.upcomingExams",
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
              tx={item as TxKeyPath}
              children={"children"}
              bottomSeparator
              rightIcon={"caretRight"}
              height={60}
              onPress={() => {
                switch (index) {
                  case 0:
                    navigate({ name: "ReferencePdf", params: undefined })
                    break

                  case 1:
                    navigate({ name: "UpcomingExams", params: undefined })
                    break

                  default:
                    navigate({ name: "ReferencePdf", params: undefined })
                    break
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
