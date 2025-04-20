import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps, navigationRef } from "app/navigators"
import { Screen, Text } from "app/components"
import { spacing } from "app/theme"
import { useHeader } from "app/utils/useHeader"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CurrentAffairsScreenProps extends AppStackScreenProps<"CurrentAffairs"> {}

export const CurrentAffairsScreen: FC<CurrentAffairsScreenProps> = observer(
  function CurrentAffairsScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    // Pull in navigation via hook
    // const navigation = useNavigation()
    useHeader(
      {
        leftIcon: "back",
        titleTx: "currentAffairScreen.currentAffairs",
        onLeftPress: () => {
          navigationRef?.current?.goBack()
        },
      },
      [],
    )
    return (
      <Screen preset="scroll" safeAreaEdges={["bottom"]} contentContainerStyle={$container}>
        <View style={$itemsContainer}>
          <Text tx="currentAffairScreen.noCurrentAffairsAvailable" />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
const $container: ViewStyle = {
  paddingBottom: spacing.sm,
  paddingHorizontal: spacing.lg,
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
}
