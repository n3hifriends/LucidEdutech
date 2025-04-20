import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps, navigationRef } from "app/navigators"
import { Screen, Text } from "app/components"
import { useHeader } from "app/utils/useHeader"
import { spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface LiveClassesScreenProps extends AppStackScreenProps<"LiveClasses"> {}

export const LiveClassesScreen: FC<LiveClassesScreenProps> = observer(function LiveClassesScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  useHeader(
    {
      leftIcon: "back",
      titleTx: "liveClassesScreen.liveClasses",
      onLeftPress: () => {
        navigationRef?.current?.goBack()
      },
    },
    [],
  )
  return (
    <Screen preset="scroll" safeAreaEdges={["bottom"]} contentContainerStyle={$container}>
      <Text tx="liveClassesScreen.noLiveClassesAvailable" />
    </Screen>
  )
})

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
