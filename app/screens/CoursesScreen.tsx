import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps, navigationRef } from "app/navigators"
import { Screen, Text } from "app/components"
import { spacing } from "app/theme"
import { useHeader } from "app/utils/useHeader"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CoursesScreenProps extends AppStackScreenProps<"Courses"> {}

export const CoursesScreen: FC<CoursesScreenProps> = observer(function CoursesScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  useHeader(
    {
      leftIcon: "back",
      titleTx: "coursesScreen.courses",
      onLeftPress: () => {
        navigationRef?.current?.goBack()
      },
    },
    [],
  )
  return (
    <Screen preset="scroll" safeAreaEdges={["bottom"]} contentContainerStyle={$container}>
      <View style={$itemsContainer}>
        <Text tx="coursesScreen.noCoursesAvailable" />
      </View>
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
